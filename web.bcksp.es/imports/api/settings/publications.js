/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:11:04
  @Last Modified time: 2018-12-07 08:56:18
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Settings } from './settings.js';
import { config } from './../../startup/config.js';
import * as Utilities from './../../utilities.js';

if(Meteor.isServer){
	Meteor.publish("settings.private", function(){
		Utilities.checkUserLoggedIn();
		return Settings.find({ 
				owner : Meteor.userId() 
			}, {
				fields : {
					owner : 1,
					blacklist : 1,
					blindfield : 1
				}
			});
	});
}
