/*----------------------------------------*\
  web.bitRepublic - users.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:17:11
  @Last Modified time: 2018-05-18 22:23:35
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import './startup.js';
import { config } from '../../startup/config.js';
import { Backspaces } from './../backspaces/backspaces.js';
import * as Utilities from '../../utilities.js';

if(Meteor.isServer){
	Meteor.users.find({}).observeChanges({
		added(id, user) {
			
			if(Backspaces.find({
				$and : [{
					owner : id
				},{
					type : config.backspaces.type.private,
					owner : { 
						$exists : true 
					}
				}]
			}).count() > 0) return;

			let backspaceId = Backspaces.insert({
				createdAt : new Date(),
				updatedAt : new Date(),
				type : config.backspaces.type.private,
				owner : id,
				count : 0,
				text : ""
			});

			Meteor.users.update({
				_id : id
			}, {
				$set : {
					backspace : backspaceId
				}
			});

			Utilities.log("Backspaces collection is created for user : " + id);
		}
	});
}