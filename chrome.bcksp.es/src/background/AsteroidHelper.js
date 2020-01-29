/*----------------------------------------*\
  bcksp.es - asteroidHelper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:50:28
  @Last Modified time: 2020-01-29 11:57:07
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
			"archive.private.counter",
			"settings.private",
			"devices.i18n.logged"
		];

		this.subscribtionListNoLogged = [];
		this.subscribtionAddressListNoLogged = [
			"devices.i18n"
		];		
		
		this.asteroid.on("connected", () => {
			Data.setState({ connected : true })
			this.startSubsribtionNoLogged();
		});
		this.asteroid.on("disconnected", () => Data.setState({ connected : false }));
		this.asteroid.on("loggedOut", () => {
			Data.setState({
				loggedStatus : false,
				currentURLBlacklisted : false
			});
			this.stopSubsribtion();
			this.startSubsribtionNoLogged();
		});

		this.asteroid.on("loggedIn", data => {
			Data.setState({ "loggedStatus": true });
			this.stopSubsribtionNoLogged();
			this.startSubsribtion();
		});

		this.on("changed", {
			deviceI18n : i18n => localStorage.setItem("translation", JSON.stringify(i18n)),
			config : ({maxCharPerBook, pingInterval}) => {
				Data.setState({ maxCharPerBook : maxCharPerBook })
				Data.setState({ pingInterval : pingInterval })
			},
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
			deviceI18n : i18n => localStorage.setItem("translation", JSON.stringify(i18n)),
			config : ({maxCharPerBook, pingInterval}) => {
				Data.setState({ maxCharPerBook : maxCharPerBook })
				Data.setState({ pingInterval : pingInterval })
			},
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
	}

	stopSubsribtionNoLogged(){
		this.subscribtionListNoLogged.map(subscribtion => {
			this.asteroid.unsubscribe(subscribtion.id);
			this.asteroid.subscriptions.cache.del(subscribtion.id);
			info("Subsribtion : " + subscribtion.name + " is closed")
		});
		this.subscribtionListNoLogged = [];
	}
	startSubsribtionNoLogged(){
		this.subscribtionListNoLogged = this.subscribtionAddressListNoLogged.map(address => {
			let sub = this.asteroid.subscribe(address);
			sub.on("ready", () => info("Subsribtion : " + address + " is ready"));
			return sub;
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