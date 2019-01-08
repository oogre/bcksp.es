/*----------------------------------------*\
  runtime-examples - background.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-27 23:11:57
  @Last Modified time: 2019-01-05 18:17:25
\*----------------------------------------*/

import Data from "./../utilities/Data.js";
import { config } from './../shared/config.js';
import AsteroidHelper from "./AsteroidHelper.js";
import { procrastinate } from './../utilities/timer.js';
import { checkConnected } from './../utilities/validation.js';
import { log, info, warn, error } from './../utilities/log.js';
import { setIcon, setDefaultIcon } from './../utilities/icon.js';
import { on, sendMessage, sendMessageToAllTab } from './../utilities/com.js';
import { tabHandler, reloadTabs, getTabStatus } from './../utilities/tab.js';
import { setBlindfield, setBlackList, getBlindfields, addToArchiveBuffer, getArchiveBuffer, clearArchiveBuffer } from './../utilities/localStorage.js';
import { tabsUpdate, tabsCreate, tabsOnActivatedAddListener, runtimeOnInstalledAddListener, runtimeSetUninstallURL } from './../utilities/browser.js';

Data.setState({
	"loggedStatus": false
});

Data.on("loggedStatus", loggedIn => {
	if(!loggedIn){
		info("log Out");
		tabHandler()
		.then(tab => tabsUpdate({url: config.getLogoutUrl() }))
		.catch(() => tabsCreate({url: config.getLogoutUrl() }));
	}else{
		info("log In");
		AsteroidHelper.call("Users.methods.login.token")
		.then(res=>{
			tabHandler()
			.then(tab => tabsUpdate({url: config.getLoginUrl(res.data) }))
			.catch(() => tabsCreate({url: config.getLoginUrl(res.data) }));
		}).catch(err => {
			warn("no way to auto connect to the website");
		});
	}
	setDefaultIcon();
});

Data.on("*", (value, name) => log("---on---", name, value));

Data.on("archiveSize", (value, name) =>{
	sendMessage("archiveSize", value)
	.then(data => info(data))
	.catch(e => info(e.message));
});

Data.on("blindfields", (value, name) =>{
	setBlindfield(value)
	.then(blindfield => sendMessageToAllTab("blindfield", blindfield))
	.catch(e => error(e));
});

Data.on("blacklist", (value, name) =>{
	setBlackList(value)
	.then(urls => reloadTabs(urls))
	.catch(e => error(e));
});

Data.on("currentURLBlacklisted", (value, name) =>{
	setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
});

runtimeOnInstalledAddListener(data => {
	if(data.reason == "install"){
		tabHandler()
		.then(tab => tabsUpdate({url:config.getHomeUrl()}))
		.catch(() => tabsCreate({url:config.getHomeUrl()}));
	}
});

runtimeSetUninstallURL(config.getLogoutUrl());

tabsOnActivatedAddListener(({tabId}) => {
	getTabStatus({ 'active': true, 'currentWindow': true })
	.then(data=>{
		Data.setState({
			currentURLBlacklisted : data.blackListed
		});
	});
});

on("forgotPwd", (data, resolve, reject) =>{
	checkConnected()
	.then(() => AsteroidHelper.call("Users.methods.reset.password", data))
	.then(data => resolve(data))
	.catch(e => reject(e));
});

on("signup", (data, resolve, reject) =>{
	checkConnected()
	.then(() => AsteroidHelper.asteroid.createUser(data) )
	.then(data => resolve(!!data))
	.catch(e => reject(e));
});

on("login", (data, resolve, reject) =>{
	checkConnected()
	.then(() => AsteroidHelper.asteroid.loginWithPassword(data) )
	.then(data => resolve(!!data))
	.catch(e => reject(e));
});

on("logout", (data, resolve, reject) =>{
	checkConnected()
	.then(() => AsteroidHelper.asteroid.logout() )
	.then(() => {
		resolve(AsteroidHelper.asteroid.loggedIn)
	})
	.catch(e => {
		reject(e)
	});
});

on("blacklistAdd", (data, resolve, reject) =>{
	checkConnected()
	.then(() => AsteroidHelper.call("Settings.Blacklist.Add", { url : data }) )
	.then(data => resolve(data))
	.catch(e => reject(e));
});

on("blacklistRemove", (data, resolve, reject) =>{
	checkConnected()
	.then(() => AsteroidHelper.call("Settings.Blacklist.Remove", { url : data }) )
	.then(data => resolve(data))
	.catch(e => reject(e));
});

on("isLogin", (data, resolve, reject) =>{
	resolve(AsteroidHelper.asteroid.loggedIn);
});

on("openTab", (data, resolve, reject) =>{
	tabHandler()
	.then(tab => tabsUpdate({url: data}))
	.catch(() => tabsCreate({url: data}))
	.finally(() => resolve("ok"));
});

on("getUrlStatus", (data, resolve, reject) =>{
	getTabStatus({ 'active': true, 'currentWindow': true })
	.then(data=>{
		Data.setState({
			currentURLBlacklisted : data.blackListed
		});
		data.blackListed = +data.blackListed;  // +true => 1 | +false => 0
		return data;
	})
	.then(data => resolve(data))
	.catch(e => reject(e));
});

on("getBlindfields", (data, resolve, reject) =>{
	resolve(getBlindfields());
});

on("getArchiveSize", (data, resolve, reject) =>{
	resolve(Data.state.archiveSize);
});

on("archive, backspace", (data, resolve, reject) =>{
	if(data) addToArchiveBuffer(data);
	setIcon("backspacing");
	procrastinate(config.senderTimeout, "deferredArchiveAdd")
	.then(message =>{
		checkConnected();
		let archive = getArchiveBuffer();
		if(archive.length < 1) throw new Error("Archive Add cancelled, casue local archive is empty");
		return 	AsteroidHelper.call("Archives.methods.add", { 
					text: archive.split("").reverse().join("") 
				})
				.then(()=>{
					log(archive.split("").reverse().join(""), "archived");
					clearArchiveBuffer();
					resolve("archived")
				})
				.catch((e)=>{
					reject(e);
				})
				.finally(()=>{
					setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
				});
	})
	.catch(e =>{
		reject(e);
	});
});