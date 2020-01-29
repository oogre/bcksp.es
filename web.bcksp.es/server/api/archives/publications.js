/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:30
  @Last Modified time: 2020-01-29 19:12:26
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import * as ArchiveTools from './utilities.archive.js';
import { config } from '../../../imports/startup/config.js';
import { Archives, PrivateArchive } from '../../../imports/api/archives/archives.js';
import { checkUserLoggedIn, checkUserRole } from './../../../imports/utilities/validation.js';

Meteor.publish("archive.public", function () {
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
	.then(content => {
		archive.content = content;
		this.added('archives', archive._id, archive);
		this.ready();
	})
	this.onStop(() => { } );
});



Meteor.publish('archive.private', function () {
	checkUserLoggedIn();
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

	this.onStop(() => handle && handle.stop() );
});



Meteor.publish("archive.private.counter", function () {
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



Meteor.publish("archive.public.counter", function () {
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