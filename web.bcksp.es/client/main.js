import { Meteor } from 'meteor/meteor';
//import '../imports/startup/account-config.js';
import * as Utilities from './../imports/utilities.js';
import './router.js'; 

Session.set("extensionInstalled", Utilities.isExtensionInstalled());

Meteor.startup(()=>{	
	new MutationObserver(eventArray=>{
		eventArray.map(event=>{
			if(event.type == "attributes"){
				Session.set("extensionInstalled", Utilities.isExtensionInstalled());
			}
		})
	}).observe( document.documentElement, { 
		attributes: true 
	});

});