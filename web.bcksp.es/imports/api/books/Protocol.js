/*----------------------------------------*\
  bcksp.es - Protocol.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-30 16:54:12
  @Last Modified time: 2018-05-30 19:48:43
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

export default new Protocol();