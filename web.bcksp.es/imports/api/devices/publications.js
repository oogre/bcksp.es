/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-09 16:23:58
  @Last Modified time: 2020-01-29 19:10:47
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { config } from './../../startup/config.js';
import { checkUserLoggedIn } from './../../utilities/validation.js';

if(Meteor.isServer){
	Meteor.publish("devices.config", function(){
		this.added('config', +new Date(), {
			pingInterval : config.devices.pingInterval,
			maxCharPerBook : config.book.getMaxChar()
		});
		this.ready();
		this.onStop(() => { } );
	});


	Meteor.publish("devices.i18n", function(){
		this.added('deviceI18n', 0, {
			extension : i18n.getTranslations("extension", i18n.getLocale()) ,
			errors : i18n.getTranslations("errors", i18n.getLocale()),
			userprofile : i18n.getTranslations("userprofile", i18n.getLocale()),
			forms : i18n.getTranslations("forms", i18n.getLocale()),
		});
		this.ready();
		this.onStop(() => {});
	});


	Meteor.publish("devices.i18n.logged", function(){
		checkUserLoggedIn();
		let self = this;
		let handle = Meteor.users.find({ _id : this.userId }).observeChanges({
			added(id, user){
				self.added('deviceI18n', 0, {
					extension : i18n.getTranslations("extension", user.lang || "fr") ,
					errors : i18n.getTranslations("errors", user.lang || "fr"),
					userprofile : i18n.getTranslations("userprofile", user.lang || "fr"),
					forms : i18n.getTranslations("forms", user.lang || "fr"),
				});	
				self.ready();
			},
			changed(id, user){
				if(user.lang){
					self.changed('deviceI18n', 0, {
						extension : i18n.getTranslations("extension", user.lang) ,
						errors : i18n.getTranslations("errors", user.lang),
						userprofile : i18n.getTranslations("userprofile", user.lang),
						forms : i18n.getTranslations("forms", user.lang),
					});		
				}
			}
		});
		this.onStop(() => handle && handle.stop() );
	});
}