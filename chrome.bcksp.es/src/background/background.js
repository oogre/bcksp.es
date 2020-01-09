/*----------------------------------------*\
  runtime-examples - background.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-27 23:11:57
  @Last Modified time: 2020-01-09 20:34:52
\*----------------------------------------*/

import Data from "./../utilities/Data.js";
import { config } from './../shared/config.js';
import AsteroidHelper from "./AsteroidHelper.js";
import { procrastinate } from './../utilities/timer.js';
import { getTranslation } from './../utilities/tools.js';
import { checkConnected } from './../utilities/validation.js';
import { log, info, warn, error } from './../utilities/log.js';
import { setIcon, setDefaultIcon } from './../utilities/icon.js';
import { on, sendMessage, sendMessageToTab } from './../utilities/com.js';
import { tabHandler, reloadTabs, getTabStatus } from './../utilities/tab.js';
import { setBlindfield, setBlackList, getBlindfields, addToArchiveBuffer, getArchiveBuffer, clearArchiveBuffer } from './../utilities/localStorage.js';
import { tabsUpdate, tabsCreate, tabsOnActivatedAddListener, runtimeOnInstalledAddListener, runtimeSetUninstallURL, browserActionOnClickAddListener } from './../utilities/browser.js';

Data.on("*", (value, name) => info("---on---", name, value));

Data.on("connected", connectionStatus => {
	setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
	if(!connectionStatus) return;
	getTranslation()
	.then(data => {
		if(Data.state.translation) return;
		localStorage.setItem("translation", JSON.stringify(data));
		Data.setState({ "translation" : true });	
	})
	.catch(e => warn(e));
});

Data.on("loggedStatus", loggedIn => {
	if(!loggedIn){
		tabHandler()
		.then(tab => tabsUpdate({ url : config.getLogoutUrl() }))
		.catch(() => tabsCreate({ url : config.getLogoutUrl() }))
		.finally(() => sendMessageToTab("logout", null, {}).catch(()=>{}));
		Data.setState({ pingStatus : false });
	}else{
		AsteroidHelper.call("Users.methods.login.token")
		.then(res => {
			tabHandler()
			.then(tab => tabsUpdate({ url : config.getLoginUrl(res.data) }))
			.catch(() => tabsCreate({ url : config.getLoginUrl(res.data) }))
			.finally(()=> sendMessageToTab("login", null, {}).catch(()=>{}));
		}).catch(err => warn("no way to auto connect to the website"));
		Data.setState({ pingStatus : true });
	}
	setDefaultIcon(loggedIn);
});

Data.on("pingStatus", (value, name) => {	
	if(Data.state.pingID){
		Data.setState({ pingID : clearInterval(Data.state.pingID) });	
	}
	if(value){
		AsteroidHelper.call("Users.methods.ping");
		Data.setState({ 
			pingID : setInterval(()=> AsteroidHelper.call("Users.methods.ping"), config.pingInterval)
		});
	}
});

Data.on("pingInterval", (value, name) => {
	config.pingInterval = value;
	Data.setState({ pingStatus : false });
	Data.setState({ pingStatus : true });
});

Data.on("archiveSize", (value, name) => {
	sendMessage("archiveSize", value)
	.catch(e => warn(e));

	sendMessage("archiveRatio", value/Data.state.maxCharPerBook)
	.catch(e => warn(e));
});

Data.on("maxCharPerBook", (value, name) => {
	sendMessage("archiveRatio", Data.state.archiveSize/value)
	.catch(e => warn(e));
});

Data.on("blindfields", (value, name) => {
	setBlindfield(value)
	.then(blindfield => sendMessageToTab("blindfield", blindfield, {}))
	.catch(e => warn(e));
});

Data.on("blacklist", (value, name) => {
	setBlackList(value)
	.then(urls => {
		urls.map(url => {
			let req = { 'url': "*://" + url.replace(/:\d+/, "") + "/*" };
			sendMessageToTab("askReload", null, req)
			.then(() => getTabStatus(req))
			.then(data => Data.setState({ currentURLBlacklisted : data.blackListed }))
			.catch(e => warn(e));
		});
	})
	.catch(e => warn(e));
});

Data.on("currentURLBlacklisted", (value, name) => {
	setDefaultIcon(AsteroidHelper.asteroid.loggedIn);
});

