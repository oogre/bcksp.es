/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:30
  @Last Modified time: 2019-01-03 16:56:59
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Archives } from '../../../imports/api/archives/archives.js';
import { config } from '../../../imports/startup/config.js';
import * as ArchiveTools from '../../utilities.archive.js';
import { 
	checkUserLoggedIn
} from './../../../imports/utilities/validation.js';


if(Meteor.isServer){
	Meteor.publish("archive.public", function(){
		let publicArchive = Archives.findOne({
			type : config.archives.public.type
		}, {
			field : {
				_id : 1
			}
		});
		ArchiveTools.readAsync(publicArchive._id)
		.then(content=>{
			this.added('publicArchive', publicArchive._id, {content : content});
			this.ready();
		})
		this.onStop(() => { } );
	});
	Meteor.publish("archive.public.counter", function(){
		return Archives.find({ 
				type : config.archives.public.type,
			}, {
				fields : {
					count : 1,
					type : 1
				}
			});
	});


	Meteor.publish("archive.private", function(){
		let initializing = true;
		let handle;
		if(this.userId){
			let user = Meteor.users.findOne({
				_id : Meteor.userId()
			}, { 
				fields : {
					archive : 1,
				}
			});

			ArchiveTools.readAsync(user.archive)
			.then(content=>{
				this.added('privateArchive', +new Date(), {content : content});	
			});
			
			handle = Archives.find({ 
				type : config.archives.private.type,
				owner : Meteor.userId() 
			}).observe({
				changed: (oldData, newData) => {
					if (!initializing) {
						let newCharLength = oldData.count-newData.count;
						let content = ArchiveTools.readAsync(user.archive)
						.then(content=>{
							if(newCharLength > 0){
								this.added('privateArchive', +new Date(), {content : content.substr(0, newCharLength)});
							}else{
								this.added('privateArchive', +new Date(), {content : content, invalidateOlder : true});
							}
						});	
					}
				}
			});
			this.ready();
		}
		initializing = false;
		this.onStop(() => { handle && handle.stop() });
	});
	Meteor.publish("archive.private.counter", () => {
		checkUserLoggedIn();
		return Archives.find({ 
				type : config.archives.private.type,
				owner : Meteor.userId() 
			}, {
				fields : {
					count : 1,
					type : 1
				}
			});
	});
	
}