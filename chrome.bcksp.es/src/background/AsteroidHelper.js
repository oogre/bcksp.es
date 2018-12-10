/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2018-12-10 12:45:56
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
			"archive.private.counter",
			"settings.private"
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

		this.asteroid.on("loggedOut", () =>{
			Utilities.tabHandler()
			.then(tab=>Utilities.tabsUpdate({url: config.bcksp_url+"logout"}))
			.catch(()=>Utilities.tabsCreate({url: config.bcksp_url+"logout"}));
			this.stopSubsribtion();
			localStorage.clear();
			Data.setState({
				currentURLBlacklisted : false
			});
			Utilities.log("loggedOut");
		});

		this.asteroid.on("loggedIn", data =>{
			this.asteroid.call("Users.methods.login.token", {device : Utilities.runtimeId()})
			.then(res=>{
				Utilities.tabHandler()
				.then(tab=>Utilities.tabsUpdate({url: config.bcksp_url+"login/"+res.data}))
				.catch(()=>Utilities.tabsCreate({url: config.bcksp_url+"login/"+res.data}));
			}).catch(error=>{
				Utilities.warn("no way to auto connect to the website");
			});

			this.on("changed", {
				archives : ({count}) => {
					Data.setState({
						archiveSize : count
					});
				},
				settings : settings=>{
					if(_.isObject(settings.blindfield)){
						Data.setState({
							blindfields : settings.blindfield
						});
					}
					if(_.isArray(settings.blacklist)){
						Data.setState({
							blacklist : settings.blacklist
						});
					}
				}
			});
			this.on("added", {
				archives : ({count}) => {
					Data.setState({archiveSize : count});
				},
				settings : settings=>{
					if(_.isObject(settings.blindfield)){
						Data.setState({blindfields : settings.blindfield});
					}
					if(_.isArray(settings.blacklist)){
						Data.setState({blacklist : settings.blacklist});
					}
				}
			});	
			this.startSubsribtion();
			Utilities.setIcon("standby");
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
		if(!Data.state.connected) throw new Error("Server is not accessible");
		return this.asteroid.createUser(data)
	}

	async blacklist(add, url){
		let methode = add ? "Settings.Blacklist.Add" : "Settings.Blacklist.Remove";
		return this.call(methode,  { url : url });
	}

	async call(methode, data){
		Utilities.setIcon("sending");
		return this.asteroid.call(methode, data)
			.then(res => {
				//Utilities.info(res);
			}).catch(error => {
				Utilities.error(error);
			}).finally(()=>{
				Utilities.setDefaultIcon(this.asteroid.loggedIn);
			});
	}
}

export default new AsteroidHelper();