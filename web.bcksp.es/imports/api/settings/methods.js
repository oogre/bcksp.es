/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:10:54
  @Last Modified time: 2020-01-26 15:31:32
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { Settings } from './settings.js';
import { config } from './../../startup/config.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import { 
	checkBlindfieldRemoveAllowed,
	checkDBReference,
	checkUserLoggedIn,
	checkString,
	checkUrl
} from './../../utilities/validation.js';

export const SettingsTogglePublishToPublicFeed = new  ValidatedMethod({
	name: 'Settings.Toggle.Publish.To.Public.Feed',
	validate() {
		checkUserLoggedIn();
		checkDBReference({
			owner : this.userId
		}, Settings);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run() {
		this.unblock();
		let mySettings = Settings.findOne({
			owner : this.userId
		}, {
			fields : {
				publishToPublicFeed : 1
			}
		});
		
		Settings.update({
			_id : mySettings._id,
		},{
			$set : {
				publishToPublicFeed : !mySettings.publishToPublicFeed,
				updatedAt : new Date()
			}
		});
		
		return {
			success : true,
			message : {
				title : i18n.__("userprofile.settings.publishToPublicFeed.confirmation."+(mySettings.publishToPublicFeed ? "disactive" : "active") +".title"),
				content : i18n.__("userprofile.settings.publishToPublicFeed.confirmation."+(mySettings.publishToPublicFeed ? "disactive" : "active") +".content")
			}
		};
	}
});


export const SettingsBlindFieldAdd = new ValidatedMethod({
	name: 'Settings.Blind.Field.Add',
	validate({ type, classFlag=false }) {
		checkUserLoggedIn();
		checkString(type);
		classFlag = "blindfield."+(classFlag?"class":"types");
		checkDBReference({
			owner : this.userId,
			[classFlag] : {
				$nin: [type]
			}
		}, Settings);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ type, classFlag=false }) {
		classFlag = "blindfield."+(classFlag?"class":"types");
		this.unblock();
		Settings.update({
			owner : this.userId,
			[classFlag] : {
				$nin: [type]
			}
		}, {
			$push : {
				[classFlag] : type
			},
			$set : {
				updatedAt : new Date()
			}
		});
		return {
			success : true,
			message : {
				title : i18n.__("userprofile.settings.blindfield.confirmation.add.title"),
				content : i18n.__("userprofile.settings.blindfield.confirmation.add.content", {field : type})
			}
		};
	}
});

export const SettingsBlindFieldRemove = new ValidatedMethod({
	name: 'Settings.Blind.Field.Remove',
	validate({ type, classFlag=false }) {
		checkUserLoggedIn();
		checkString(type);
		checkBlindfieldRemoveAllowed(classFlag, type);
		classFlag = "blindfield."+(classFlag?"class":"types");
		checkDBReference({
			owner : this.userId,
			[classFlag] : {
				$in: [type]
			}
		}, Settings);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ type, classFlag=false }) {
		this.unblock();
		classFlag = "blindfield."+(classFlag?"class":"types");
		Settings.update({
			owner : this.userId,
			[classFlag] : {
				$in: [type]
			}
		}, {
			$pull : {
				[classFlag] : type
			},
			$set : {
				updatedAt : new Date()
			}
		});
		return {
			success : true,
			message : {
				title : i18n.__("userprofile.settings.blindfield.confirmation.remove.title"),
				content : i18n.__("userprofile.settings.blindfield.confirmation.remove.content", {field : type})
			}
		};
	}
});

export const SettingsBlacklistAdd = new ValidatedMethod({
	name: 'Settings.Blacklist.Add',
	validate({ url }) {
		checkUserLoggedIn();
		checkUrl(url);
		checkDBReference({
			owner : this.userId,
			blacklist : {
				$nin: [url]
			}
		}, Settings);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		this.unblock();
		Settings.update({
			owner : this.userId,
			blacklist : {
				$nin: [url]
			}
		},{
			$push : {
				blacklist : url
			},
			$set : {
				updatedAt : new Date()
			}
		});
		return {
			success : true,
			message : {
				title : i18n.__("userprofile.settings.blacklist.confirmation.add.title"),
				content : i18n.__("userprofile.settings.blacklist.confirmation.add.content", {URL : url})
			}
		};
	}
});

export const SettingsBlacklistRemove = new ValidatedMethod({
	name: 'Settings.Blacklist.Remove',
	validate({ url }) {
		checkUserLoggedIn();
		checkUrl(url);
		checkDBReference({
			owner : this.userId,
			blacklist : {
				$in: [url]
			}
		}, Settings);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		this.unblock();
		Settings.update({
			owner : this.userId,
			blacklist : {
				$in: [url]
			}
		}, {
			$pull : {
				blacklist : url
			},
			$set : {
				updatedAt : new Date()
			}
		});
		return {
			success : true,
			message : {
				title : i18n.__("userprofile.settings.blacklist.confirmation.remove.title"),
				content : i18n.__("userprofile.settings.blacklist.confirmation.remove.content", {URL : url})
			}
		};
	}
});