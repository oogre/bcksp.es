/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2018-05-22 20:34:44
\*----------------------------------------*/
import {createClass} from "asteroid";

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
		});

		this.asteroid.on("disconnected", () =>{
			console.log("disconnected");
		});
		
		this.asteroid.on("loggedIn", data =>{
			console.log("loggedIn", data);
		});
		
		this.asteroid.on("loggedOut", () =>{
			console.log("loggedOut");
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
			this.startSubsribtion();
			cb(null, data);
		}).catch(error => {
			cb(error, null);
		});
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