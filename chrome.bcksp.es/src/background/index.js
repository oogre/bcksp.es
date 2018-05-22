import AsteroidHelper from "./AsteroidHelper.js";
import * as Utilities from '../shared/utilities.js';

let timers = {};
let senderTimeout = 6000;

function ArchivesMethodsAdd(){
	clearTimeout(timers.saveDB);
	timers.saveDB = setTimeout(()=>{
		AsteroidHelper.call("Archives.methods.add", {
			text: Utilities.getArchiveBuffer().split("").reverse().join("")
		}, (err, res)=>{
			if(err) return console.log(err);
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