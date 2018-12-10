/*----------------------------------------*\
  runtime-examples - background.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-27 23:11:57
  @Last Modified time: 2018-12-10 16:26:10
\*----------------------------------------*/

import AsteroidHelper from "./AsteroidHelper.js";
import Utilities from './../shared/utilities.js';
import Data from "./../shared/Data.js";
import { config } from './../shared/config.js';

Data.on("*", (value, name) => Utilities.log("---on---", name, value));

Data.on("archiveSize", (value, name) =>{
	Utilities.sendMessage("archiveSize", value);
});

Data.on("blindfields", (value, name) =>{
	Utilities.setBlindfield(value)
		.then(blindfield => Utilities.sendMessageToAllTab("blindfield", blindfield))
		.catch(error => Utilities.error(error));
});

Data.on("blacklist", (value, name) =>{
	Utilities.setBlackList(value)
		.then(urls => Utilities.reloadTabs(urls))
		.catch(error => Utilities.error(error));
});

Data.on("currentURLBlacklisted", (value, name) =>{
	Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
});

Utilities.tabsOnActivatedAddListener(({tabId}) => {
	Utilities.updateCurrentUrl({ 'active': true, 'lastFocusedWindow': true });
});

Utilities.on("signup", (data, resolve, reject) =>{
	AsteroidHelper.signup(data)
		.then(message => resolve(!!message))
		.catch(error => reject(error));
});

Utilities.on("login", (data, resolve, reject) =>{
	AsteroidHelper.login(data)
		.then(message => resolve(!!message))
		.catch(error => reject(error));
});

Utilities.on("logout", (data, resolve, reject) =>{
	AsteroidHelper.logout()
		.then(message => resolve(AsteroidHelper.asteroid.loggedIn))
		.catch(error => reject(error));
});

Utilities.on("isLogin", (data, resolve, reject) =>{
	resolve(AsteroidHelper.asteroid.loggedIn);
});

Utilities.on("openTab", (data, resolve, reject) =>{
	Utilities.tabHandler()
		.then(tab=>Utilities.tabsUpdate({url: data}))
		.catch(()=>Utilities.tabsCreate({url: data}));
});

Utilities.on("getUrlStatus", (data, resolve, reject) =>{
	Utilities.updateCurrentUrl({ 'active': true, 'lastFocusedWindow': true })
		.then(data => resolve(data))
		.catch(error => reject(error));
});

Utilities.on("getBlindfields", (data, resolve, reject) =>{
	resolve(Utilities.getBlindfields());
});

Utilities.on("getArchiveSize", (data, resolve, reject) =>{
	resolve(Data.state.archiveSize);
});

Utilities.on("blacklistAdd", (data, resolve, reject) =>{
	AsteroidHelper.call("Settings.Blacklist.Add", { url : data })
		.then(data => resolve(data))
		.catch(error => reject(error));
});

Utilities.on("blacklistRemove", (data, resolve, reject) =>{
	AsteroidHelper.call("Settings.Blacklist.Remove", { url : data })
		.then(data => resolve(data))
		.catch(error => reject(error));
});

Utilities.on("archive, backspace", (data, resolve, reject) =>{
	if(data){
		Utilities.log(data);
		Utilities.addToArchiveBuffer(data);
	}
	Utilities.setIcon("backspacing");
	Utilities.procrastinate(config.senderTimeout, "deferredArchiveAdd")
	.then(message =>{
		let archive = Utilities.getArchiveBuffer();
		if(archive.length < 1) throw new Error("Archive Add cancelled, casue local archive is empty");
		return 	AsteroidHelper.call("Archives.methods.add", { 
					text: archive.split("").reverse().join("") 
				})
				.then(()=>{
					Utilities.log(archive.split("").reverse().join(""), "archived");
					Utilities.clearArchiveBuffer();
					resolve("archived")
				})
				.catch((e)=>{
					reject(e);
				})
				.finally(()=>{
					Utilities.setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
				});
	})
	.catch(message =>{
		reject(message);
	});
});