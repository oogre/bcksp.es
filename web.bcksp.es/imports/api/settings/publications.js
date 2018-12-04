/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:11:04
  @Last Modified time: 2018-11-26 08:23:07
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Settings } from './settings.js';
import { config } from './../../startup/config.js';

if(Meteor.isServer){
	Meteor.publish("settings.private", function settingsPublication(){
		return Settings.find({
			owner : Meteor.userId()
		});
	});
	Meteor.publish("settings.private", function(){
		Utilities.checkUserLoggedIn();
		return Settings.find({ 
				owner : Meteor.userId() 
			}, {
				fields : {
					blacklist : 1,
					blindfield : 1
				}
			});
	});
}
