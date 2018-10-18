/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:03
  @Last Modified time: 2018-10-07 20:17:06
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

import { config } from '../../startup/config.js';


export const GetLoginTokenUser = new ValidatedMethod({
	name: 'Users.methods.login.token',
	validate() {},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.superFast,
	
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run() {
		if (!this.userId) {
			// Throw errors with a specific error code
			throw new ValidationError([{
				name: 'userId',
				type: 'not-logged-in',
				details: {
				  value: null
				}
			}]);
		}
		LoginLinks.setDefaultExpirationInSeconds(15); // 15 seconds
		if (!this.isSimulation) {
			const token = LoginLinks.generateAccessToken({
				_id : this.userId 
			});
			return {
				success : true,
				data : token
			};
		}
	}
});