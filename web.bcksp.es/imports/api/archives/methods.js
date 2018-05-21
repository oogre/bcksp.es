/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:22
  @Last Modified time: 2018-05-21 21:38:15
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

import { Archives } from './archives.js';
import { config } from './../../startup/config.js';
import { streamer } from './../streamer.js';

export const ArchiveAdd = new ValidatedMethod({
	name: 'Archives.methods.add',
	validate: new SimpleSchema({
		'text': { type: String },
	}).validator({clean:true}),
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ text }) {
		this.unblock();
		if (!this.userId) {
			// Throw errors with a specific error code
			throw new Meteor.Error(
				'Archives.methods.add.notLoggedIn',
				'Must be logged in to add to private Archive.'
			);
		}
		let myArchive = Archives.update({
			type : config.archives.private.type,
			owner : this.userId
		},{
			$inc : {
				count : text.length
			},
			$push : {
				backspaces : {
					$position : 0,
					$each : [text]
				}
			},
			$set : {
				updatedAt : new Date()
			}
		});
		streamer.emit('liveBackspaces', text);
		return "YES";
	}
});