import { extend } from 'underscore';

const conf = {
	languages : {
		available : ["fr"]
	},
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
	translation : "/universe/locale/",//fr-FR
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
		address : "local.bcksp.es:8888",
		home : "/"
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

function getLang () {
    let userLang = (navigator.languages && navigator.languages[0] ||
					navigator.language ||
					navigator.browserLanguage ||
					navigator.userLanguage ||
					'fr');
	userLang = userLang.toLowerCase().replace('_', '-').split("-").shift();
	return config.languages.available.includes(userLang) ? userLang : config.languages.available[0];
}

config.getTranslationUrl = function(){
	return config.protocol+config.address+config.translation+getLang()+"?ts="+Math.floor(Math.random()*100);
};

