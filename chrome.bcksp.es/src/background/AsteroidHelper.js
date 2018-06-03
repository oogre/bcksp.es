/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2018-06-02 17:57:37
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
			Utilities.log("loggedIn", data);
			this.on("changed", {
				counts : ({count}) => Utilities.setBadgeText(count),
				blacklist : settings => {
					Utilities.log("changed", settings);
					Utilities.setBlackList(settings.blacklist)
						.then(urls => Utilities.reloadTabs(urls))
						.catch(error => Utilities.error(error));
				}
			});
			this.on("added", {
				counts : ({count}) => Utilities.setBadgeText(count) ,
				blacklist : settings => {
					Utilities.log("added", settings);
					Utilities.setBlackList(settings.blacklist)
						.then(urls => Utilities.reloadTabs(urls))
						.catch(error => Utilities.error(error));
				}
			});	
			this.startSubsribtion();
			Utilities.setIcon("standby");
		});
		
		this.asteroid.on("loggedOut", () =>{
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

	async login({email, pwd}){
		if(!Data.state.connected) throw new Error("Server is not accessible");
		let data = await Utilities.isEmail(email);
		data = await Utilities.isPwd(pwd, data);
		return this.asteroid.loginWithPassword({ email : data.email, password : data.pwd })
	}

	async deferredArchiveAdd(time){
		let isItTime = await Utilities.procrastinate(time, "deferredArchiveAdd")
			.then(message => true).catch(message => false);
		if(isItTime){
			let archive = Utilities.getArchiveBuffer();
			if(archive.length < 1) {
				return new Error("Archive Add cancelled, casue local archive is empty");
			}
			return this.call("Archives.methods.add", { text: archive.split("").reverse().join("") });
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