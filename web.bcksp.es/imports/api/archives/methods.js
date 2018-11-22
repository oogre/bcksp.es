/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:22
  @Last Modified time: 2018-11-22 21:14:41
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
		this.unblock();
		if(Meteor.isServer){
			text = text.replace(/&nbsp;/g, " ");
			
			let myArchive = Archives.findOne({
				type : config.archives.private.type,
				owner : this.userId
			}, {
				field : {
					_id : 1
				}
			});

			text = text+" ";
			let fsExtra = Npm.require('fs-extra');
			fsExtra.appendFile(process.env.ARCHIVE_PATH+"/"+myArchive._id+'.txt', text.split("").reverse().join(""))
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
			.then(()=>fsExtra.readFile(process.env.ARCHIVE_PATH+"/longBuffer.txt", "utf8"))
			.then(longBuffer=>{
				longBuffer = longBuffer + text.split("").reverse().join("");
				longBuffer = longBuffer.substr(-config.archives.public.longBuffer.maxLen);
				return fsExtra.writeFile(process.env.ARCHIVE_PATH+"/longBuffer.txt", longBuffer, "utf8")
			})
			.then(()=>{
				Archives.update({
					type : config.archives.public.type
				}, {
					$inc : {
						total : text.length
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
export const ArchiveGet = new ValidatedMethod({
	name: 'Archives.methods.get',
	validate() {},
	applyOptions: {
		noRetry: true,
	},
	run() {
		if(Meteor.isServer){
			return Npm.require('fs').readFileSync(process.env.ARCHIVE_PATH+"/longBuffer.txt", "utf8").split("").reverse().join("");
		}
	}
});