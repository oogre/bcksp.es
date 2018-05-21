/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:30
  @Last Modified time: 2018-05-21 23:39:29
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
		return Archives.find({
			type : config.archives.private.type,
			owner : Meteor.userId()
		}, {
			fields : {
				count : 1
			}
		});
	});
}