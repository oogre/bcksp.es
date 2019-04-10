/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:39
  @Last Modified time: 2019-04-07 17:52:02
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { htmlDecode } from'htmlencode';
import { Archives } from '../../../imports/api/archives/archives.js';
import { config } from '../../../imports/startup/config.js';
import * as ArchiveTools from '../../utilities.archive.js';
import { log, warn } from './../../../imports/utilities/log.js';

Meteor.startup(() => {
	if(Meteor.isServer){
		//decodeHtmlEntitiesFromArchives();

		if(Archives.find({
			type : config.archives.public.type
		}).count() < 1){
			log(" INSERT PUBLIC Archive");
			let publicArchiveId = Archives.insert({
				type : config.archives.public.type,
				count : 0
			});
			ArchiveTools.writeAsync(publicArchiveId, "")
			.then(()=>{
				log('The file has been saved!');
			})
			.catch(err => warn(err));
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
				.then(()=>{ 
					log('The file has been saved!');
				})
				.catch(err => warn(err));
				console.log(user);
				Accounts.sendVerificationEmail(id, user.emails.pop().address)
				log("Archive : " + archiveId + " is created");
			}
		});


	}
});

function decodeHtmlEntitiesFromArchives(){
	Archives.find({
	}).fetch().map(archive => {
		ArchiveTools.readAsync(archive._id)
		.then(data =>{
			//data = htmlDecode(data);
			//ArchiveTools.writeAsync(archive._id, data)
			Archives.update({
				_id : archive._id
			},{
				$set : {
					count : data.length,
					updatedAt : new Date()
				}
			});
		})
	})
}

