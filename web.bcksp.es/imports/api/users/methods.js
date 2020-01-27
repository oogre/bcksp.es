/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:03
  @Last Modified time: 2020-01-26 18:40:00
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import T from './../../i18n/index.js';
import { 
	checkValidDevice,
	checkUserLoggedIn,
	checkValidEmail,
	checkValidPassword,
	checkString
} from './../../utilities/validation.js';
import { config } from './../../startup/config.js';
import {getMainEmail} from './../../utilities/meteor.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';


export const UsersPing = new ValidatedMethod({
	name: 'Users.methods.ping',
	validate({device}) {
		checkUserLoggedIn();
		checkValidDevice(device);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({device}) {
		Meteor.users.update({
			_id : this.userId
		}, {
			$set : {
				"pingAt" : new Date()
			}
		});
	}
});

export const GetLoginTokenUser = new ValidatedMethod({
	name: 'Users.methods.login.token',
	validate({device}) {
		checkUserLoggedIn();
		checkValidDevice(device);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({device}) {
		LoginLinks.setDefaultExpirationInSeconds(15); // 15 seconds
		if (!this.isSimulation) {
			return {
				success : true,
				data : LoginLinks.generateAccessToken({_id : this.userId })
			};
		}
	}
});





export const HardDisconnect = new ValidatedMethod({
	name: 'Users.methods.hard.disconnect',
	validate() {
		
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run() {
		Meteor.users.update({ 
			_id : this.userId
		}, {
			$unset : {
				"services.accessTokens.tokens" : null,
				"services.resume.loginTokens" : null
			}
		});

		return {
			success : true,
			message : {
				title : i18n.__("methods.user.HardDisconnect.title"),
				content : "",
			}
		};
	}
});




export const ResetPassword = new ValidatedMethod({
	name: 'Users.methods.reset.password',
	validate({device, email}) {
		try{
			checkUserLoggedIn();	
		}catch(error){
			checkValidDevice(device);
			checkValidEmail(email, true);
		}
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({email}) {
		this.unblock();
		
		if (this.isSimulation)return;

		let user = this.user || Meteor.users.findOne({"emails.address" : email});
		
		Accounts.sendResetPasswordEmail(user._id, getMainEmail(user.emails));
		
		Meteor.users.update({
			_id : user._id
		}, {
			$unset : {
				"services.accessTokens.tokens" : null,
				"services.resume.loginTokens" : null
			}
		});
		
		return {
			success : true,
			message : {
				title : i18n.__("userprofile.identification.password.confirmation.title"),
				content : i18n.__("userprofile.identification.password.confirmation.content")
			}
		};
	}
});

export const UpdateEmail = new ValidatedMethod({
	name: 'Users.methods.update.email',
	validate({email}) {
		checkUserLoggedIn();
		checkValidEmail(email, false, "email");
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({email}) {
		if (this.isSimulation)return;
		Accounts.addEmail(this.userId, email)
		Accounts.sendVerificationEmail(this.userId, email)
		return {
			success : true,
			message : {
				title : i18n.__("userprofile.identification.email.confirmation.title"),
				content : i18n.__("userprofile.identification.email.confirmation.content")
			}
		};
	}
});

export const CreateUser = new ValidatedMethod({
	name: 'customCreateUser',
	validate({email, password, device}) {
		checkValidDevice(device);
		checkValidEmail(email, false);
		checkValidPassword(password, password);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({email, password}) {
		if (this.isSimulation)return;
		return Accounts.CreateUser({
			email, 
			password
		});
	}
});

export const DestroyUser = new ValidatedMethod({
	name: 'Users.methods.delete.user',
	validate() {
		checkUserLoggedIn();
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run() {
		if (this.isSimulation)return;

		Meteor.users.remove(this.userId);
		
		return {
			success : true,
			message : {
				title : i18n.__("userprofile.danger.deleteAccount.confirmation.title"),
				content : i18n.__("userprofile.danger.deleteAccount.confirmation.content")
			}
		};
	}
});

export const Login = new ValidatedMethod({
	name: 'customLogin',
	validate({email, password}) {
		checkValidDevice(device);
		checkValidEmail(email, true);
		checkValidPassword(password);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({email, password}) {
		if (this.isSimulation)return;

		return new Promise((resolve, reject)=>{
			let user = Meteor.users.findOne({"emails.address" : email})
      		let result = Accounts._checkPassword(user, password);
      		if(result.error){
      			reject(result.error);
      		}else{
      			let stampedLoginToken = Accounts._generateStampedLoginToken()
      			Accounts._insertLoginToken(user._id, stampedLoginToken);
      			resolve(stampedLoginToken.token);
      		}
		});
	}
});