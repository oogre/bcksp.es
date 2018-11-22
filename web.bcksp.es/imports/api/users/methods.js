/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:03
  @Last Modified time: 2018-11-12 14:45:13
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import { config } from './../../startup/config.js';
import * as Utilities from './../../utilities.js';
import T from './../../i18n/index.js';

let translator = i18n.createTranslator("methods");
let errors = i18n.createTranslator("errors");

export const GetLoginTokenUser = new ValidatedMethod({
	name: 'Users.methods.login.token',
	validate() {},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run() {
		Utilities.checkUserLoggedIn();
		let u = Meteor.users.findOne({_id : this.userId}, {
			field : {
				"services.resume.loginTokens" : 1
			}
		});
		
		u.services.resume.loginTokens = u.services.resume.loginTokens.slice(-1);

		let t = Meteor.users.update({_id : this.userId}, {
			$unset : {
				"services.accessTokens.tokens" : null
			},
			$set : {
				"services.resume.loginTokens" : u.services.resume.loginTokens
			}
		});
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
	validate: new SimpleSchema({}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.slow,
	applyOptions: {
		noRetry: true,
	},
	run() {
		Utilities.checkUserLoggedIn();
		
		if (!this.isSimulation) {
			Accounts.sendResetPasswordEmail(Meteor.userId());
			return {
				success : true,
				message : translator("user.resetPassword.success"),
			};
		}
	}
});