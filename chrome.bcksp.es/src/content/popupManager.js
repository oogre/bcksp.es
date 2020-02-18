/*----------------------------------------*\
  bcksp.es - popupManager.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-04-17 12:28:31
  @Last Modified time: 2020-02-04 16:40:19
\*----------------------------------------*/
import { runtimeGetURL } from './../utilities/browser.js';
import { sendMessage } from './../utilities/com.js';
import { config } from './../shared/config.js';
export function openPopup(){
	let popupIframe = document.createElement('iframe');
	// Must be declared at web_accessible_resources in manifest.json
	popupIframe.src = runtimeGetURL('popup.html');
	popupIframe.name = popupIframe.id = "bcksp-es-frame";
	popupIframe.className = "bcksp-es-frame";
	document.body.prepend(popupIframe);
}

export function closePopup(popupIframe = document.querySelector("#bcksp-es-frame")){
	popupIframe.parentNode.removeChild(popupIframe);
	popupIframe = null;
}

export function togglePopup(){
	let popupIframe = document.querySelector("#bcksp-es-frame");
	if(popupIframe){
		closePopup(popupIframe);
	}else{
		openPopup();
	}
}

export function createIcon(){
	let icon = document.querySelector("#bcksp-es-activity-icon");
	if(icon){
		icon.parentNode.removeChild(icon);
        icon = null;
	}
	icon = document.createElement('div');
	// Must be declared at web_accessible_resources in manifest.json
	icon.name = icon.id = "bcksp-es-activity-icon";
	icon.className = "bcksp-es-activity-icon";

	let link = document.createElement('a');
	link.setAttribute("href", config.getHomeUrl());
	link.innerText = "Your deletion archive is growing";
	icon.append(link);
	document.body.prepend(icon);
	return icon;
}

export function closeIcon(){
	let icon = document.querySelector("#bcksp-es-activity-icon");
	if(!icon) icon = createIcon();
	icon.classList.remove("open");
}

export function setIcon(path){
	let icon = document.querySelector("#bcksp-es-activity-icon");
	if(!icon) icon = createIcon();
	icon.classList.add("open");
	icon.style.backgroundImage = "url('"+path+"')";
}
