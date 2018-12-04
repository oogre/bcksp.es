/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:39
  @Last Modified time: 2018-11-26 06:17:17
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';

import { Archives } from '../../../imports/api/archives/archives.js';
import { config } from '../../../imports/startup/config.js';
import * as ArchiveTools from '../../utilities.archive.js';
import * as Utilities from '../../../imports/utilities.js';


Meteor.startup(() => {
	if(Meteor.isServer){
		if(Archives.find({
			type : config.archives.public.type
		}).count() < 1){
			Utilities.log(" INSERT PUBLIC Archive");
			let publicArchiveId = Archives.insert({
				type : config.archives.public.type,
				count : 0
			});
			ArchiveTools.writeAsync(publicArchiveId, "")
			.then(()=>{console.log('The file has been saved!');})
			.catch(err => console.log(err));
		}
		Meteor.users.find({})
		.observeChanges({
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
					count : 0
				});
				ArchiveTools.writeAsync(archiveId, "")
				.then(()=>{console.log('The file has been saved!');})
				.catch(err => console.log(err));

				Utilities.log("Archive : " + archiveId + " is created");
			}
		});
	}
});

