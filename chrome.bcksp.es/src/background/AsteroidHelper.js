/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2018-05-26 13:31:19
\*----------------------------------------*/
import {createClass} from "asteroid";
import Utilities from '../shared/utilities.js';
import _ from 'underscore';

class AsteroidHelper{
	constructor(){
		const Asteroid = createClass();
		
		this.asteroid = new Asteroid({
    		endpoint: "ws://local.bcksp.es/websocket"
		});

		this.subscribtionAddressList = [
			"archive.private.count",
			"settings.private.blacklist"
		];
		
		this.subscribtionList = [];

		this.asteroid.on("connected", () =>{
			console.log("connected");
		});

		this.asteroid.on("disconnected", () =>{
			console.log("disconnected");
			this.stopSubsribtion();
			Utilities.setIcon("logout");

		});
		
		this.asteroid.on("loggedIn", data =>{
			console.log("loggedIn", data);
			this.on("changed", {
				counts : ({count}) => Utilities.setBadgeText(count)
			});
			this.on("added", {
				counts : ({count}) => Utilities.setBadgeText(count) ,
				blacklist : blacklist => {
					_.each(blacklist, Utilities.addToBlackList)
				}
			});	
			this.startSubsribtion();
			Utilities.setIcon("standby");

		});
		
		this.asteroid.on("loggedOut", () =>{
			console.log("loggedOut");
			this.stopSubsribtion();
			localStorage.clear();
			Utilities.setIcon("logout");
		});
	}
	logout(cb){
		this.asteroid.logout().then(result => {
			cb(null, result);
		}).catch(error => {
			cb(error, null);
		});
	}
	login(data, cb){
		console.log("AsteroidHelper.login : need to test data")
		this.asteroid.loginWithPassword({
			email : data.email,
			password : data.pwd
		}).then(data => {
			cb(null, data);
		}).catch(error => {
			cb(error, null);
		});
	}
	stopSubsribtion(){
		console.log("stopSubsribtion");
		this.subscribtionList.map(subscribtion => {
			this.asteroid.unsubscribe(subscribtion.id);
			this.asteroid.subscriptions.cache.del(subscribtion.id);
		});
		this.subscribtionList = [];
		chrome.browserAction.setBadgeText({ text : "" });	
	}
	startSubsribtion (){
		this.subscribtionList = this.subscribtionAddressList.map(address =>{
			console.log("subscribtion to : " + address);
			let sub = this.asteroid.subscribe(address);
			sub.on("ready", () => {
				console.log(address + " : ready");
			});
			return sub;
		});
	}
	send(){
		Utilities.setIcon("sending");
		this.asteroid.call("Archives.methods.add", {
			text: Utilities.getArchiveBuffer().split("").reverse().join("")
		}).then(res => {
			Utilities.setIcon("standby");
			console.log(res);
			Utilities.clearArchiveBuffer();
		}).catch(error => {
			Utilities.setIcon("logout");
			console.log(error);
		});
	}
	blacklist(add, url){
		let action = add ? "Settings.Blacklist.Add" : "Settings.Blacklist.Remove";
		this.asteroid.call(action, {
			url : url
		}).catch(error => {
			Utilities.setIcon("logout");
			console.log(error);
		});
		if(add) Utilities.addToBlackList(url);
		else Utilities.removeToBlackList(url);
	}
	on(eventName, options){
		this.asteroid.ddp.on(eventName, ({collection, id, fields}) => {
			console.log("ON : " + collection, id, fields);
			if (_.isFunction(options[collection])) options[collection](fields);
		});
	}
	call(methodName, ...params){
		let cb = params.pop();
		this.asteroid.apply(methodName, params)
		.then(data => {
			cb(null, data);
		}).catch(error => {
			cb(error, null);
		});
	}
}

export default new AsteroidHelper();