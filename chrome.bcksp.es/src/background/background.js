/*----------------------------------------*\
  runtime-examples - index.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-27 23:11:57
  @Last Modified time: 2018-12-03 14:13:10
\*----------------------------------------*/

import AsteroidHelper from "./AsteroidHelper.js";
import Utilities from './../shared/utilities.js';
import Data from "./../shared/Data.js";
import { config } from './../shared/config.js';
import _ from 'underscore';
import $ from 'jquery';

let senderTimeout = 6000;

Data.on("*", (value, name) => console.log("---on---", name, value));

Data.on("currentURLBlacklisted", (value, name) =>{
	Utilities.log("UPDATE : ", value, name);
	Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
});

chrome.tabs.onActivated.addListener(({tabId}) => {
	updateCurrentUrl({ 'active': true, 'lastFocusedWindow': true })
	.then(data => console.log(data));
});


chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
	if(sender.id != chrome.runtime.id)return;
	new Promise((resolve, reject) => {
		switch(request.action){
			
			case "login" : 
				AsteroidHelper.login(request.data)
					.then(message => resolve(!!message /* convert response to bool */))
					.catch(error => {
						console.log(error);
						reject(error)
					});
			break;
			
			case "isLogin":
				resolve(AsteroidHelper.asteroid.loggedIn);
			break;
			
			case "logout" : 
				AsteroidHelper.logout()
					.then(message => resolve(AsteroidHelper.asteroid.loggedIn))
					.catch(error => reject(error));
			break;
			
			case "signup" : 
				AsteroidHelper.signup(request.data)
					.then(message => resolve(!!message /* convert response to bool */))
					.catch(error => {
						console.log(error);
						reject(error)
					});
			break;
			
			case "archive" : 
				Utilities.log(request.data);
				Utilities.addToArchiveBuffer(request.data);
			case "backspacing" : 
			case "backspaceup" : 
				Utilities.setIcon("backspacing");
				AsteroidHelper.deferredArchiveAdd(senderTimeout)
					.then(data => {
						if(!data) return reject(data);
						Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
						if(data instanceof Error)return reject(data);
						Utilities.clearArchiveBuffer();
						resolve(data);
					})
					.catch(error => {
						Utilities.error("error", error);
						Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
						reject(error);
					});
			break;

			case "getUrlStatus" : 
				updateCurrentUrl({ 'active': true, 'lastFocusedWindow': true })
					.then(data => resolve(data))
					.catch(error => reject(error));
			break;
			
			case "getBlindfields" : 
				resolve(Utilities.getBlindfields());
			break;

			case "getArchiveSize" : 
				resolve(Data.state.archiveSize);
			break;
			
			case "Settings.Blacklist.Add":
			case "Settings.Blacklist.Remove":
				AsteroidHelper.call(request.action, { url : request.data })
					.then(data => resolve(data))
					.catch(error => reject(error));
			break;
			
			case "changeBWlist":
				AsteroidHelper.blacklist(request.data.blacklisted, )
					.then(data => resolve(data))
					.catch(error => reject(error));
			break;
		}
	})
	.then(data => sendResponse(data))
	.catch(sendResponse);
	return true; //so i can use sendResponse later
});

function updateCurrentUrl(request){
	return new Promise((resolve, reject) => {
		chrome.tabs.query(request, (value, error)=>{
			if(error)return reject(error);
			resolve(value);
		});
	}).then(async (tabs) => {
		if(tabs.length == 0)throw new Error("Tab not found");
		let regexp = /.+\:\/\/([^\/?#]+)(?:[\/?#]|$)/i
		let url = (tabs[0].url.match(regexp)).shift();
		url = url.replace(/https?:\/\//, "");
		url = url.split("").reverse().join("").replace(/\//, "").split("").reverse().join("");
		url = _.isEmpty(url) ? tabs[0].url : url;
		if(!_.isArray(tabs) || tabs.length <= 0 ) throw new Error("URL not found");
		Data.setState({
			currentURLBlacklisted : Utilities.getIntoBlackList(url) !== false
		});
		return {
			url : url,
			blackListed : +Data.state.currentURLBlacklisted  // +true => 1 | +false => 0
		};
	});
}