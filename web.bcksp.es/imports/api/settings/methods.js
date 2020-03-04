/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:10:54
  @Last Modified time: 2020-03-04 19:18:01
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
			owner : Meteor.userId()
		}, Settings);
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.high,
	applyOptions: {
		noRetry: true,
	},
	run() {
		this.unblock();
		let mySettings = Settings.findOne({
			owner : Meteor.userId()
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
		const T = i18n.createTranslator("methods.settings.publicFeed.success");
		return {
			success : true,
			message : {
				title : T((mySettings.publishToPublicFeed ? "disactive" : "active") +".title"),
				content : T((mySettings.publishToPublicFeed ? "disactive" : "active") +".content")
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
			owner : Meteor.userId(),
			[classFlag] : {
				$nin: [type]
			}
		}, Settings);
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.high,
	applyOptions: {
		noRetry: true,
	},
	run({ type, classFlag=false }) {
		classFlag = "blindfield."+(classFlag?"class":"types");
		this.unblock();
		Settings.update({
			owner : Meteor.userId(),
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
		const T = i18n.createTranslator("methods.settings.blindfield.add.success");
		return {
			success : true,
			message : {
				title : T("title"),
				content : T("content", {field : type})
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
			owner : Meteor.userId(),
			[classFlag] : {
				$in: [type]
			}
		}, Settings);
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.high,
	applyOptions: {
		noRetry: true,
	},
	run({ type, classFlag=false }) {
		this.unblock();
		classFlag = "blindfield."+(classFlag?"class":"types");
		Settings.update({
			owner : Meteor.userId(),
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
		const T = i18n.createTranslator("methods.settings.blindfield.remove.success");
		return {
			success : true,
			message : {
				title : T("title"),
				content : T("content", {field : type})
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
			owner : Meteor.userId(),
			blacklist : {
				$nin: [url]
			}
		}, Settings);
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.high,
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		this.unblock();
		Settings.update({
			owner : Meteor.userId(),
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
		const T = i18n.createTranslator("methods.settings.blacklist.add.success");
		return {
			success : true,
			message : {
				title : T("title"),
				content : T("content", {URL : url})
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
			owner : Meteor.userId(),
			blacklist : {
				$in: [url]
			}
		}, Settings);
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.high,
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		this.unblock();
		Settings.update({
			owner : Meteor.userId(),
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
		const T = i18n.createTranslator("methods.settings.blacklist.remove.success");
		return {
			success : true,
			message : {
				title : T("title"),
				content : T("content", {URL : url})
			}
		};
	}
});