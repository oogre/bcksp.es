/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2019-01-09 17:56:55
\*----------------------------------------*/
import { createClass } from "asteroid";
import Data from "./../utilities/Data.js";
import { config } from './../shared/config.js';
import { runtimeId } from './../utilities/browser.js';
import { log, info, error } from './../utilities/log.js';
import { setIcon, setDefaultIcon } from './../utilities/icon.js';
import { isObject, isArray, isFunction } from './../utilities/validation.js';

class AsteroidHelper{
	constructor(){
		const Asteroid = createClass();
		this.asteroid = new Asteroid({
    		endpoint: config.getWebSocketUrl()
		});

		this.subscribtionAddressList = [
			"archive.private.counter",
			"settings.private"
		];
		
		this.subscribtionList = [];

		this.asteroid.on("connected", () =>{
			log("connected");
			Data.setState({
				connected : true,
			});
		});

		this.asteroid.on("disconnected", () =>{
			log("disconnected");
			Data.setState({
				connected : false,
			});
		});

		this.asteroid.on("loggedOut", () =>{
			log("loggedOut");
			Data.setState({
				loggedStatus : false,
				currentURLBlacklisted : false
			});
			this.stopSubsribtion();
		});

		this.asteroid.on("loggedIn", data =>{
			log("loggedIn");
			Data.setState({
				"loggedStatus": true
			});
			this.startSubsribtion();
		});
	}

	stopSubsribtion(){
		info("stopSubsribtion");
		this.subscribtionList.map(subscribtion => {
			this.asteroid.unsubscribe(subscribtion.id);
			this.asteroid.subscriptions.cache.del(subscribtion.id);
		});
		this.subscribtionList = [];
	}

	startSubsribtion (){
		this.subscribtionList = this.subscribtionAddressList.map(address =>{
			info("subscribtion to : " + address);
			let sub = this.asteroid.subscribe(address);
			sub.on("ready", () => {
				info(address + " : ready");
			});
			return sub;
		});
		//if(Data.state.init)return;
		//Data.setState({
		//	"init": true
		//});
		this.on("changed", {
			archives : ({count}) => {
				Data.setState({
					archiveSize : count
				});
			},
			settings : settings=>{
				if(isObject(settings.blindfield)){
					Data.setState({
						blindfields : settings.blindfield
					});
				}
				if(isArray(settings.blacklist)){
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
				if(isObject(settings.blindfield)){
					Data.setState({blindfields : settings.blindfield});
				}
				if(isArray(settings.blacklist)){
					Data.setState({blacklist : settings.blacklist});
				}
			}
		});
	}

	on(eventName, options){
		this.asteroid.ddp.on(eventName, ({collection, id, fields}) => {
			if (isFunction(options[collection])) options[collection](fields);
		});
	}

	async call(methode, data={}){
		setIcon("sending");
		data.device =  runtimeId();
		return this.asteroid.call(methode, data)
			.then(res => {
				//info(res);
				return res;
			}).catch(error => {
				error(error);
				throw error;
			}).finally(()=>{
				setDefaultIcon(this.asteroid.loggedIn);
			});
	}
}

export default new AsteroidHelper();