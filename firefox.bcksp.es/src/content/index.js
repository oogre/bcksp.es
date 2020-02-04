/*----------------------------------------*\
  runtime-examples - content.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-28 03:12:11
  @Last Modified time: 2020-02-04 15:59:40
\*----------------------------------------*/
import { jQuery } from './../utilities/jQuery.js';
import BackspaceListener from './BackspaceListener.js';
import { on, sendMessage } from './../utilities/com.js';
import { runtimeGetURL } from './../utilities/browser.js';
import { log, info, warn, error } from './../utilities/log.js';
import { togglePopup, closePopup, createIcon, setIcon, closeIcon } from './popupManager.js';

document.documentElement.setAttribute('bcksp-es-extension-installed', true);

on("askReload", (data, resolve) => {
	if(window != window.top)return;
	BackspaceListener.toggle();
	resolve(true);
});

on("login", (data, resolve) => {
	//if(window != window.top)return;
	BackspaceListener.start();
	resolve(true);
});

on("logout", (data, resolve) => {
	//if(window != window.top)return;
	BackspaceListener.stop();
	resolve(true);
});

on("closePopup", (data, resolve) =>{
	if(window != window.top)return;
	closePopup();
	resolve(true);
});

on("openPopup", (data, resolve) =>{
	if(window != window.top)return;
	togglePopup();
	resolve(true);
});

on("blindfield", (data, resolve) =>{
	Data.setState({
		blindfields : data
	});
	resolve(true);
});

on("displayIcon", ({path}, resolve) =>{
	if(window != window.top)return;
	setIcon(runtimeGetURL(path));
	resolve(true);
});

on("hideIcon", (data, resolve) =>{
	if(window != window.top)return;
	closeIcon();
	resolve(true);
});

jQuery.fn.ready(()=>{
	BackspaceListener.start();
	createIcon();
});