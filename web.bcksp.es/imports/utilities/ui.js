/*----------------------------------------*\
  bcksp.es - confirm.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 15:35:04
  @Last Modified time: 2019-01-03 15:43:20
\*----------------------------------------*/
import T from './../i18n/index.js';

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