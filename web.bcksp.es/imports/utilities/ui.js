/*----------------------------------------*\
  bcksp.es - confirm.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 15:35:04
  @Last Modified time: 2019-01-05 19:35:50
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

