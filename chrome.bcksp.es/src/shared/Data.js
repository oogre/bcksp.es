/*----------------------------------------*\
  bcksp.es - Data.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 19:33:44
  @Last Modified time: 2018-05-23 00:36:07
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
		this.innerText = "";
		this.downFlag = false;
		this.protocol = new Protocol();
	}
}

export default new Data();