/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:03
  @Last Modified time: 2018-11-05 15:14:06
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