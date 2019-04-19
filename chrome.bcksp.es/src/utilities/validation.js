/*----------------------------------------*\
  bcksp.es - validation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 15:16:34
  @Last Modified time: 2019-04-19 13:51:42
\*----------------------------------------*/

import Data from "./Data.js";
import { MDText } from 'i18n-react';
import { config } from './../shared/config.js';
import { getContentEditableInParent, intersection } from "./tools.js";
import { isString, isEmpty, isFunction, isArray } from 'underscore';
import { setDefaultIcon } from './icon.js';
export { isString, isEmpty, isFunction, isUndefined, isNull, isArray, isBoolean, isObject } from 'underscore';

const T = new MDText(JSON.parse(localStorage.getItem("translation")), { MDFlavor: 1 });;

export async function checkConnected(){
	if(!Data.state.connected){
		setDefaultIcon(Data.state.loggedStatus);
		throw new Error(T.translate("errors.server.offline"));
	}
	return true;
}

export function checkString(value){
	if(!isString(value) || isEmpty(value))
			throw new Error(T.translate("errors.type.not-a-string", { value: value }));
	return value;
}

export function checkFunction(value){
	if(!isFunction(value))
			throw new Error(T.translate("errors.type.not-a-function", { value: value }));
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
	if(isEmpty(value)) throw new Error(T.translate("errors.email.required"));
	if(!isString(value)) throw new Error(T.translate("errors.email.not-a-string"));
	if(!EmailRegExp.test(value)) throw new Error(T.translate("errors.email.not-an-email"));
	aggregator.email = value;
	return aggregator;
}

export async function isPwd(value, aggregator = {}){
	if(isEmpty(value)) throw new Error(T.translate("errors.password.required"));
	if(!isString(value)) throw new Error(T.translate("errors.password.not-a-string"));
	if(value.length < config.user.password.length.min) throw new Error(T.translate("errors.password.min-string", { length : config.user.password.length.min }));
	if(value.length > config.user.password.length.max) throw new Error(T.translate("errors.password.max-string", { length : config.user.password.length.max }));
	aggregator.password = value;
	return aggregator;
}

export async function isPwdConf(value, aggregator = {}){
	if(isEmpty(value)) throw new Error(T.translate("errors.passwordConfirm.required"));
	if(aggregator.password != value) throw new Error(T.translate("errors.passwordConfirm.no-match"));
	return aggregator;
}
