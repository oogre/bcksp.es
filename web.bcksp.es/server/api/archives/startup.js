/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:39
  @Last Modified time: 2020-01-09 15:27:42
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { htmlDecode } from'htmlencode';
import { Archives } from '../../../imports/api/archives/archives.js';
import { config } from '../../../imports/startup/config.js';
import * as ArchiveTools from './utilities.archive.js';
import { log, warn } from './../../../imports/utilities/log.js';


__Public_Archive_ID__ = null;

Meteor.startup(() => {
	let publicArchive = Archives.findOne({
		type : config.archives.public.type
	}, { 
		fields : {
			_id : 1 	
		}
	});
	if(publicArchive){
		__Public_Archive_ID__ = publicArchive._id;
	}
	else{
		log(">>> INSERT PUBLIC ARCHIVE");
		__Public_Archive_ID__ = Archives.insert({
									type : config.archives.public.type,
									count : 0
								});
		ArchiveTools.writeAsync(__Public_Archive_ID__, "")
		.then(()=>{
			log(">>> PUBLIC ARCHIVE FILE HAS BEEN CREATED");
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
				log(">>> PRIVATE ARCHIVE FILE HAS BEEN CREATED");
			})
			.catch(err => warn(err));
			//Accounts.sendVerificationEmail(id, user.emails.pop().address)
		}
	});
});
/*
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
*/
