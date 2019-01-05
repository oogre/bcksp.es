/*----------------------------------------*\
  bcksp.es - utilities.icon.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-25 22:59:25
  @Last Modified time: 2018-12-23 13:18:58
\*----------------------------------------*/

import _ from 'underscore';
import Data from "./Data.js";
import Utilities from './utilities.js';

export default class UtilitiesIcon {
	static setDefaultIcon(loggedIn){
		UtilitiesIcon.setIcon(loggedIn ? "standby" : "logout");
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
			Utilities.browserActionSetIcon({
				path: icons[name]
			});
		}else if(_.isArray(icons[name]) && undefined === timers.icons){
			timers.icons = setInterval(() => {
				Utilities.browserActionSetIcon({
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
