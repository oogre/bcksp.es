
import {createClass} from "asteroid";
localStorage.clear();

const Asteroid = createClass();
// Connect to a Meteor backend
const asteroid = new Asteroid({
    endpoint: "ws://local.bcksp.es/websocket"
});
asteroid.logout().then(result => {
	console.log("LOGOUT");
}).catch(error => {
	console.error("LOGOUT FAIL");
});

chrome.runtime.onMessage.addListener( (request,sender,sendResponse)=>{
    if( request.action === "login" ){
        asteroid.loginWithPassword({
			email : request.data.email,
			password : request.data.pwd
		}).then(data => {
			let sub = asteroid.subscribe("archive.private.count");
			asteroid.ddp.on("changed", ({collection, id, fields}) => {
				let badgeText = fields.count;
				if(badgeText > 999999){
					badgeText = (badgeText / 1000000).toFixed(1);
					if(badgeText.length > 3){
						badgeText = badgeText.substr(0, badgeText.indexOf("."));
					}
					badgeText += "M";
				}
				if(badgeText > 999){
					badgeText = (badgeText / 1000).toFixed(1);
					if(badgeText.length > 3){
						badgeText = badgeText.substr(0, badgeText.indexOf("."));
					}
					badgeText += "k";
				}
			    chrome.browserAction.setBadgeText({
			    	text : ""+badgeText
			    });
			});
			sub.on("ready", () => {
				console.log("ready");
			});
			sendResponse({
				result : "success",
				data
			});

		}).catch(error => {
			sendResponse({
				result : "fail",
				error
			});
		});
    }else if(request.action === "archive"){
    	asteroid.call("Archives.methods.add", {
			text : request.data.text
		}).then(result => {
		    console.log("Success");
		    console.log(result);
		}).catch(error => {
		    console.log("Error");
		    console.error(error);
		});
    }
});