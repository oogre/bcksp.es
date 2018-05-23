/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2018-05-23 18:35:24
\*----------------------------------------*/
import {createClass} from "asteroid";
import * as Utilities from '../shared/utilities.js';

class AsteroidHelper{
	constructor(){
		const Asteroid = createClass();
		
		this.asteroid = new Asteroid({
    		endpoint: "ws://local.bcksp.es/websocket"
		});

		this.subscribtionAddressList = [
			"archive.private.count"
		];
		
		this.subscribtionList = [];

		this.asteroid.on("connected", () =>{
			console.log("connected");
			this.startSubsribtion();
		});

		this.asteroid.on("disconnected", () =>{
			console.log("disconnected");
			this.stopSubsribtion();
			Utilities.setIcon("logout");

		});
		
		this.asteroid.on("loggedIn", data =>{
			console.log("loggedIn", data);
			this.startSubsribtion();
			Utilities.setIcon("standby");
		});
		
		this.asteroid.on("loggedOut", () =>{
			console.log("loggedOut");
			this.stopSubsribtion();
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
			this.asteroid.unsubscribe(subscribtion);
		});
		this.subscribtionList = [];
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
	on(eventName, cb){
		this.asteroid.ddp.on(eventName, ({collection, id, fields}) => {
			console.log("ON : " + collection, id, fields);
			cb(fields.count);
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