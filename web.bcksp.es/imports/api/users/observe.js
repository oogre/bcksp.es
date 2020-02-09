/*----------------------------------------*\
  bcksp.es - observe.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-26 18:46:15
  @Last Modified time: 2020-02-07 22:25:26
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { log } from './../../utilities/log.js';
import { config } from './../../startup/config.js';
import { Settings } from "./../settings/settings.js";
import { Archives } from "./../archives/archives.js";

if(Meteor.isServer){
	Meteor.users.find({}).observeChanges({
		added(id, user) {

			if(!Archives.findOne({ type : Archives.Type.PRIVATE, owner : id })){
				let archiveId = Archives.insert({
					createdAt : new Date(),
					updatedAt : new Date(),
					type : Archives.Type.PRIVATE,
					owner : id,
					count : 0
				});
				log(">>> USER PRIVATE ARCHIVE CREATED");

				Meteor.users.update({
					_id : id
				}, {
					$set : {
						archive : archiveId,
						updatedAt : new Date(),
					}
				});
				log(">>> USER PRIVATE ARCHIVE LINKED TO USER");
			}

			
			if(!Settings.findOne({owner : id})){
				let settingsId = Settings.insert({
					owner : id,
					blacklist : [],
					blindfield : {
						types : config.settings.blindfield.disabled.default.type,
						class : config.settings.blindfield.disabled.default.class
					},
					publishToPublicFeed : true,
					createdAt : new Date(),
					updatedAt : new Date()
				});

				log(">>> USER SETTINGS CREATED");
			}


			let first = _.chain(user.emails).filter(email=>!email.verified).first().value();
			if((!user.services.email) || (user.services.email.verificationTokens.length == 0 && first)){
				Accounts.sendVerificationEmail(id);
				log(">>> EMAIL VERIFICATION MAIL HAS BEEN SENT");
			}

		},
		removed(id){

			Settings.remove({
				owner : id,
			});
			log(">>> USER SETTINGS DESTROY");
			
			Archives.remove({
				type : Archives.Type.PRIVATE,
				owner : id,
			});
			log(">>> PRIVATE ARCHIVE DESTROY");
		},

	});
}
