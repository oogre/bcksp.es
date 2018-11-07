/*----------------------------------------*\
  web.bitRepublic - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:21:58
  @Last Modified time: 2018-11-05 14:36:41
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { config } from './startup/config.js';
import { Random } from 'meteor/random';

import T from './i18n/index.js';

let translator = i18n.createTranslator("utilities");
let errors = i18n.createTranslator("errors");

export function numberFormat(inputNumber, len){
	check(inputNumber, Number);

	let stringNumber = inputNumber+"";
	let outputNumber = stringNumber;
	while(outputNumber.length < len){
		outputNumber = "0"+outputNumber;
	}
	return outputNumber;
}

export function checkUserLoggedIn(){
	if (!Meteor.userId) {
		throw new ValidationError([{
			name: 'login',
			type: 'needed',
			details: {
				value : errors("login.needed")
			}
		}]);
	}
}
export function isEmail(value){
	let EmailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return !(_.isEmpty(value) || !_.isString(value) || !EmailRegExp.test(value))
}

export function log(content){
	console.log(new Date(), content);
}

export function warn(content){
	console.warn(new Date(), content);
}

export async function needConfirmation(context){
	
	if(confirm(translator("needConfirmation"))){
		return true;
	}else{
		throw new Error("The action has been canceled");
	}
}

export function genPubKey(){
	return (Math.random()<0.5 ? "1" : "3") + Random.hexString(31);
}

export function genPrivateKey(){
	return Random.hexString(64);
}

export function APIerror(message){
	return {
		statusCode : 500,
		headers : {
			"Content-Type" : "text/plain",
		},
		body : message
	}
}

export function isExtensionInstalled(){
	return !!document.querySelector("[bcksp-es-extension-installed]");
}

export function APIsuccess(data){
	return{
		status : "success",
		data : data
	}
}