/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2018-11-12 15:06:48
\*----------------------------------------*/
import {createClass} from "asteroid";
import Utilities from '../shared/utilities.js';
import { config } from './../shared/config.js';

import Data from "./../shared/Data.js";
import _ from 'underscore';

class AsteroidHelper{
	constructor(){
		const Asteroid = createClass();
		
		this.asteroid = new Asteroid({
    		endpoint: config.bcksp_ws
		});

		this.subscribtionAddressList = [
			"archive.private.count",
			"settings.private.blacklist"
		];
		
		this.subscribtionList = [];

		this.asteroid.on("connected", () =>{
			Utilities.info("connected");
			Data.setState({
				connected : true
			});
		});


		this.asteroid.on("disconnected", () =>{
			Utilities.info("disconnected");
			Data.setState({
				connected : false
			});
			this.stopSubsribtion();
			Utilities.setIcon("logout");
		});

		this.asteroid.on("loggedIn", data =>{
			this.asteroid.call("Users.methods.login.token")
			.then(res=>{
				Utilities.openHiddenTab(config.bcksp_url+"/login/"+res.data)
					.then(tab => chrome.tabs.remove(tab.id))
					.catch(error => console.warn(error));
			}).catch(error=>{
				console.warn("no way to auto connect to the website");
				console.console(error)
			});

			this.on("changed", {
				counts : ({count}) => {
					Data.setState({
						archiveSize : count
					});
				},
				blacklist : settings => {
					Utilities.log("changed", settings);
					if(!_.isEmpty(settings.blindfield)){
						Utilities.setBlindfield(settings.blindfield)
						.then(blindfield =>{
							Utilities.sendMessageToAllTab("blindfield", blindfield);
						})
						.catch(error => Utilities.error(error));
					}
					if(!_.isEmpty(settings.blacklist)){
						Utilities.setBlackList(settings.blacklist)
							.then(urls => Utilities.reloadTabs(urls))
							.catch(error => Utilities.error(error));
					}
				}
			});
			this.on("added", {
				counts : ({count}) => {
					Data.setState({
						archiveSize : count
					});
				},
				blacklist : settings => {
					Utilities.log("added", settings);
					if(!_.isEmpty(settings.blindfield)){
						Utilities.setBlindfield(settings.blindfield)
						.then(blindfield =>{
							Utilities.sendMessageToAllTab("blindfield", blindfield);
						})
						.catch(error => Utilities.error(error));
					}
					if(!_.isEmpty(settings.blacklist)){
						Utilities.setBlackList(settings.blacklist)
							.then(urls => Utilities.reloadTabs(urls))
							.catch(error => Utilities.error(error));
					}
				}
			});	
			this.startSubsribtion();
			Utilities.setIcon("standby");
		});
		
		this.asteroid.on("loggedOut", () =>{

			Utilities.openHiddenTab(config.bcksp_url+"/logout")
				.then(tab => chrome.tabs.remove(tab.id))
				.catch(error => console.warn(error));

			/*
			chrome.tabs.create({ url: config.bcksp_url+"/logout" }, tab=>{
				chrome.tabs.onUpdated.addListener((tabId, changeInfo)=>{
					if(tabId == tab.id && changeInfo.status == "complete"){
						setTimeout(()=>chrome.tabs.remove(tabId), 100);
					}
				});
			});
			*/
			this.stopSubsribtion();
			localStorage.clear();
			Data.setState({
				currentURLBlacklisted : false
			});
			Utilities.log("loggedOut");
		});
		this.deferredPromise = undefined;
	}

	stopSubsribtion(){
		Utilities.info("stopSubsribtion");
		this.subscribtionList.map(subscribtion => {
			this.asteroid.unsubscribe(subscribtion.id);
			this.asteroid.subscriptions.cache.del(subscribtion.id);
		});
		this.subscribtionList = [];
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

	on(eventName, options){
		this.asteroid.ddp.on(eventName, ({collection, id, fields}) => {
			Utilities.info("ON : " + collection, id, fields);
			if (_.isFunction(options[collection])) options[collection](fields);
		});
	}

	async logout(){
		if(!Data.state.connected) throw new Error("Server is not accessible");
		return this.asteroid.logout()
	}
 
	async login(data){
		if(!Data.state.connected) throw new Error("Server is not accessible");
		return this.asteroid.loginWithPassword(data)
	}

	async signup(data){
		console.log(data);
		if(!Data.state.connected) throw new Error("Server is not accessible");
		return this.asteroid.createUser(data)
	}

	async deferredArchiveAdd(time){
		let isItTime = await Utilities.procrastinate(time, "deferredArchiveAdd")
			.then(message => true).catch(message => false);
		if(isItTime){
			let archive = Utilities.getArchiveBuffer();
			if(archive.length < 1) {
				return new Error("Archive Add cancelled, casue local archive is empty");
			}
			return this.call("Archives.methods.add", { 
				text: archive.split("").reverse().join("") 
			})
			.then(()=>{
				Utilities.clearArchiveBuffer();
			});
		}
		return;
	}

	async blacklist(add, url){
		let methode = add ? "Settings.Blacklist.Add" : "Settings.Blacklist.Remove";
		return this.call(methode,  { url : url });
	}

	async call(methode, data){
		Utilities.setIcon("sending");
		return this.asteroid.call(methode, data)
			.then(res => {
				Utilities.info(res);
			}).catch(error => {
				Utilities.error(error);
			}).finally(()=>{
				Utilities.setDefaultIcon(this.asteroid.loggedIn);
			});
	}
}

export default new AsteroidHelper();