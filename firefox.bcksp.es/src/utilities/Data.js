/*----------------------------------------*\
  bcksp.es - reactive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 17:14:14
  @Last Modified time: 2019-01-05 00:03:55
\*----------------------------------------*/
import { isObject, isFunction, isArray } from './validation.js';
import { mapObject } from './tools.js';


class Data{
	constructor(){
		this.state = {
			archiveSize : 0,
			currentURLBlacklisted : false,
			connected : false,
			init : false,
			loggedStatus : false,
			subscribtion : false,
			innerText : "",
			downFlag : false,
			timers : {},
			procrastinations : {},
			currentIcon : "",
			blindfields : {},
			blacklist : []
		};
		this.actions = mapObject(this.state, (value, key) => {
			return [];
		});
		this.actions["*"] = [];
		this.iconHistory = [];
	}
	setState(data){
		if(!isObject(data)) throw new Error("Data.setState takes object as first argument");
		mapObject(data, (value, name) => {
			if(this.state[name] === value)return;
			if(!isArray(this.actions[name]))return;
			this.state[name] = value;
			this.actions[name].concat(this.actions["*"])
			.map(action => {
				try{
					action(value, name);
				}catch(e){}
			});
		});
	}

	on(name, cb){
		if(!isFunction(cb)) throw new Error("Data.on takes a function as second argument");
		if(!isArray(this.actions[name]))this.actions[name] = [];
		this.actions[name].push(cb);
	}

	addIconHistory(name){
		this.iconHistory.push(name);
		if(this.iconHistory.length > 5){
			this.iconHistory.shift()
		}
	}
	getCurrentIconStatus(){
		if(this.iconHistory.length == 0 ) return "";
		return this.iconHistory[this.iconHistory.length-1];
	}
}

export default new Data();