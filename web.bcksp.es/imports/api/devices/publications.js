/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-09 16:23:58
  @Last Modified time: 2020-01-26 22:41:30
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { config } from './../../startup/config.js';
if(Meteor.isServer){
	Meteor.publish("devices.config", function(){
		this.added('deviceConfig', +new Date(), config.devices.config );
		this.ready();
		this.onStop(() => { } );
	});

	Meteor.publish("devices.i18n", function(){
		const update = newLocale => {
			console.log("newLocale : ", newLocale );
			this.changed('deviceI18n', 0, {
				extension : i18n.getTranslations("extension", newLocale) ,
				errors : i18n.getTranslations("errors", newLocale),
				userprofile : i18n.getTranslations("userprofile", newLocale),
				forms : i18n.getTranslations("forms", newLocale),
			});
		};

		let id = 0;
		this.added('deviceI18n', 0, {
			extension : i18n.getTranslations("extension", i18n.getLocale()) ,
			errors : i18n.getTranslations("errors", i18n.getLocale()),
			userprofile : i18n.getTranslations("userprofile", i18n.getLocale()),
			forms : i18n.getTranslations("forms", i18n.getLocale()),
		});
		i18n.onChangeLocale(update);
		this.ready();
		this.onStop(() => i18n.offChangeLocale(update));
	});
}