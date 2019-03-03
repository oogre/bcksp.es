/*----------------------------------------*\
  bcksp.es - confirm.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 15:35:04
  @Last Modified time: 2019-02-23 16:06:27
\*----------------------------------------*/
import T from './../i18n/index.js';
import { config } from './../startup/config.js';

export async function needConfirmation(context){
	if(confirm(i18n.__("utilities.needConfirmation"))){
		return true;
	}else{
		throw new Error("The action has been canceled");
	}
}

export function isExtensionInstalled(){
	return document.documentElement.hasAttribute("bcksp-es-extension-installed");	
}

export function installExtension(){
	const browser = require('bowser').getParser(window.navigator.userAgent);
	switch(browser.getBrowserName()){
		case "Chrome" : 
			window.open("https://chrome.google.com/webstore/detail/"+config.devices.chrome, '_blank');
		break;
		case "Firefox" : 
			window.open("https://addons.mozilla.org/en-US/firefox/addon/bckspes/", '_blank');
			//window.open("/extensions/firefox/bcksp.es-2.0.0.1-fx.xpi", '_blank');
		break;
	}
	return false;
}
export function setupView(){
	if(FlowRouter.current().context.hash == ""){
		$('html, body').animate({
			scrollTop: 0
		}, 666 );
	}else{
		scrollTo(FlowRouter.current().context.hash);
	}
}
export function scrollTo(hash, offset = 0){
	let h = $("#"+hash);
	if(!!h.length){
		$('html, body').animate({
			scrollTop: h.offset().top - offset
		}, 666 );
	}
}

export function getMessageFromError(error){
	if(_.isArray(error.details) && !_.isEmpty(error.details)){
		return error.details.map(e=>e.details.value).join(", ");
	}
	if(error.errorType == "Meteor.Error"){
		return error.reason;
	}
	if(error.name == "Error"){
		return error.message;
	}
	return error.toString();
}
