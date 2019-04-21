/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:11:04
  @Last Modified time: 2019-04-21 17:35:09
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Settings } from './settings.js';
import { config } from './../../startup/config.js';
import { 
	checkUserLoggedIn
} from './../../utilities/validation.js';


if(Meteor.isServer){
	Meteor.publish("settings.private", () => {
		checkUserLoggedIn();
		return Settings.find({ 
				owner : Meteor.userId() 
			}, {
				fields : {
					owner : 1,
					blacklist : 1,
					blindfield : 1,
					publishToPublicFeed : 1
				}
			});
	});
}
