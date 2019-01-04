/*----------------------------------------*\
  bcksp.es - Protocol.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 17:20:27
  @Last Modified time: 2019-01-04 17:21:00
\*----------------------------------------*/
import { isString, isFunction, isEmpty } from './validation.js';

class Protocol{
	constructor(){
		this.protocols = {}
	}
	add(name, action){
		if( isString(name) && !isEmpty(name) && isFunction(action) ){
			this.protocols[name] = action;
		}
	}
	exec(name, data = {}){
		if( isFunction( this.protocols[name]) ){
			return this.protocols[name](data);
		};
	}
}

export default new Protocol();