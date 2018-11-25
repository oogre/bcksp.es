/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:30
  @Last Modified time: 2018-11-25 23:19:00
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Archives } from '../../../imports/api/archives/archives.js';
import { config } from '../../../imports/startup/config.js';
import * as ArchiveTools from '../../utilities.archive.js';
import * as Utilities from '../../../imports/utilities.js';

if(Meteor.isServer){
	Meteor.publish("archive.public", function(){
		ArchiveTools.readAsync("longBuffer")
		.then(content=>{
			this.added('publicArchive', +new Date(), {content : content});
			this.ready();
		})
		this.onStop(() => { } );
	});
	Meteor.publish("archive.private.counter", function(){
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
	Meteor.publish("archive.public.counter", function(){
		Utilities.checkUserLoggedIn();
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
							this.added('privateArchive', +new Date(), {content : content.substr(0, newCharLength)});
						});
					}
				}
			});
			this.ready();
		}
		initializing = false;
		this.onStop(() => { handle && handle.stop() });
	});
}