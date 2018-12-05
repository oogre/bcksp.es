/*----------------------------------------*\
  web.bitRepublic - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:21:58
  @Last Modified time: 2018-12-05 19:57:46
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import T from './i18n/index.js';

let translator = i18n.createTranslator("utilities");
let errors = i18n.createTranslator("errors");


export function checkUserLoggedIn(){
	if (!Meteor.userId()) {
		throw new ValidationError([{
			name: 'login',
			type: 'needed',
			details: {
				value : errors("login.needed")
			}
		}]);
	}
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