/*----------------------------------------*\
  bcksp.es - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:36:49
  @Last Modified time: 2018-12-10 14:31:05
\*----------------------------------------*/
import _ from 'underscore'
import Data from "./Data.js";
import Multi from "./Multi.inherit.js";
import { config } from './config.js';
import UtilitiesIcon from "./utilities.icon.js";
import UtilitiesArchive from "./utilities.archive.js";
import UtilitiesBrowser from "./utilities.browser.js";
import UtilitiesBackspace from "./utilities.backspace.js";
import UtilitiesBlacklist from "./utilities.blacklist.js";
import UtilitiesValidation from "./utilities.validation.js";

export default class Utilities extends Multi.inherit( UtilitiesIcon, UtilitiesBackspace, UtilitiesArchive, UtilitiesBlacklist, UtilitiesValidation, UtilitiesBrowser ) {

	static procrastinate(delay, name="default"){
		return new Promise((resolve, reject) => {
			let procrastinations = Data.state.procrastinations;
			let timers = Data.state.timers;
			if(timers[name] !== undefined){
				clearTimeout(timers[name]);
				if(_.isFunction(procrastinations[name])){
					procrastinations[name]("I'll do : "+name+" later...");
				}
			}
			procrastinations[name] = reject;
			timers[name] = setTimeout(() => {
				clearTimeout(timers[name]);
				timers[name] = undefined;
				Data.setState({
					timers : timers
				});
				resolve("It's time for : " + name);
			}, delay);
			Data.setState({
				procrastinations : procrastinations,
				timers : timers
			});
  		});
	}

	static async tabHandler(){
		return UtilitiesBrowser.tabsQuery({ 
				url : config.standard_url, 
				currentWindow: true 
			})
			.then(tabs=>{
				return _.findWhere(tabs, {active : true}) || _.last(tabs);
			})
			.then(tab=>{
				if(!tab.active){
					return UtilitiesBrowser.tabsHighlight({tabs:tab.index}).then(()=>tab);
				}
				return tab;
			});
	}

	static async reloadTabs(urls){
		return urls.map( url => {
			UtilitiesBrowser.tabsQuery({
				'url': "*://" + url.replace(/:\d+/, "") + "/*",
			})
			.then(tabs => {
				tabs.forEach(tab => UtilitiesBrowser.tabsReload(tab.id))
			});
		});
	}
	
	static async sendMessage(action, data){
		return UtilitiesBrowser.runtimeSendMessage({
			action : action,
			data : data
		});
	}

	static on(actions, cb){
		actions.split(/\W+/g).map(action=>{
			Utilities.Listener[action] = Utilities.Listener[action] || [];
			let listener = UtilitiesBrowser.runtimeOnMessageAddListener((request, sender) => {
				if(request.action != action)return;
				if(sender.id != UtilitiesBrowser.runtimeId())return;
				return new Promise((resolve, reject) => cb(request.data, resolve, reject));
				//	.then(data => sendResponse(data))
				//	.catch(sendResponse);
				//return true; //so i can use sendResponse later;
			});
			Utilities.Listener[action].push(listener);
		});
	}

	static off(actions){
		actions.split(/\W+/g).map(action=>{
			UtilitiesBrowser.runtimeOnMessageRemoveListener(Utilities.Listener[action]);
			Utilities.Listener[action] = [];
		});
	}

	static async sendMessageToAllTab(action, data){
		return UtilitiesBrowser.tabsQuery({})
				.then(tabs => {
					tabs.map(tab =>{
						UtilitiesBrowser.tabsSendMessage(tab.id, {action, data});
					});
				});
	}

	static async updateCurrentUrl(request){
		return UtilitiesBrowser.tabsQuery(request)
		.then(async (tabs) => {
			if(tabs.length == 0)throw new Error("Tab not found");
			let regexp = /.+\:\/\/([^\/?#]+)(?:[\/?#]|$)/i
			let url = (tabs[0].url.match(regexp)).shift();
			url = url.replace(/https?:\/\//, "");
			url = url.split("").reverse().join("").replace(/\//, "").split("").reverse().join("");
			url = _.isEmpty(url) ? tabs[0].url : url;
			if(!_.isArray(tabs) || tabs.length <= 0 ) throw new Error("URL not found");
			Data.setState({
				currentURLBlacklisted : Utilities.getIntoBlackList(url) !== false
			});
			return {
				url : url,
				blackListed : +Data.state.currentURLBlacklisted  // +true => 1 | +false => 0
			};
		});
	}

	static log(...data){
		if(Utilities.LOG_LVL >= Utilities.LOG_LVLS.LOG){
			console.log.apply(this, ["bcksp.es"].concat(data))
		}
	}

	static info(...data){
		if(Utilities.LOG_LVL >= Utilities.LOG_LVLS.INFO){
			console.info.apply(this, ["bcksp.es"].concat(data))
		}
	}

	static trace(...data){
		if(Utilities.LOG_LVL >= Utilities.LOG_LVLS.TRACE){
			console.trace.apply(this, ["bcksp.es"].concat(data))
		}
	}
	
	static warn(...data){
		if(Utilities.LOG_LVL >= Utilities.LOG_LVLS.WARN){
			console.warn.apply(this, ["bcksp.es"].concat(data))
		}
	}
	
	static error(...data){
		if(Utilities.LOG_LVL >= Utilities.LOG_LVLS.ERROR){
			console.error.apply(this, ["bcksp.es"].concat(data))
		}
	}
}

Utilities.Listener = {};

Utilities.LOG_LVLS = {
	OFF : -1,
	ERROR : 0,
	WARN : 1,
	TRACE : 2,
	INFO : 3,
	LOG : 4
};

Utilities.LOG_LVL = Utilities.LOG_LVLS.LOG;
