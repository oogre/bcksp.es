/*----------------------------------------*\
  bcksp.es - popupManager.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-04-17 12:28:31
  @Last Modified time: 2019-06-06 23:05:11
\*----------------------------------------*/
import { runtimeGetURL } from './../utilities/browser.js';
import { sendMessage } from './../utilities/com.js';


let iframe;

export function openPopup(){
	iframe = document.createElement('iframe');
	// Must be declared at web_accessible_resources in manifest.json
	iframe.src = runtimeGetURL('popup.html');
	iframe.name = iframe.id = "bcksp_es_frame";
	iframe.className = "bcksp-frame";
	iframe.style.cssText = 	"position:fixed;"+
							"top:10px;"+
							"right:10px;"+
							"display:block;"+
							"width:300px;"+
							"height:500px;"+
							"z-index:100000;"+
							"border: 0;";
	document.body.appendChild(iframe);
}

export function closePopup(){
	iframe.parentNode.removeChild(iframe);
	iframe = null;
}

export function togglePopup(){
	if(iframe){
		closePopup();
	}else{
		openPopup();
	}
}