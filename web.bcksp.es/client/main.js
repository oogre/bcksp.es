import { Meteor } from 'meteor/meteor';
//import '../imports/startup/account-config.js';

import './router.js'; 

Session.set("extensionInstalled", false);
new MutationObserver(eventArray=>{
	eventArray.map(event=>{
		console.log(event);
		if(event.type == "attributes" && !_.isUndefined($(document.documentElement).attr("bcksp-es-extension-installed"))){
			console.log(!_.isUndefined($(document.documentElement).attr("bcksp-es-extension-installed")));
			Session.set("extensionInstalled", true);
		}
	})
}).observe( document.documentElement, { 
	attributes: true 
});