Data.setState({
	"loggedStatus" : false
});

runtimeOnInstalledAddListener(data => {
	if(data.reason == "install"){
		tabHandler()
		.then(tab => tabsUpdate({ url : config.getHomeUrl() }))
		.catch(() => tabsCreate({ url : config.getHomeUrl() }));
	}
});

runtimeSetUninstallURL(config.getLogoutUrl());

tabsOnActivatedAddListener(({tabId}) => {
	sendMessageToTab("closePopup")
	.then(() => getTabStatus({ active : true, currentWindow : true }))
	.then(data => Data.setState({ currentURLBlacklisted : data.blackListed }))
	.catch(e => warn(e));
});

browserActionOnClickAddListener(tab => {
	 sendMessageToTab("openPopup")
	 .catch(e => {
	 	tabHandler()
	 	.then(tab => tabsUpdate({ url : config.getHomeUrl() }))
		.catch(() => tabsCreate({ url : config.getHomeUrl() }));
	 });
});

on("closePopup", (data, resolve, reject) => {
	sendMessageToTab("closePopup")
	.then(() => resolve(true))
	.catch(e => reject(e));
});

on("forgotPwd", (data, resolve, reject) => {
	checkConnected()
	.then(() => AsteroidHelper.call("Users.methods.reset.password", data))
	.then(data => resolve(data))
	.catch(e => reject(e));
});

on("signup", (data, resolve, reject) => {
	checkConnected()
	.then(() => AsteroidHelper.createUser(data))
	.then(data => resolve(!!data))
	.catch(e => reject(e));
});

on("login", (data, resolve, reject) => {
	checkConnected()
	.then(() => AsteroidHelper.loginWithPassword(data))
	.then(data => resolve(!!data))
	.catch(e => reject(e));
});

on("logout", (data, resolve, reject) => {
	checkConnected()
	.then(() => AsteroidHelper.asteroid.logout())
	.then(() => resolve(AsteroidHelper.asteroid.loggedIn))
	.catch(e => reject(e));
});

on("blacklistAdd", (data, resolve, reject) => {
	checkConnected()
	.then(() => AsteroidHelper.call("Settings.Blacklist.Add", { url : data }))
	.then(data => resolve(data))
	.catch(e => reject(e));
});

on("blacklistRemove", (data, resolve, reject) => {
	checkConnected()
	.then(() => AsteroidHelper.call("Settings.Blacklist.Remove", { url : data }))
	.then(data => resolve(data))
	.catch(e => reject(e));
});

on("isConnected", (data, resolve, reject) => {
	resolve(Data.state.connected);
});

on("isLogin", (data, resolve, reject) => {
	resolve(Data.state.loggedStatus);//AsteroidHelper.asteroid.loggedIn);
});

on("openTab", (data, resolve, reject) => {
	tabHandler()
	.then(tab => tabsUpdate({ url : data }))
	.catch(() => tabsCreate({ url : data }))
	.finally(() => resolve("ok"));
});

on("getUrlStatus", (data, resolve, reject) => {
	getTabStatus({ active : true, currentWindow : true })
	.then(data=>{
		Data.setState({ currentURLBlacklisted : data.blackListed });
		data.blackListed = +data.blackListed;  // +true => 1 | +false => 0
		return data;
	})
	.then(data => resolve(data))
	.catch(e => reject(e));
});

on("getBlindfields", (data, resolve, reject) => {
	resolve(getBlindfields());
});

on("getArchiveSize", (data, resolve, reject) => {
	resolve(Data.state.archiveSize);
});

on("getArchiveRatio", (data, resolve, reject) => {
	resolve(Data.state.archiveSize/Data.state.maxCharPerBook);
});

on("archive, backspace", (data, resolve, reject) => {
	if(data) addToArchiveBuffer(data);
	setIcon("backspacing");
	procrastinate(config.senderTimeout, "deferredArchiveAdd")
	.then(message => checkConnected())
	.then(() => {
		let archive = getArchiveBuffer();
		if(archive.length < 1) throw new Error("Archive Add cancelled, casue local archive is empty");
		return archive.split("").reverse().join("");
	})
	.then(archive => AsteroidHelper.call("Archives.methods.add", { text: archive }))
	.then(() => {
		clearArchiveBuffer();
		resolve("archived")
	})
	.catch(e => reject(e));
});