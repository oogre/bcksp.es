/*----------------------------------------*\
  bcksp.es - validation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 15:16:34
  @Last Modified time: 2019-01-04 23:40:11
\*----------------------------------------*/

import Data from "./Data.js";
import { config } from './../shared/config.js';
import { getContentEditableInParent, intersection } from "./tools.js";
import { isString, isEmpty, isFunction, isArray } from 'underscore';

export { isString, isEmpty, isFunction, isUndefined, isNull, isArray, isBoolean, isObject } from 'underscore';

export async function checkConnected(){
	if(!Data.state.connected) throw new Error("Server is not accessible");
	return true;
}

export function checkString(value){
	if(!isString(value) || isEmpty(value))
			throw new Error("This is not a valid string : " + value);
	return value;
}

export function checkFunction(value){
	if(!isFunction(value))
			throw new Error("This is not a valid function : " + value);
	return value;
}

export function isContentEditable(element){
	return !!(
			element.contentEditable &&
			element.contentEditable === 'true'
	);
}

export function isInputField(element){
	let nodeName = element.nodeName;
	return nodeName == 'TEXTAREA' || nodeName == 'INPUT';
}

export function checkTarget(element){
	if(!isInputField(element)){
		element = getContentEditableInParent(element);
	}
	return element;
}

export function isAcceptable(elem){
	return elem 
		&& isArray(Data.state.blindfields.types) 
		&& isArray(Data.state.blindfields.class) 
		&& !Data.state.blindfields.types.includes(elem.getAttribute("type")) 
		&& isEmpty(intersection(Data.state.blindfields.class, elem.className.split(" ")));
}

export async function isEmail(value, aggregator = {}){
	let EmailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if(isEmpty(value)) throw new Error("Your email is empty");
	if(!isString(value)) throw new Error("Your email must be a string");
	if(!EmailRegExp.test(value)) throw new Error("Your email is wrong formatted");
	aggregator.email = value;
	return aggregator;
}

export async function isPwd(value, aggregator = {}){
	if(isEmpty(value)) throw new Error("Your password is empty");
	if(!isString(value)) throw new Error("Your password must be a string");
	if(value.length < config.user.password.length.min) throw new Error("Your password is too short, min "+user.password.length.min+" characters");
	if(value.length > config.user.password.length.max) throw new Error("Your password is too long, max "+user.password.length.max+" characters");
	aggregator.password = value;
	return aggregator;
}

export async function isPwdConf(value, aggregator = {}){
	if(isEmpty(value)) throw new Error("Your password confirmation is empty");
	if(aggregator.password != value) throw new Error("Your password confirmation must match your password");
	return aggregator;
}
