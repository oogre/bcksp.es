/*----------------------------------------*\
  runtime-examples - content.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-28 03:12:11
  @Last Modified time: 2019-04-18 09:10:21
\*----------------------------------------*/
import { jQuery } from './../utilities/tools.js';
import BackspaceListener from './BackspaceListener.js';
import { on, sendMessage } from './../utilities/com.js';
import { log, info, warn, error } from './../utilities/log.js';
import { togglePopup, closePopup, toggleReload } from './popupManager.js';



document.documentElement.setAttribute('bcksp-es-extension-installed', true);

on("askReload", (data, resolve) => {
	if(window != window.top)return;
	toggleReload();
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

jQuery.fn.ready(() => {
	sendMessage("isLogin")
	.then(async (isLoggedIn) => {
		if(!isLoggedIn) throw new Error('You are not logged in, so bcksp.es in not available');
		return true;
	})
	.then(() => sendMessage("getUrlStatus"))
	.then(async ({blackListed}) => {
		if(blackListed) throw new Error('This web site is blacklisted, so here bcksp.es in not available');
		return true;
	})
	.then(() => new BackspaceListener())
	.catch(e => error(e.message));

	window.addEventListener("message", function(event) {
		console.log(event);
	    // We only accept messages from ourselves
	    if (event.source != window)
	        return;

	    if (event.data.type && (event.data.type == "login")) {
	        sendMessage("login", event.data)
			.then(data => info(data))
			.catch(e => info(e.message));
	    }
	    if (event.data.type && (event.data.type == "logout")) {
	    	sendMessage("logout")
			.then(data => info(data))
			.catch(e => info(e.message));
	    }
	});
});
