/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:11:04
  @Last Modified time: 2020-01-29 19:10:58
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Settings } from './settings.js';
import { config } from './../../startup/config.js';
import { 
	checkUserLoggedIn
} from './../../utilities/validation.js';


if(Meteor.isServer){
	Meteor.publish("settings.private", function(){
		checkUserLoggedIn();
		return Settings.find({ 
				owner : this.userId 
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
