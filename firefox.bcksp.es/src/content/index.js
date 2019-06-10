/*----------------------------------------*\
  runtime-examples - content.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-28 03:12:11
  @Last Modified time: 2019-06-07 16:57:16
\*----------------------------------------*/
import { jQuery } from './../utilities/jQuery.js';
import BackspaceListener from './BackspaceListener.js';
import { on, sendMessage } from './../utilities/com.js';
import { togglePopup, closePopup } from './popupManager.js';
import { log, info, warn, error } from './../utilities/log.js';

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

jQuery.fn.ready(BackspaceListener.start);