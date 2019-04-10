/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:03
  @Last Modified time: 2019-04-07 17:43:18
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import { config } from './../../startup/config.js';
import { 
	checkValidDevice,
	checkUserLoggedIn,
	checkValidEmail
} from './../../utilities/validation.js';
import T from './../../i18n/index.js';

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
		if (this.isSimulation)return;
		let user = Meteor.user() || Meteor.users.findOne({"emails.address" : email});
		Meteor.users.update({_id : user._id}, {
			$unset : {
				"services.accessTokens.tokens" : null,
				"services.resume.loginTokens" : null
			}
		});
		Accounts.sendResetPasswordEmail(user._id);
		return {
			success : true,
			message : i18n.__("methods.user.resetPassword.success")
		};
	}
});

export const UpdateEmail = new ValidatedMethod({
	name: 'Users.methods.update.email',
	validate({email}) {
		checkUserLoggedIn();
		checkValidEmail(email, false);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({email}) {
		if (this.isSimulation)return;
		Accounts.addEmail(Meteor.userId(), email)
		Accounts.sendVerificationEmail(Meteor.userId(), email)
		return {
			success : true,
			message : i18n.__("methods.user.updateEmail.success")
		};
	}
});