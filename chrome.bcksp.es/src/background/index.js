import AsteroidHelper from "./AsteroidHelper.js";
import * as Utilities from '../shared/utilities.js';
import Data from "./../shared/Data.js";
import _ from 'underscore'

let senderTimeout = 6000;

/*
let icon = ["standby","sending","logout","backspacing"];
setInterval(()=>{
	Utilities.setIcon(_.sample(icon));
}, 6000);

*/

function ArchivesMethodsAdd(){
	clearTimeout(Data.timers.saveDB);
	Data.timers.saveDB = setTimeout(()=>{
		Utilities.setIcon("sending");
		AsteroidHelper.call("Archives.methods.add", {
			text: Utilities.getArchiveBuffer().split("").reverse().join("")
		}, (err, res)=>{
			if(err) {
				Utilities.setIcon("logout");
				return console.log(err);
			}
			Utilities.setIcon("standby");
			console.log(res);
			Utilities.clearArchiveBuffer();
		});
	}, senderTimeout);
}

chrome.runtime.onMessage.addListener( (request,sender,sendResponse)=>{
    if( request.action === "login" ){
    	AsteroidHelper.login(request.data,(err, res)=>{
			if(err) {
				return sendResponse({
					result : "fail",
					error : err
				});
			}
			
			AsteroidHelper.on("changed", archiveSize =>{
				chrome.browserAction.setBadgeText({ text : Utilities.prefixFormat(archiveSize) });	
			});

			return sendResponse({
				result : "success",
				data : res
			});
		});
    }else if(request.action === "archive"){
    	Utilities.addToArchiveBuffer(request.data);
		ArchivesMethodsAdd();
    }else if(request.action === "backspacing"){
		Utilities.setIcon("backspacing");
    	ArchivesMethodsAdd();
    }else if(request.action === "backspaceup"){
    	ArchivesMethodsAdd();
    }else if(request.action === "logout"){
    	AsteroidHelper.logout((err, res)=>{
			if(err) return console.error("LOGOUT FAIL");
			return console.error("LOGOUT");
		});
    }
});