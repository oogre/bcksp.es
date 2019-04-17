/*----------------------------------------*\
  bcksp.es - popupManager.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-04-17 12:28:31
  @Last Modified time: 2019-04-17 12:44:39
\*----------------------------------------*/
import { runtimeGetURL } from './../utilities/browser.js';

let iframe;
let reloadBtn;
export function openReload(){
	reloadBtn = document.createElement('button');
	reloadBtn.innerText = "bcksp.es ask to reload this page";
	reloadBtn.addEventListener("click", ()=>{
		location.reload();
	}, true);
	reloadBtn.style.cssText = 	"position:fixed;"+
								"top:10px;"+
								"right:50%;"+
								"display:block;"+
								"z-index:100000;";
	document.body.appendChild(reloadBtn);
}

export function closeReload(){
	reloadBtn.parentNode.removeChild(reloadBtn);
	reloadBtn = null;
}

export function toggleReload(){
	if(reloadBtn){
		closeReload();
	}else{
		openReload();	
	}
}

export function openPopup(){
	iframe = document.createElement('iframe');
	// Must be declared at web_accessible_resources in manifest.json
	iframe.src = runtimeGetURL('popup.html');
	iframe.name = iframe.id = "bcksp_es_frame";
	iframe.style.cssText = 	"position:fixed;"+
							"top:10px;"+
							"right:10px;"+
							"display:block;"+
							"width:300px;"+
							"height:400px;"+
							"z-index:100000;"+
							"background-color:#fff;";
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