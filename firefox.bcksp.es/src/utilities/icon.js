/*----------------------------------------*\
  bcksp.es - icon.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 14:32:08
  @Last Modified time: 2020-07-01 16:16:44
\*----------------------------------------*/

import Data from "./Data.js";
import { isString, isObject } from './validation.js';
import { browserActionSetIcon } from './browser.js';
import { sendMessageToTab } from './com.js';

export function setDefaultIcon(loggedIn){
	if(Data.state.connected){
		setIcon(loggedIn ? "standby" : "logout");	
	}else{
		setIcon("offline");
	}
}

export function setIcon(name){
	if(name != "blackList" && Data.state.currentURLBlacklisted) return setIcon("blackList");
	if(name == Data.state.currentIcon) return;
	let size = 19;
	let icons = {
		standby : "images/"+size+".ExtIcon_Loggedin_Whitelisted.png",
		sending : {
			time : 20,
			anim : [
				"images/"+size+".ExtIcon_Loggedin_Sending1.png",
				"images/"+size+".ExtIcon_Loggedin_Sending2.png"
			]
		},
		logout : "images/"+size+".ExtIcon_Loggedout.png",
		offline : "images/"+size+".ExtIcon_Loggedin_Offline.png",
		blackList : "images/"+size+".ExtIcon_Loggedin_Blacklisted.png",
		backspacing : {
			time : 125,
			anim : [
				"images/"+size+".ExtIcon_Backspacing1.png", 
				"images/"+size+".ExtIcon_Backspacing2.png", 
				"images/"+size+".ExtIcon_Backspacing3.png", 
				"images/"+size+".ExtIcon_Backspacing4.png",
				"images/"+size+".ExtIcon_Backspacing5.png", 
				"images/"+size+".ExtIcon_Backspacing6.png",
				"images/"+size+".ExtIcon_Backspacing7.png",
				"images/"+size+".ExtIcon_Backspacing8.png"
			]
		}
	};
	let timers = Data.state.timers;
	if(isString(icons[name])){
		clearInterval(timers.icons);
		timers.icons = undefined;
		browserActionSetIcon({ path: icons[name] })
		.catch(req => sendMessageToTab("hideIcon") );
	}
	else if(isObject(icons[name])){
		clearInterval(timers.icons);
		timers.icons = setInterval(() => {
			
			browserActionSetIcon({ path: icons[name].anim[0] })
			.catch(req => sendMessageToTab("displayIcon", req) );

			icons[name].anim.push(icons[name].anim.shift());
		}, icons[name].time);
	}
	Data.setState({
		timers : timers,
		currentIcon : name
	});
}

