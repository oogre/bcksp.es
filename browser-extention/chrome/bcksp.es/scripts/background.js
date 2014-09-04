(function(){
	"use strict";
	/*global chrome:false */
	/*global _http:false */


	//var home = "http://www.bcksp.es";
	var home = "http://localhost:1337";
	
	var connectTimeout = 6000;
	var senderTimeout = 6000;


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
			clearTimeout(timers.onlinetester);
			timers.onlinetester = undefined;
		},

		offline : function(){
			tools.setIcons("logout");
			clearInterval(timers.onlinetester);
			timers.onlinetester = setInterval( tools.amIonline, connectTimeout);
		},

		icons : {
			standby : "/../icon/19/standby.png",
			sending : "/../icon/19/sending.png",
			logout : "/../icon/19/logout.png",
			backspacing : ["/../icon/19/backspacing_1.png", "/../icon/19/backspacing_0.png", "/../icon/19/backspacing_1.png", "/../icon/19/backspacing_2.png","/../icon/19/backspacing_3.png", "/../icon/19/backspacing_2.png","/../icon/19/backspacing_3.png"]
		},
		setIcons : function(state){
			if(tools.icons[state]){
				if("logout" == state){
					chrome.browserAction.setBadgeText({text : " ! "});
				}else{
					chrome.browserAction.setBadgeText({text : ""});
				}
				if(isArray(tools.icons[state])){
					if(undefined === timers.icons){
						timers.icons = setInterval(function(){
							chrome.browserAction.setIcon({
								path: tools.icons[state][0]
							});
							tools.icons[state].push(tools.icons[state].shift());
						}, 500);
					}
				}else{
					clearInterval(timers.icons);
					timers.icons = undefined;
					chrome.browserAction.setIcon({
						path: tools.icons[state]
					});
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
			localStorage.setItem("backspace", tools.htmlDecode((localStorage.getItem("backspace") || "") + object.char));
			var sender = function(){
				if(localStorage.getItem("backspace")){
					tools.setIcons("sending");
					_http(home+"/backspace/token", {}, "GET")
					.done(function(data){
						if(data.data._csrf){
							_http(home+"/backspace/append", { 
								content : tools.htmlDecode(localStorage.getItem("backspace").split("").reverse().join("")),
								_csrf : data.data._csrf
							}, "POST")
							.done(function(){
								localStorage.clear();
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
			clearTimeout(timers.saveDB);
			timers.saveDB = setTimeout(sender, senderTimeout);
			callback({
				value: object.char
			});
		}
	};

	tools.offline();

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		var action = tools[request.action];
		if(action){
			action(request, function(data){
				sendResponse(data);
			});
		}else{
			window.console.log(request);
		}
		return true;
	});
}());