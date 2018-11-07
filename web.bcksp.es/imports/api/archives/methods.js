/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:22
  @Last Modified time: 2018-11-05 08:27:25
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

import { Archives } from './archives.js';
import { config } from './../../startup/config.js';
import { streamer } from './../streamer.js';

import * as Utilities from './../../utilities.js';

export const ArchiveAdd = new ValidatedMethod({
	name: 'Archives.methods.add',
	validate({ text }) {
		if(!_.isString(text) || _.isEmpty(text)){
			throw new ValidationError([{
				name: 'text',
				type: 'not-a-string',
				details: {
				  value: text
				}
			}]);
		}
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ text }) {
		Utilities.checkUserLoggedIn();
		text = text.replace(/&nbsp;/g, " ");
		this.unblock();
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