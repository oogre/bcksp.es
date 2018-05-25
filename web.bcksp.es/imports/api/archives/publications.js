/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:30
  @Last Modified time: 2018-05-23 23:43:20
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Archives } from './archives.js';
import { config } from './../../startup/config.js';

if(Meteor.isServer){
	Meteor.publish("archive.public", function archivesPublication(){
		return Archives.find({
			type : config.archives.public.type
		});
	});
	Meteor.publish("archive.private", function archivesPublication(){
		return Archives.find({
			type : config.archives.private.type,
			owner : Meteor.userId()
		});
	});

	Meteor.publish("archive.private.count", function archivesPublication(){
		let initializing = true;
		const handle = Archives.find({ 
			type : config.archives.private.type,
			owner : Meteor.userId() 
		}).observeChanges({
			changed: (id, changedPrivateArchive) => {
				if (!initializing) {
					this.changed('counts', id, changedPrivateArchive);
				}
			}
		});

		// Instead, we'll send one `added` message right after `observeChanges` has
		// returned, and mark the subscription as ready.
		initializing = false;
		
		let archive = Archives.findOne({
			type : config.archives.private.type,
			owner : Meteor.userId()
		}, {
			fields : {
				count : 1
			}
		});
		if(archive){
			this.added('counts', archive._id, archive);
		}
		this.ready();

		// Stop observing the cursor when the client unsubscribes. Stopping a
		// subscription automatically takes care of sending the client any `removed`
		// messages.
		this.onStop(() => handle.stop() );
	});
}