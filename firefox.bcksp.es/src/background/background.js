/*----------------------------------------*\
  runtime-examples - background.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-27 23:11:57
  @Last Modified time: 2018-06-02 16:12:08
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

browser.tabs.onActivated.addListener(({tabId}) => {
	updateCurrentUrl({ 'active': true, 'lastFocusedWindow': true })
	.then(data => console.log(data));
});

browser.runtime.onMessage.addListener( (request, sender, sendResponse) => {
	if(sender.id != browser.runtime.id)return;
	return new Promise((resolve, reject) => {
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
				updateCurrentUrl({ 'active': true, 'lastFocusedWindow': true })
					.then(data => resolve(data))
					.catch(error => reject(error));
			break;
			case "changeBWlist":
				AsteroidHelper.blacklist(request.data.blacklisted, request.data.url)
					.then(data => resolve(data))
					.catch(error => reject(error));
			break;
		}
	});
	return true; //so i can use sendResponse later
});


function updateCurrentUrl(request){
	return browser.tabs.query(request)
		.then(async (tabs) => {
			if(tabs.length == 0)throw new Error("Tab not found");
			let regexp = /.+\:\/\/([^\/?#]+)(?:[\/?#]|$)/i
			let url = (tabs[0].url.match(regexp)).shift();
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