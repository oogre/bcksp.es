/*----------------------------------------*\
  web.bitRepublic - backspaces.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:01
  @Last Modified time: 2018-05-26 12:09:52
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import './startup.js';
import './restAPI.js';
import { config } from '../../startup/config.js';
import * as Utilities from '../../utilities.js';

export const Archives = new Mongo.Collection('archives');

if(Meteor.isServer){
	Meteor.users.find({}).observeChanges({
		added(id, user) {
			if(Archives.find({
				owner : id,
				type : config.archives.private.type,
			}).count() > 0) return;

			let archiveId = Archives.insert({
				createdAt : new Date(),
				updatedAt : new Date(),
				type : config.archives.private.type,
				owner : id,
				count : 0,
				backspaces : []
			});

			Utilities.log("Archive : " + archiveId + " is created");
		}
	});

	Archives.find({
		owner : {
			$exists : true
		}
	}).observeChanges({
		changed(id, changedPrivateArchive) {
			if(_.isEmpty(changedPrivateArchive.backspaces)){
				return;
			}

			let publicArchive = Archives.findOne({
				type : config.archives.public.type
			});

			let shortBuffer = changedPrivateArchive.backspaces[0] + " " + publicArchive.shortBuffer;
			shortBuffer = shortBuffer.substr(0, config.archives.public.shortBuffer.maxLen);

			let longBuffer = changedPrivateArchive.backspaces[0] + " " + publicArchive.longBuffer;
			longBuffer = longBuffer.substr(0, config.archives.public.longBuffer.maxLen);

			Archives.update({
				_id : publicArchive._id
			}, {
				$inc : {
					total : changedPrivateArchive.backspaces[0].length
				},
				$set : {
					shortBuffer : shortBuffer,
					longBuffer : longBuffer
				}
			});
			Utilities.log("Public Archive Auto Updated");
		}
	});
}