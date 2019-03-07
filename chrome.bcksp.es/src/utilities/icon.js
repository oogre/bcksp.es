/*----------------------------------------*\
  bcksp.es - icon.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 14:32:08
  @Last Modified time: 2019-03-06 19:22:59
\*----------------------------------------*/

import Data from "./Data.js";
import { isString, isArray } from './validation.js';
import { browserActionSetIcon } from './browser.js';


export function setDefaultIcon(loggedIn){
	setIcon(loggedIn ? "standby" : "logout");
}

export function setIcon(name){
	if(name != "blackList" && Data.state.currentURLBlacklisted) return setIcon("blackList");
	if(name == Data.getCurrentIconStatus()) return;
	let size = 19;
	let icons = {
		standby : "images/"+size+".standby.png",
		sending : "images/"+size+".sending.png",
		logout : "images/"+size+".logout.png",
		blackList : "images/"+size+".backspacing_3.png",
		backspacing : [
			"images/"+size+".backspacing_1.png", 
			"images/"+size+".backspacing_0.png", 
			"images/"+size+".backspacing_1.png", 
			"images/"+size+".backspacing_2.png",
			"images/"+size+".backspacing_3.png", 
			"images/"+size+".backspacing_2.png",
			"images/"+size+".backspacing_3.png"
		]
	};
	let timers = Data.state.timers;
	if(isString(icons[name])){
		clearInterval(timers.icons);
		timers.icons = undefined;
		browserActionSetIcon({
			path: icons[name]
		});
	}else if(isArray(icons[name]) && undefined === timers.icons){
		timers.icons = setInterval(() => {
			browserActionSetIcon({
				path: icons[name][0]
			});
			icons[name].push(icons[name].shift());
		}, 500);
	}
	Data.setState({
		timers : timers
	});
	Data.addIconHistory(name);
}

