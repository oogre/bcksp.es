/*----------------------------------------*\
  runtime-examples - index.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-27 23:11:57
  @Last Modified time: 2018-05-31 14:23:53
\*----------------------------------------*/

import AsteroidHelper from "./AsteroidHelper.js";
import Utilities from './../shared/utilities.js';
import Data from "./../shared/Data.js";
import _ from 'underscore';

let senderTimeout = 6000;

Data.on("*", (value, name) => console.log("---on---", name, value));

Data.on("currentURLBlacklisted", (value, name) =>{
	Utilities.log("UPDATE : ", value, name);
	Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
});

console.log(chrome);

chrome.tabs.onActivated.addListener(({tabId}) => {
	chrome.tabs.get(tabId, ({url}) => {
		Data.setState({
			currentURLBlacklisted : Utilities.getIntoBlackList(url) !== false
		});
	});
});

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
	if(sender.id != chrome.runtime.id)return;
	new Promise((resolve, reject) => {
		switch(request.action){
			case "login" : 
				Utilities.isEmail(request.data.email)
					.then(data => Utilities.isPwd(request.data.pwd, data))
					.then(data => AsteroidHelper.login(request.data))
					.then(message => resolve(!!message /* convert response to bool */))
					.catch(error => reject(error));
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
			case "logout" : 
				AsteroidHelper.logout()
					.then(message => resolve(AsteroidHelper.asteroid.loggedIn))
					.catch(error => reject(error));
			break;
			case "isLogin":
				resolve(AsteroidHelper.asteroid.loggedIn);
			break;
			case "getUrl": // Called everytime a page is loaded
				new Promise((resolve, reject) => {
					chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, (value, error)=>{
						if(error)return reject(error);
						resolve(value);
					});
				}).then(async (tabs) => {
						Utilities.log("tabs", tabs);
						if(!_.isArray(tabs) || tabs.length <= 0 ) throw new Error("URL not found");
						Data.setState({
							currentURLBlacklisted : Utilities.getIntoBlackList(tabs[0].url) !== false
						});
						return {
							url : tabs[0].url,
							blackListed : +Data.state.currentURLBlacklisted  // +true => 1 | +false => 0
						};
					})
					.then(data => resolve(data))
					.catch(error => reject(error));
			break;
			case "changeBWlist":
				AsteroidHelper.blacklist(request.data.blacklisted, request.data.url)
					.then(data => resolve(data))
					.catch(error => reject(error));
			break;
		}
	})
	.then(data => sendResponse(data))
	.catch(error => console.log(error));
	return true; //so i can use sendResponse later
});