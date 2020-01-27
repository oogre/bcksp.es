/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:22
  @Last Modified time: 2020-01-26 18:18:54
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';

import { 
	checkDBReference,
	checkString,
	checkUserLoggedIn,
	checkGreaterThan
} from './../../../imports/utilities/validation.js';
import * as ArchiveTools from './utilities.archive.js';
import { log } from './../../../imports/utilities/log.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import { config } from './../../../imports/startup/config.js';
import { Archives } from './../../../imports/api/archives/archives.js';
import { Settings } from './../../../imports/api/settings/settings.js';

export const ArchiveAdd = new ValidatedMethod({
	name: 'Archives.methods.add',
	validate({ text }) {
		checkUserLoggedIn();
		checkString(text);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ text }) {
		this.unblock();
		text = ArchiveTools.cleanInput(text);
		
		let mySettings = Settings.findOne({
			owner : this.userId
		}, {
			fields : {
				publishToPublicFeed : 1
			}
		});

		ArchiveTools.publishToPrivateArchive(text)
		.then(()=>{
			if(mySettings.publishToPublicFeed){
				ArchiveTools.publishToPublicArchive(text);
			}
			ArchiveTools.incrementPublicArchiveCounter(text.length);
		})
		.catch(err=>console.log(err));
		return "YES";
	}
});

export const ArchiveClear = new ValidatedMethod({
	name: 'Archives.methods.clear',
	validate() {
		checkUserLoggedIn();
		checkDBReference({
			type : config.archives.private.type,
			owner : this.userId
		}, Archives);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run() {
		this.unblock();
		return ArchiveTools.clearPrivateArchive()
		.then(()=>{ 
			return {
				success : true,
				message : {
					title : i18n.__("userprofile.danger.deleteArchive.confirmation.title"),
					content : i18n.__("userprofile.danger.deleteArchive.confirmation.content")
				}
			};
		})
		.catch(err => {
			throw err;
		});
	}
});

export const ArchiveDownload = new ValidatedMethod({
	name: 'Archives.methods.download',
	validate() {
		checkUserLoggedIn();
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run() {
		this.unblock();
		let myArchive = Archives.findOne({
			type : config.archives.private.type,
			owner : this.userId
		});
		return ArchiveTools.readAsync(myArchive._id)
		.then(data => {
			return {
				count : myArchive.count,
				content : data,
				createdAt : myArchive.createdAt,
				updatedAt : myArchive.updatedAt,
			};
		})
		.then(data =>{
			let file = [
				i18n.__("souvenir.item.download.file.content", {
					createdAt : moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
					updatedAt : moment(data.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
					content : data.content,
					count : data.count
				})
			];
			return {
				success : true,
				data : file,
				message : {
					title : i18n.__("souvenir.item.download.confirmation.title"),
					content : i18n.__("souvenir.item.download.confirmation.content")
				}
			};
		})
		.catch(err=>console.log(err));
		
	}
});

export const ArchiveEdit = new ValidatedMethod({
	name: 'Archives.methods.edit',
	validate({ text, startAt, stopAt }) {
		checkUserLoggedIn();
		checkString(text);
		checkGreaterThan(stopAt, startAt);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ text, startAt, stopAt  }) {
		this.unblock();
		unpublishToPrivateArchive(text, startAt, stopAt)
		.catch(err=>console.log(err));
	}
});
