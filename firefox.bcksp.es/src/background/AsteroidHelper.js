/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2018-05-29 00:13:02
\*----------------------------------------*/
import {createClass} from "asteroid";
import Utilities from '../shared/utilities.js';
import Data from "./../shared/Data.js";
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
			Utilities.info("connected");
		});

		this.asteroid.on("disconnected", () =>{
			Utilities.info("disconnected");
			this.stopSubsribtion();
			Utilities.setIcon("logout");

		});
		

		this.asteroid.on("loggedIn", data =>{
			Utilities.log("loggedIn", data);
			this.on("changed", {
				counts : ({count}) => Utilities.setBadgeText(count),
				blacklist : settings => {
					Utilities.log("changed", settings);
					Utilities.setBlackList(settings.blacklist);
				}
			});
			this.on("added", {
				counts : ({count}) => Utilities.setBadgeText(count) ,
				blacklist : settings => {
					Utilities.log("added", settings);
					Utilities.setBlackList(settings.blacklist);
				}
			});	
			this.startSubsribtion();
			Utilities.setIcon("standby");

		});
		
		this.asteroid.on("loggedOut", () =>{
			this.stopSubsribtion();
			localStorage.clear();
			Data.currentURLBlacklisted = false;
			Utilities.log("loggedOut");
			Utilities.setIcon("logout");
		});
	}

	logout(cb){
		this.asteroid.logout().then(result => {
			cb(null, result);
		}).catch(error => {
			Utilities.error(error);
			cb(error, null);
		});
	}

	login(data, cb){
		Utilities.log("AsteroidHelper.login : need to test data")
		this.asteroid.loginWithPassword({
			email : data.email,
			password : data.pwd
		}).then(data => {
			cb(null, data);
		}).catch(error => {
			Utilities.error(error);
			cb(error, null);
		});
	}

	stopSubsribtion(){
		Utilities.info("stopSubsribtion");
		this.subscribtionList.map(subscribtion => {
			this.asteroid.unsubscribe(subscribtion.id);
			this.asteroid.subscriptions.cache.del(subscribtion.id);
		});
		this.subscribtionList = [];
		Utilities.setBadgeText(false);
	}

	startSubsribtion (){
		this.subscribtionList = this.subscribtionAddressList.map(address =>{
			Utilities.info("subscribtion to : " + address);
			let sub = this.asteroid.subscribe(address);
			sub.on("ready", () => {
				Utilities.info(address + " : ready");
			});
			return sub;
		});
	}

	send(){
		let archive = Utilities.getArchiveBuffer();
		if(archive.length < 1) return Utilities.setDefaultIcon(this.asteroid.loggedIn);
		Utilities.setIcon("sending");
		this.asteroid.call("Archives.methods.add", {
			text: archive.split("").reverse().join("")
		}).then(res => {
			Utilities.setIcon("standby");
			Utilities.info(res);
			Utilities.clearArchiveBuffer();
		}).catch(error => {
			Utilities.setIcon("logout");
			Utilities.error(error);
		});
	}

	blacklist(add, url){
		let action = add ? "Settings.Blacklist.Add" : "Settings.Blacklist.Remove";
		Utilities.setIcon("sending");
		this.asteroid.call(action, {
			url : url
		}).then(res => {
			Utilities.setIcon("standby");
			Utilities.info(res);
		}).catch(error => {
			Utilities.setIcon("logout");
			Utilities.error(error);
		});
	}

	on(eventName, options){
		this.asteroid.ddp.on(eventName, ({collection, id, fields}) => {
			Utilities.info("ON : " + collection, id, fields);
			if (_.isFunction(options[collection])) options[collection](fields);
		});
	}
}

export default new AsteroidHelper();