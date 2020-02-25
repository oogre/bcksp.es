/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:03
  @Last Modified time: 2020-02-25 22:20:59
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { 
	checkValidDevice,
	checkUserLoggedIn,
	checkValidEmail,
	checkValidPassword,
	checkString,
	checkValidLanguage
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
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run({device}) {
		Meteor.users.update({
			_id : Meteor.userId()
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
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run({device}) {
		LoginLinks.setDefaultExpirationInSeconds(15); // 15 seconds
		if (!this.isSimulation) {
			return {
				success : true,
				data : LoginLinks.generateAccessToken({_id : Meteor.userId() })
			};
		}
	}
});





export const HardDisconnect = new ValidatedMethod({
	name: 'Users.methods.hard.disconnect',
	validate() {
		
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run() {
		Meteor.users.update({ 
			_id : Meteor.userId()
		}, {
			$unset : {
				"services.accessTokens.tokens" : null,
				"services.resume.loginTokens" : null
			}
		});
		const T2 = i18n.createTranslator("methods.user.HardDisconnect");
		return {
			success : true,
			message : {
				title : T2("title"),
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
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run({email}) {
		this.unblock();
		if (this.isSimulation)return;
		let user = Meteor.user() || Meteor.users.findOne({"emails.address" : email});
		Accounts.sendResetPasswordEmail(user._id, getMainEmail(user.emails));
		Meteor.users.update({
			_id : user._id
		}, {
			$unset : {
				"services.accessTokens.tokens" : null,
				"services.resume.loginTokens" : null
			}
		});
		const T2 = i18n.createTranslator("userprofile.identification.password.confirmation");
		return {
			success : true,
			message : {
				title : T2("title"),
				content : T2("content")
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
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run({email}) {
		if (this.isSimulation)return;
		Accounts.addEmail(Meteor.userId(), email);
		Accounts.sendVerificationEmail(Meteor.userId(), email);

		const T2 = i18n.createTranslator("userprofile.identification.email.confirmation");
		return {
			success : true,
			message : {
				title : T2("title"),
				content : T2("content")
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
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
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
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run() {
		if (this.isSimulation)return;

		Meteor.users.remove(Meteor.userId());
		
		const T2 = i18n.createTranslator("userprofile.danger.deleteAccount.confirmation");
		return {
			success : true,
			message : {
				title : T2("title"),
				content : T2("content")
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
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.mid,
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



export const SetUserLang = new ValidatedMethod({
	name: 'Users.methods.user.Language.Setter',
	validate({ lang }) {
		checkUserLoggedIn();
		checkValidLanguage(lang);
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.high,
	applyOptions: {
		noRetry: true,
	},
	run({ lang }) {
		this.unblock();
		Meteor.users.update({
			_id : Meteor.userId(),
		}, {
			$set : {
				lang : lang,
				updatedAt : new Date()
			}
		});
		const T2 = i18n.createTranslator("userprofile.settings.language.confirmation");
		return {
			success : true,
			message : {
				title : T2("title"),
				content : T2("content")
			}
		};
	}
});
