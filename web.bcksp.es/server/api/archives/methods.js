/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:22
  @Last Modified time: 2018-12-17 17:12:07
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import { Archives } from '../../../imports/api/archives/archives.js';
import { config } from '../../../imports/startup/config.js';
import { streamer } from '../../../imports/api/streamer.js';
import * as Utilities from '../../../imports/utilities.js';
import * as ArchiveTools from '../../utilities.archive.js';

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
		this.unblock();
		if(Meteor.isServer){
			text = text.replace(/&nbsp;/g, " ");
			text = text.replace(/\n/g, " ");
			text = text.replace(/\t/g, " ");
			let myArchive = Archives.findOne({
				type : config.archives.private.type,
				owner : this.userId
			}, {
				field : {
					_id : 1
				}
			});
			let publicArchive = Archives.findOne({
				type : config.archives.public.type
			}, {
				field : {
					_id : 1
				}
			});
			text = text+" ";
			ArchiveTools.append(myArchive._id, text)
			.then(()=>{
				Archives.update({
					_id : myArchive._id
				},{
					$inc : {
						count : text.length
					},
					$set : {
						updatedAt : new Date()
					}
				});
			})
			.then(()=>ArchiveTools.readAsync(publicArchive._id))
			.then(longBuffer=>{
				longBuffer = text + longBuffer;
				longBuffer = longBuffer.substr(0, config.archives.public.longBuffer.maxLen);
				return ArchiveTools.writeAsync(publicArchive._id, longBuffer)
			})
			.then(()=>{
				Archives.update({
					_id : publicArchive._id
				}, {
					$inc : {
						count : text.length
					},
					$set : {
						updatedAt : new Date()
					}
				});
				streamer.emit('publicBackspaces', {content : text});
			})
			.catch(err=>console.log(err));
		}
		return "YES";
	}
});

export const ArchiveEdit = new ValidatedMethod({
	name: 'Archives.methods.edit',
	validate({ text, startAt, stopAt }) {
		if(!_.isString(text)){
			throw new ValidationError([{
				name: 'text',
				type: 'not-a-string',
				details: {
				  value: text
				}
			}]);
		}
		if(!_.isNumber(startAt)){
			throw new ValidationError([{
				name: 'startAt',
				type: 'not-a-number',
				details: {
				  value: startAt
				}
			}]);
		}
		if(!_.isNumber(stopAt)){
			throw new ValidationError([{
				name: 'stopAt',
				type: 'not-a-number',
				details: {
				  value: stopAt
				}
			}]);
		}
		if(stopAt < startAt){
			throw new ValidationError([{
				name: 'stopAt<startAt',
				type: 'inconsistant-value',
				details: {
				  value: (stopAt-startAt)
				}
			}]);
		}
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ text, startAt, stopAt  }) {
		Utilities.checkUserLoggedIn();
		this.unblock();
		if(Meteor.isServer){
			let myArchive = Archives.findOne({
				type : config.archives.private.type,
				owner : this.userId
			}, {
				field : {
					_id : 1
				}
			});
			ArchiveTools.splice(myArchive._id, text, startAt, stopAt)
			.then(data=>{
				Archives.update({
					_id : myArchive._id
				}, {
					$inc : {
						count : -(stopAt - startAt), 
					},
					$set : {
						updatedAt : new Date()
					}
				});
			})
			.catch(err=>console.log(err));
		}
	}
});
