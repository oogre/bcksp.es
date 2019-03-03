/*----------------------------------------*\
  bcksp.es - validation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 14:22:19
  @Last Modified time: 2019-02-25 16:01:40
\*----------------------------------------*/
import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { config } from './../startup/config.js';
import T from './../i18n/index.js';

export function checkObject(value, ...origin){
	if(!_.isObject(value) || _.isEmpty(value))
			throw new ValidationError([{
				name: 'type',
				type: 'not-recognize',
				details: {
				  value: i18n.__("errors.type.not-recognize"),
				  origin : origin,
				}
			}]);
	return value;
}

export function checkArray(value, ...origin){
	if(!_.isArray(value) || _.isEmpty(value))
			throw new ValidationError([{
				name: 'type',
				type: 'not-recognize',
				details: {
				  value: i18n.__("errors.type.not-recognize"),
				  origin : origin,
				}
			}]);
	return value;
}

export function checkString(value, ...origin){
	if(!_.isString(value) || _.isEmpty(value))
			throw new ValidationError([{
				name: 'type',
				type: 'not-a-string',
				details: {
				  value: i18n.__("errors.type.not-a-string"),
				  origin : origin,
				}
			}]);
	return value;
}

export function checkNumber(value, ...origin){
	if(!_.isNumber(value))
			throw new ValidationError([{
				name: 'type',
				type: 'not-a-number',
				details: {
				  value: i18n.__("errors.type.not-a-number"),
				  origin : origin,
				}
			}]);
	return value;
}
export function checkGreaterThan(a, b){
	checkNumber(a);
	checkNumber(b);
	if(a < b)
			throw new ValidationError([{
				name: 'type',
				type: 'greater-than',
				details: {
				  value: i18n.__("errors.type.greater-than", {a, b})
				}
			}]);
	return true;
}

export function checkUrl(value){
	if(!_.isString(value) || _.isEmpty(value))
			throw new ValidationError([{
				name: 'url',
				type: 'not-a-string',
				details: {
				  value: i18n.__("errors.url.not-a-string")
				}
			}]);
	return value;
}

export function checkUserLoggedIn(){
	if (!Meteor.userId()) throw new ValidationError([{
			name: 'login',
			type: 'required',
			details: {
				value : i18n.__("errors.login.required")
			}
		}]);
	return true;
}

export function checkValidDevice(value){
	if(_.isEmpty(value))throw new ValidationError([{
			name: 'device',
			type: 'required',
			details: {
			  value: i18n.__("errors.device.required")
			}
		}]);
	if(!_.isString(value))throw new ValidationError([{
			name: 'device',
			type: 'not-a-string',
			details: {
			  value: i18n.__("errors.device.not-a-string")
			}
		}]);
	if(!_.values(config.devices).includes(value)) throw new ValidationError([{
				name: 'device',
				type: 'no-match',
				details: {
				  value: i18n.__("errors.device.no-match", {deviceId : value})
				}
			}]);
	return value;	
}

export function checkValidEmail(value, hasToExist = true){
	let EmailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if(_.isEmpty(value)) throw new ValidationError([{
				name: 'email',
				type: 'required',
				details: {
				  value: i18n.__("errors.email.required")
				}
			}]);
	if(!_.isString(value)) throw new ValidationError([{
				name: 'email',
				type: 'not-a-string',
				details: {
				  value: i18n.__("errors.email.not-a-string")
				}
			}]);
	if(!EmailRegExp.test(value)) throw new ValidationError([{
				name: 'email',
				type: 'not-an-email',
				details: {
				  value: i18n.__("errors.email.not-an-email")
				}
			}]);

	let userExistance = !!Meteor.users.findOne({"emails.address" : value});

	if( hasToExist && !userExistance) throw new ValidationError([{
				name: 'email',
				type: 'no-match',
				details: {
				  value: i18n.__("errors.email.no-match")
				}
			}]);
	if( !hasToExist && userExistance) throw new ValidationError([{
			name: 'email',
			type: 'already-exists',
			details: {
			  value: i18n.__("errors.email.already-exists")
			}
		}]);
	return value;
}

export function checkValidPassword(value, confirm){
	if(_.isEmpty(value)) throw new ValidationError([{
				name: 'password',
				type: 'required',
				details: {
				  value: i18n.__("errors.password.required")
				}
			}]);
	if(!_.isString(value)) throw new ValidationError([{
				name: 'password',
				type: 'not-a-string',
				details: {
				  value: i18n.__("errors.password.not-a-string")
				}
			}]);
	if(value.length < config.user.password.length.min) throw new ValidationError([{
				name: 'password',
				type: 'min-string',
				details: {
				  value: i18n.__("errors.password.min-string", {length : config.user.password.length.min}) 
				}
			}]);
	if(value.length > config.user.password.length.max) throw new ValidationError([{
				name: 'password',
				type: 'max-string',
				details: {
				  value: i18n.__("errors.password.max-string", {length : config.user.password.length.max}) 
				}
			}]);
	if(_.isEmpty(confirm)) throw new ValidationError([{
				name: 'passwordConfirm',
				type: 'required',
				details: {
				  value: i18n.__("errors.passwordConfirm.required")
				}
			}]);
	if(value !== confirm) throw new ValidationError([{
				name: 'passwordConfirm',
				type: 'no-match',
				details: {
				  value: i18n.__("errors.passwordConfirm.no-match")
				}
			}]);
	return value;
}
export async function asyncIt(fnc, ...args){
	return new Promise((resolve, reject)=>{
		try{
			resolve(fnc.apply(this, args));
		}catch(e){
			reject(e)
		}	
	})	
}
