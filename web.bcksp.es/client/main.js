
import './router.js';
import './../imports/i18n/index.js';
import { Meteor } from 'meteor/meteor';
import '../imports/startup/account-config.js';
import { isExtensionInstalled } from './../imports/utilities/ui.js';

Session.set("extensionInstalled", isExtensionInstalled());



Meteor.startup(()=>{
	new MutationObserver(eventArray=>{
		eventArray.map(event=>{
			if(event.type == "attributes"){
				Session.set("extensionInstalled", isExtensionInstalled());
			}
		})
	}).observe( document.documentElement, {
		attributes: true
	});
	/*
	i18n.setLocale(config.languages.get());
	var htmlElement = document.querySelector("html");
	htmlElement.setAttribute("lang", config.languages.get());
	*/
});