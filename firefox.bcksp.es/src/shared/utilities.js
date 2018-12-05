/*----------------------------------------*\
  bcksp.es - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:36:49
  @Last Modified time: 2018-12-06 00:51:30
\*----------------------------------------*/
import _ from 'underscore'
import Data from "./Data.js";
import Multi from "./Multi.inherit.js";
import { config } from './config.js';
import UtilitiesIcon from "./utilities.icon.js";
import UtilitiesArchive from "./utilities.archive.js";
import UtilitiesBackspace from "./utilities.backspace.js";
import UtilitiesBlacklist from "./utilities.blacklist.js";
import UtilitiesValidation from "./utilities.validation.js";

export default class Utilities extends Multi.inherit( UtilitiesIcon, UtilitiesBackspace, UtilitiesArchive, UtilitiesBlacklist, UtilitiesValidation ) {

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
		return browser.tabs.query({ 
				url : config.standard_url, 
				currentWindow: true 
			})
			.then(tabs=>tabs[0])
			.then(tab=>{
				if(!tab.active){
					return browser.tabs.highlight({tabs:tab.index}).then(()=>tab);
				}
				return tab;
			});
	}
	
	static async sendMessage(action, data){
		//if(_.isEmpty(data)) throw new Error ("sendMessage - Data is not provided");
		return browser.runtime.sendMessage({
			action : action,
			data : data
		});
	}

	static async sendMessageToAllTab(action, data){
		return browser.tabs.query({})
				.then(tabs => {
					tabs.map(tab =>{
						browser.tabs.sendMessage(tab.id, {action, data})
						.then(response => {
      						console.log("Message from the content script:", response);
    					}).catch(e => console.log("ERROR", e));;	
					});
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

Utilities.LOG_LVLS = {
	OFF : -1,
	ERROR : 0,
	WARN : 1,
	TRACE : 2,
	INFO : 3,
	LOG : 4
};

Utilities.LOG_LVL = Utilities.LOG_LVLS.LOG;
