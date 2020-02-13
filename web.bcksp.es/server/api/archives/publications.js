/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:30
  @Last Modified time: 2020-02-13 23:41:17
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import * as ArchiveTools from './utilities.archive.js';
import { config } from '../../../imports/startup/config.js';
import { Archives, PrivateArchive } from '../../../imports/api/archives/archives.js';
import { checkUserLoggedIn, checkUserRole } from './../../../imports/utilities/validation.js';
import { Blocks } from './archives.js';

Meteor.publish("archive.public", function () {
	return Archives.find({ 
		type : Archives.Type.PUBLIC,
		owner : {
			$exists: false
		}
	}, {
		fields : {
			_id : true, 
			type : true,
			longBuffer : true
		}
	});
});


Meteor.publish('archive.private', function ({startAt, count, live}) {
	checkUserLoggedIn();
	let initializing = true;

	const archiveCursor = Archives.find({ 
		type : Archives.Type.PRIVATE,
		owner : this.userId
	}, {
		fields : {
			blocks : true,
			type : true,
			owner : true,
		}
	});

	let archive = archiveCursor.fetch().pop();
	if(!archive){
		console.log("!archive");
		return;
	};

	this.added('archives', archive._id, archive.populateBlocks(startAt, count));
	let handle;
	if(live){
		handle = archiveCursor.observeChanges({
			changed: (id, archive) => {
				if (initializing)return;
				let firstBlock = Blocks.findOne({ 
					_id : archive.blocks[0]
				}, {
					fields : {
						ct : true, 
						iv : true,
					}
				});
				archive.blockLength = archive.blocks.length;
				archive.stream = [firstBlock.decrypt()];
				archive = _.omit(archive, "blocks");
				this.changed('archives', id, archive);
			}
		});
	}
	initializing = false;
	this.ready();
	this.onStop(() => {
		handle && handle.stop()
	});
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