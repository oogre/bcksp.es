import { extend } from 'underscore';

const conf = {
	pingInterval : 0,
	senderTimeout : 6000,
	standard_url : "*://*.bcksp.es/*",
	protocol : "https://",
	ws_protocol : "wss://",
	address : "bcksp.es",
	home : "/dev",
	about : "/about",
	login : "/login",
	logout : "/logout",
	profile : "/profile",
	websocket : "/websocket",
	user : {
		password : {
			length : {
				min : 6,
				max : 127
			}
		}
	},
	DEV : {
		protocol : "http://",
		ws_protocol : "ws://",
		address : "local.bcksp.es:8888"
	}
};

function isDevMode(){
	return localStorage.getItem("DEV") === "true";
}

export const config = isDevMode() ? extend(conf, conf.DEV) : conf;

config.getLogoutUrl = function(){
	return config.protocol+config.address+config.logout;
};
config.isDevMode = function(){
	return isDevMode();
};
config.getLoginUrl = function(key){
	return config.protocol+config.address+config.login+"/"+key;
};
config.getHomeUrl = function(){
	return config.protocol+config.address+config.home;
};
config.getProfileUrl = function(){
	return config.protocol+config.address+config.profile;
};
config.getAboutUrl = function(){
	return config.protocol+config.address+config.about;
};
config.getWebSocketUrl = function(){
	return config.ws_protocol+config.address+config.websocket;
};