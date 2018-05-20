/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:03
  @Last Modified time: 2018-05-21 00:17:03
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

import { config } from '../../startup/config.js';

export const LoginUser = new ValidatedMethod({
	name: 'Users.methods.login',
	validate: new SimpleSchema({
		'email': { type: String, regEx: SimpleSchema.RegEx.Email },
		'password': { type: String }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.superFast,
	
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ email, password }) {

	}
});