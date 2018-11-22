/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:30
  @Last Modified time: 2018-11-22 21:46:41
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Archives } from './archives.js';
import { config } from './../../startup/config.js';

if(Meteor.isServer){
	let fs =  Npm.require('fs');
	Meteor.publish("archive.public", function(){
		let content = fs.readFileSync(process.env.ARCHIVE_PATH+"/longBuffer.txt", "utf8").split("").reverse().join("");
		this.added('publicArchive', +new Date(), {content : content});
		this.ready();
		this.onStop(() => { } );
	});

	Meteor.publish("archive.private", function(data){
		let initializing = true;
		let handle;
		if(this.userId){
			if(this.userId == data.user){
				let user = Meteor.users.findOne({
					_id : this.userId
				}, { 
					fields : {
						archive : 1
					}
				});
				let content = fs.readFileSync(process.env.ARCHIVE_PATH+"/"+user.archive+".txt", "utf8").split("").reverse().join("");
				this.added('privateArchive', +new Date(), {content : content});
				handle = Archives.find({ 
					type : config.archives.private.type,
					owner : Meteor.userId() 
				}).observe({
					changed: (oldData, newData) => {
						if (!initializing) {
							let newCharLength = oldData.count-newData.count;
							let content = fs.readFileSync(process.env.ARCHIVE_PATH+"/"+user.archive+".txt", "utf8").substr(-newCharLength).split("").reverse().join("");
							this.added('privateArchive', +new Date(), {content : content});
						}
					}
				});
			}
			this.ready();
		}
		initializing = false;
		this.onStop(() => { handle && handle.stop() });
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
		this.onStop(() => handle.stop() );
	});
}