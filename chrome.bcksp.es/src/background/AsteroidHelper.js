/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2020-01-09 20:33:30
\*----------------------------------------*/
import { createClass } from "asteroid";
import { onLogin } from "asteroid/lib/common/login-method";
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

		this.subscribtionList = [];
		this.subscribtionAddressList = [
			"devices.config",
			"archive.config",
			"settings.private",
			"archive.private.counter"
		];		
		
		this.asteroid.on("connected", () => Data.setState({ connected : true }));
		this.asteroid.on("disconnected", () => Data.setState({ connected : false }));
		this.asteroid.on("loggedOut", () => {
			Data.setState({
				loggedStatus : false,
				currentURLBlacklisted : false
			});
			this.stopSubsribtion();
		});
		this.asteroid.on("loggedIn", data => {
			Data.setState({ "loggedStatus": true });
			this.startSubsribtion();
		});
	}

	stopSubsribtion(){
		this.subscribtionList.map(subscribtion => {
			this.asteroid.unsubscribe(subscribtion.id);
			this.asteroid.subscriptions.cache.del(subscribtion.id);
			info("Subsribtion : " + subscribtion.name + " is closed")
		});
		this.subscribtionList = [];
	}

	startSubsribtion (){
		this.subscribtionList = this.subscribtionAddressList.map(address => {
			let sub = this.asteroid.subscribe(address);
			sub.on("ready", () => info("Subsribtion : " + address + " is ready"));
			return sub;
		});
		this.on("changed", {
			deviceConfig : conf => Data.setState({ pingInterval : conf.pingInterval }),
			config : ({maxCharPerBook}) => Data.setState({ maxCharPerBook : maxCharPerBook }),
			archives : ({count}) => Data.setState({ archiveSize : count }),
			settings : settings => {
				if(isObject(settings.blindfield)){
					Data.setState({ blindfields : settings.blindfield });
				}
				if(isArray(settings.blacklist)){
					Data.setState({ blacklist : settings.blacklist });
				}
			}
		});
		this.on("added", {
			deviceConfig : conf => Data.setState({ pingInterval : conf.pingInterval }),
			config : ({maxCharPerBook}) => Data.setState({maxCharPerBook : maxCharPerBook}),
			archives : ({count}) => Data.setState({archiveSize : count}),
			settings : settings => {
				if(isObject(settings.blindfield)){
					Data.setState({ blindfields : settings.blindfield });
				}
				if(isArray(settings.blacklist)){
					Data.setState({ blacklist : settings.blacklist });
				}
			}
		});
	}

	on(eventName, options){
		this.asteroid.ddp.on(eventName, ({collection, id, fields}) => {
			if (isFunction(options[collection])) options[collection](fields);
		});
	}

	async createUser(data){
		data.device =  runtimeId();
		return this.asteroid.createUser(data);
	}
	
	async loginWithPassword(data){
		data.device =  runtimeId();
		return this.asteroid.loginWithPassword(data);		
	}

	async call(methode, data={}){
		setIcon("sending");
		data.device =  runtimeId();
		return this.asteroid.call(methode, data)
			.then(res => {
				return res;
			})
			.catch(error => {
				error(error);
				throw error;
			}).finally(() => {
				setDefaultIcon(this.asteroid.loggedIn);
			});
	}
}

export default new AsteroidHelper();