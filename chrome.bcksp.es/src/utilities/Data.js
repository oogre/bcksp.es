/*----------------------------------------*\
  bcksp.es - reactive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 17:14:14
  @Last Modified time: 2020-01-09 17:07:55
\*----------------------------------------*/
import { isObject, isFunction, isArray } from './validation.js';
import { mapObject } from './tools.js';


class Data{
	constructor(){
		this.state = {
			timers : {},
			currentIcon:"",
			blacklist : [],
			innerText : "",
			archiveSize : 0,
			currentIcon : "",
			blindfields : {},
			downFlag : false,
			connected : false,
			pingID : false,
			pingStatus : false,
			pingInterval : 0,
			translation : false,
			loggedStatus : false,
			subscribtion : false,
			procrastinations : {},
			currentURLBlacklisted : false
		};
		this.actions = mapObject(this.state, (value, key) => {
			return [];
		});
		this.actions["*"] = [];
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
}

export default new Data();