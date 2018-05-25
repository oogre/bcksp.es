/*----------------------------------------*\
  bcksp.es - Data.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 19:33:44
  @Last Modified time: 2018-05-25 22:11:13
\*----------------------------------------*/
import _ from 'underscore';

class Protocol{
	constructor(){
		this.protocols = {}
	}
	add(name, action){
		if( _.isString(name) && !_.isEmpty(name) && _.isFunction(action) ){
			this.protocols[name] = action;
		}
	}
	exec(name, data = {}){
		if( _.isFunction( this.protocols[name]) ){
			return this.protocols[name](data);
		};
	}
}

class Data{
	constructor(){
		this.currentURLBlacklisted = false;
		this.innerText = "";
		this.downFlag = false;
		this.protocol = new Protocol();
		this.timers = {};
		this.iconHistory = [];
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