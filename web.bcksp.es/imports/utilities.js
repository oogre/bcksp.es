/*----------------------------------------*\
  web.bitRepublic - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:21:58
  @Last Modified time: 2018-11-25 21:37:02
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

let windowLoaded = false;
export async function isExtensionInstalled(){
	let bckspesExtensionInstalled = false;
	return new Promise((resolve, reject) => {
		if(!windowLoaded){
			window.addEventListener('load', ()=>{
				windowLoaded = true;
				bckspesExtensionInstalled = !!document.querySelector("[bcksp-es-extension-installed]");
				resolve(bckspesExtensionInstalled);
			});	
		}else{
			resolve(bckspesExtensionInstalled);
		}
	});
}