/*----------------------------------------*\
  bcksp.es - utilities.icon.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-25 22:59:25
  @Last Modified time: 2018-05-30 19:56:00
\*----------------------------------------*/

import _ from 'underscore';
import Data from "./Data.js";

export default class UtilitiesIcon {
	static prefixFormat(input, base = 10){
		let table = [{
				value : Math.pow(base, 3),
				name : "kilo",
				symbol : "k"
			},{
				value : Math.pow(base, 6),
				name : "mega",
				symbol : "M"
			},{
				value : Math.pow(base, 9),
				name : "giga",
				symbol : "G"
			},{
				value : Math.pow(base, 12),
				name : "tera",
				symbol : "T"
		}];
		for(let i = table.length - 1 ; i >= 0 ; i --){
			if(input >= table[i].value){
				input /= table[i].value;
				input = input.toFixed(1);
				if(input.length > 3){
					input = input.substr(0, input.indexOf("."));
				}
				input += table[i].symbol;
				return input;
			}
		}
		return ""+Math.round(input);
	}

	static setDefaultIcon(loggedIn){
		UtilitiesIcon.setIcon(loggedIn ? "standby" : "logout");
	}

	static setBadgeText(value){
		browser.browserAction.setBadgeText({
			text: _.isNumber(value) && value != 0 ? UtilitiesIcon.prefixFormat(value) : ""
		});
	}

	static setIcon(name){
		if(name != "blackList" && Data.state.currentURLBlacklisted) return UtilitiesIcon.setIcon("blackList");
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
		if(_.isString(icons[name])){
			clearInterval(timers.icons);
			timers.icons = undefined;
			browser.browserAction.setIcon({
				path: icons[name]
			});
		}else if(_.isArray(icons[name]) && undefined === timers.icons){
			timers.icons = setInterval(() => {
				browser.browserAction.setIcon({
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
}
