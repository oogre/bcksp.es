/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:10:54
  @Last Modified time: 2018-11-07 14:34:56
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

import { Settings } from './settings.js';
import { config } from './../../startup/config.js';
import { streamer } from './../streamer.js';

import * as Utilities from './../../utilities.js';

let translator = i18n.createTranslator("methods");
let errors = i18n.createTranslator("errors");


export const SettingsBlindFieldAdd = new ValidatedMethod({
	name: 'Settings.Blind.Field.Add',
	validate({ type, classFlag=false }) {
		if(!_.isString(type) || _.isEmpty(type)){
			throw new ValidationError([{
				name: 'type',
				type: 'not-a-string',
				details: {
				  value: errors("type.not-a-string")
				}
			}]);
		}
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ type, classFlag=false }) {
		Utilities.checkUserLoggedIn();
		this.unblock();
		
		
		let search = {
			owner : this.userId
		};
		search["blindfield."+(classFlag?"class":"types")] = {
			$nin: [type]
		};
		let value = {
			$push : {},
			$set : {
				updatedAt : new Date()
			}
		}
		value.$push["blindfield."+(classFlag?"class":"types")] = type
		Settings.update(search,value);
	}
});

export const SettingsBlindFieldRemove = new ValidatedMethod({
	name: 'Settings.Blind.Field.Remove',
	validate({ type, classFlag=false }) {
		if(!_.isString(type) || _.isEmpty(type)){
			throw new ValidationError([{
				name: 'type',
				type: 'not-a-string',
				details: {
				  value: errors("type.not-a-string")
				}
			}]);
		}
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ type, classFlag=false }) {
		Utilities.checkUserLoggedIn();
		this.unblock();
		let search = {
			owner : this.userId
		};
		search["blindfield."+(classFlag?"class":"types")] = {
			$in: [type]
		};
		let value = {
			$pull : {},
			$set : {
				updatedAt : new Date()
			}
		}
		value.$pull["blindfield."+(classFlag?"class":"types")] = type
		Settings.update(search, value);
	}
});

export const SettingsBlacklistAdd = new ValidatedMethod({
	name: 'Settings.Blacklist.Add',
	validate({ url }) {
		if(!_.isString(url) || _.isEmpty(url)){
			throw new ValidationError([{
				name: 'url',
				type: 'not-a-string',
				details: {
				  value: errors("url.not-a-string")
				}
			}]);
		}
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		Utilities.checkUserLoggedIn();
		this.unblock();
		let mySettings = Settings.findOne({
			owner : this.userId
		}, {
			fields : {
				blacklist : 1
			}
		});
		if(!mySettings){
			Settings.insert({
				owner : this.userId,
				blacklist : [ url ],
				createdAt : new Date(),
				updatedAt : new Date()
			});
		}else{
			Settings.update({
				_id : mySettings._id,
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
		}
	}
});

export const SettingsBlacklistRemove = new ValidatedMethod({
	name: 'Settings.Blacklist.Remove',
	validate({ url }) {
		if(!_.isString(url) || _.isEmpty(url)){
			throw new ValidationError([{
				name: 'url',
				type: 'not-a-string',
				details: {
				  value: errors("url.not-a-string")
				}
			}]);
		}
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run({ url }) {
		Utilities.checkUserLoggedIn();
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
	}
});