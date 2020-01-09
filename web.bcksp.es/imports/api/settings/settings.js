/*----------------------------------------*\
  bcksp.es - settings.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:10:40
  @Last Modified time: 2020-01-09 23:24:26
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import { config } from '../../startup/config.js';
import { 
	log
} from './../../utilities/log.js';
import SettingsUtil from './../../utilities/settings.js';

export const Settings = new Mongo.Collection('settings');

if(Meteor.isServer){
	Meteor.users.find({}).observeChanges({
		added(id, user) {
			if(Settings.find({owner : id}).count() > 0) return;
			
			let settingsId = SettingsUtil.create();
			
			Settings.update({
				_id : settingsId
			},{
				$set : {
					owner : id,
					updatedAt : new Date()
				}
			});

			log(">>> USER SETTINGS CREATED");
		}
	});
}