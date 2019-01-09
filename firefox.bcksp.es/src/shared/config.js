const conf = {
	DEV : {
		// localStorage.setItem("DEV", true)
		senderTimeout : 6000,
		standard_url : "*://*.bcksp.es/*",
		protocol : "http://",
		ws_protocol : "ws://",
		address : "local.bcksp.es:8888",
		home : "/",
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
		}	
	},
	PROD : {
		senderTimeout : 6000,
		standard_url : "*://*.bcksp.es/*",
		protocol : "https://",
		ws_protocol : "wss://",
		address : "bcksp.es",
		home : "/dev",
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
		}
	}
};
function isDevMode(){
	return localStorage.getItem("DEV") === "true";
}
export const config = isDevMode() ? conf.DEV : conf.PROD;
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
config.getWebSocketUrl = function(){
	return config.ws_protocol+config.address+config.websocket;
};