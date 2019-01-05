/*----------------------------------------*\
  bcksp.es - settings.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:10:40
  @Last Modified time: 2018-12-17 06:10:49
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import { config } from '../../startup/config.js';
import * as Utilities from '../../utilities.js';

export const Settings = new Mongo.Collection('settings');

if(Meteor.isServer){
	Meteor.users.find({}).observeChanges({
		added(id, user) {
			if(Settings.find({owner : id}).count() > 0) return;

			let settingsId = Settings.insert({
				owner : id,
				blacklist : [],
				blindfield : {
					types : [],
					class : ["bcksp-es-disabled"]
				},
				createdAt : new Date(),
				updatedAt : new Date()
			});

			Utilities.log("Settings : " + settingsId + " is created");
		}
	});
}