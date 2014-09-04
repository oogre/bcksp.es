
var home = "http://www.bcksp.es"; // "http://localhost:1337";
var connectTimeout = 6000;
var senderTimeout = 6000;


var self = require("sdk/self");
var tmr = require('sdk/timers');


var _http = require('./xhrwrapper').xhrwrapper;
var Encoder = require('./Encoder').Encoder();
var ss = require("sdk/simple-storage");

ss.storage.backspace = ss.storage.backspace || "";

var isArray = function(object){
	return Object.prototype.toString.call( object ) === "[object Array]";
};
var timers = {};

var tools = {
	amIonline : function(){
		_http(home+"/user/online", {}, "GET")
		.done(function(){
			tools.online();
		})
		.fail(function(){
			tools.setIcons("logout");
		});
	},
	online : function(){
		tools.setIcons("standby");
		tmr.clearTimeout(timers.onlinetester);
		timers.onlinetester = undefined;
	},

	offline : function(){
		tools.setIcons("logout");
		tmr.clearInterval(timers.onlinetester);
		timers.onlinetester = tmr.setInterval( tools.amIonline, connectTimeout);
	},

	icons : {
		standby : "./icon/19/standby.png",
		sending : "./icon/19/sending.png",
		logout : "./icon/19/logout.png",
		backspacing : ["./icon/19/backspacing_1.png", "./icon/19/backspacing_0.png", "./icon/19/backspacing_1.png", "./icon/19/backspacing_2.png","./icon/19/backspacing_3.png", "./icon/19/backspacing_2.png","./icon/19/backspacing_3.png"]
	},
	setIcons : function(state){
		if(tools.icons[state]){
			if("logout" == state){
				//chrome.browserAction.setBadgeText({text : " ! "});
			}else{
				//chrome.browserAction.setBadgeText({text : ""});
			}
			if(isArray(tools.icons[state])){
				if(undefined === timers.icons){
					timers.icons = tmr.setInterval(function(){
						icon.icon = {
							"16": tools.icons[state][0],
							"32": tools.icons[state][0],
							"64": tools.icons[state][0]
						}
						tools.icons[state].push(tools.icons[state].shift());
					}, 500);
				}
			}else{
				tmr.clearInterval(timers.icons);
				timers.icons = undefined;
				icon.icon = {
					"16": tools.icons[state],
					"32": tools.icons[state],
					"64": tools.icons[state]
				}
			}
		}
	},
	backspacing : function(){
		tools.setIcons("backspacing");
	},
	htmlDecode : function(value){
		var marker = "-";
		return Encoder.htmlDecode(marker+""+value).substr(marker.length);
	},
	send : function(object, callback){
		ss.storage.backspace = tools.htmlDecode((ss.storage.backspace || "") + object.char);
		var sender = function(){
			if(ss.storage.backspace){
				tools.setIcons("sending");
				_http(home+"/backspace/token", {}, "GET")
				.done(function(data){
					if(data.data._csrf){
						_http(home+"/backspace/append", { 
							content : tools.htmlDecode(ss.storage.backspace.split("").reverse().join("")),
							_csrf : data.data._csrf
						}, "POST")
						.done(function(){
							ss.storage.backspace = "";
							tools.setIcons("standby");
						})
						.fail(function(){
							tools.setIcons("logout");
							tools.offline();
						});
					}else{
						tools.setIcons("logout");
					}
				})
				.fail(function(){
					tools.setIcons("logout");
					tools.offline();
				});
			}
		};
		tmr.clearTimeout(timers.saveDB);
		timers.saveDB = tmr.setTimeout(sender, senderTimeout);
		
		if(typeof(callback) == "function"){
			callback({
				value: object.char
			});
		}
	}
};


/* ICON */
var icon = require('sdk/ui/button/action').ActionButton({
	id: "bcksp-es",
	label: "Visit bcksp.es",
	icon : {
		"16": "./backspacing_0.png",
		"32": "./backspacing_0.png",
		"64": "./backspacing_0.png"
	},
  	onClick: function handleClick(state) {
		require("sdk/tabs").open("http://www.bcksp.es/");
		
	}
});


/* INJECT backspacelistener AND DEPENDENCIES */
require("sdk/page-mod").PageMod({
	include: "*",
	contentScriptFile: [	self.data.url("jquery-1.11.1.min.js"), 
							self.data.url("diff_match_patch.js"),
							self.data.url("stringStream.js"),
							self.data.url("backspacelistener.js") ],
	onAttach: function(worker) {
    	worker.port
    	.on("backspacing", function() {
			tools.setIcons("backspacing")
		})
		.on("send", function(message) {
			tools.send(message);
		});
  	}
});

tools.offline();