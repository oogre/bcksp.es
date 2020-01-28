/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:30
  @Last Modified time: 2020-01-27 17:58:44
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import * as ArchiveTools from './utilities.archive.js';
import { config } from '../../../imports/startup/config.js';
import { Archives, PrivateArchive } from '../../../imports/api/archives/archives.js';
import { checkUserLoggedIn, checkUserRole } from './../../../imports/utilities/validation.js';



Meteor.publish("archive.public", function(){
	let archive = Archives.findOne({ 
		type : Archives.Type.PUBLIC,
		owner : {
			$exists: false
		}
	}, {
		fields : {
			_id : true, 
			type : true
		}
	});

	__Public_Archive_ID__ = archive._id;

	ArchiveTools.readAsync(archive._id)
	.then(content=>{
		archive.content = content;
		this.added('archives', archive._id, archive);
		this.ready();
	})
	this.onStop(() => { } );
});


Meteor.publish('archive.private.2', function(){
	if(!this.userId)return this.ready();
	let initializing = true;
	let archiveCursor = Archives.find({ 
		type : Archives.Type.PRIVATE,
		owner : this.userId
	});

	let archive = archiveCursor.fetch()[0];

	ArchiveTools.readAsync(archive._id)
	.then(content=>{
		archive.content = content;
		this.added('archives', archive._id, archive);
		this.ready();
	});

	let handle = archiveCursor.observe({
		changed: (oldData, newData) => {
			if (initializing)return null;
			let newCharLength = oldData.count - newData.count;
			ArchiveTools.readAsync(archive._id)
			.then(content=>{
				if(newCharLength > 0){
					this.changed('archives', archive._id, {
						stream : content.substr(0, newCharLength)
					});		
				}else{
					this.changed('archives', archive._id, { 
						stream : false,
						content : content
					});		
				}
			});	
		}
	});
	initializing = false;
	
	this.onStop(() => handle && handle.stop() );
});


Meteor.publish("archive.private", function(){
	let initializing = true;
	let handle;
	if(this.userId){
		let archiveCursor = Archives.find({ 
			type : Archives.Type.PRIVATE,
			owner : this.userId 
		});
		
		let archive = archiveCursor.fetch()[0];

		ArchiveTools.readAsync(archive._id)
		.then(content=>{
			this.added('privateArchive', +new Date(), {content : content});	
		});
		
		handle = archiveCursor.observe({
			changed: (oldData, newData) => {
				if (!initializing) {
					let newCharLength = oldData.count-newData.count;
					ArchiveTools.readAsync(archive._id)
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

Meteor.publish("archive.private.counter", function(){
	checkUserLoggedIn();
	return Archives.find({ 
			type : Archives.Type.PRIVATE,
			owner : this.userId
		}, {
			fields : {
				count : 1,
				type : 1,
				owner : 1
			}
		});
});

Meteor.publish("archive.public.counter", function(){
	checkUserLoggedIn();
	checkUserRole("admin");
	return Archives.find({ 
		type : Archives.Type.PUBLIC,
		owner : {
			$exists: false
		}
	}, {
		fields : {
			count : 1
		}
	});
});

Meteor.publish("archive.config", function(){
	this.added('config', +new Date(), {
		maxCharPerBook : config.book.getMaxChar()
	});
	this.ready();
	this.onStop(() => { } );
});