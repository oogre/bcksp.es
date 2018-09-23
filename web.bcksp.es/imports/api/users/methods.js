/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:03
  @Last Modified time: 2018-09-23 20:31:32
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

export const SignupUser = new ValidatedMethod({
	name: 'Users.methods.create',
	validate: new SimpleSchema({
		'email':	{ type: String, regEx: SimpleSchema.RegEx.Email },
		'password': { type: String, min: 6, max: 128 },
		'passwordConfirm': { type: String }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.superFast,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ email, password, passwordConfirm }) {
		if(password != passwordConfirm){
			const errors = [{
				name: 'passwordConfirm',
				type: 'no-match',
				details: {
					value: ""
				}
			}];
			throw new ValidationError(errors);
		}
		if (!this.isSimulation) {
			if(Meteor.users.find({'emails.address':new RegExp(email, "i")}).count() > 0){
				const errors = [{
					name: 'email',
					type: 'already-exists',
					details: {
						value: email
					}
				}];
				throw new ValidationError(errors);
			}

			let userId =  Accounts.createUser({
				email : email,
				password : password,
			});
			return {
				success : true,
				message : "Your account is up to be created. You'll receive soon an email to complete your subscription.",
				data : userId
			};
		}
	}
});