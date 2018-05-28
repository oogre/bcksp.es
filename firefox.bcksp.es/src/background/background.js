/*----------------------------------------*\
  runtime-examples - background.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-27 23:11:57
  @Last Modified time: 2018-05-28 03:26:50
\*----------------------------------------*/

import AsteroidHelper from "./AsteroidHelper.js";
import Utilities from './../shared/utilities.js';
import Data from "./../shared/Data.js";
import _ from 'underscore';

let senderTimeout = 6000;

browser.tabs.onActivated.addListener(({tabId}) => {
	chrome.tabs.get(tabId, ({url}) => {
		Data.currentURLBlacklisted = Utilities.getIntoBlackList(url) !== false;
		Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
	});
});

browser.runtime.onMessage.addListener( (request, sender, sendResponse) => {
	//if(sender.id != chrome.runtime.id)return;
	return new Promise(resolve => {
		switch(request.action){
			case "login" : 
				AsteroidHelper.login(request.data,(err, res) => {
					resolve(AsteroidHelper.asteroid.loggedIn);
				});
			break;
			case "archive" : 
				Utilities.log(request.data);
				Utilities.addToArchiveBuffer(request.data);
			case "backspacing" : 
			case "backspaceup" : 
				Utilities.setIcon("backspacing");
				clearTimeout(Data.timers.saveDB);
				Data.timers.saveDB = setTimeout(()=> AsteroidHelper.send(), senderTimeout);
				resolve(true);
			break;
			case "logout" : 
				AsteroidHelper.logout((err, res) => {
					if(err) console.error("LOGOUT FAIL");
					else resolve(AsteroidHelper.asteroid.loggedIn);
				});
			break;
			case "isLogin":
				resolve(AsteroidHelper.asteroid.loggedIn);
			break;
			case "getUrl":
				/*
					Called everytime a page is loaded
				*/
				/*
					+ true; => 1
					+ false; => 0
				*/
				browser.tabs.query({
					'active': true, 
					'lastFocusedWindow': true
				}).then(tabs => {
					let url = tabs[0].url;
				    Data.currentURLBlacklisted = Utilities.getIntoBlackList(url) !== false;
				    Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
				    resolve({
						url : url,
						blackListed : +Data.currentURLBlacklisted
					});
				});
			break;
			case "changeBWlist":
				AsteroidHelper.blacklist(request.data.blacklisted, request.data.url);
				browser.tabs.query({
					'active': true, 
					'lastFocusedWindow': true
				}).then(tabs => {
					browser.tabs.reload(tabs[0].id);
				});
			break;
		}
	});
	return true; //so i can use sendResponse later
});