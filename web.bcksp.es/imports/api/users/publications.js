/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:29
  @Last Modified time: 2020-01-27 11:07:00
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { streamer } from './../streamer.js';
import { config } from './../../startup/config.js';
import { Archives } from './../../api/archives/archives.js';
import { checkUserLoggedIn, checkUserRole } from './../../utilities/validation.js';
if(Meteor.isServer){
	Meteor.publish("getRoles", function (){
		return Meteor.roles.find({})
	});

	Meteor.publish("users.counter", function(){
		checkUserLoggedIn();
		checkUserRole("admin");
		let date = new Date(new Date() - (1.5 * config.devices.config.pingInterval));
		Counts.publish(this, 'users.counter', Meteor.users.find());
		Counts.publish(this, 'users.connected.counter', Meteor.users.find({pingAt : { $gt : date }}));
	});	

	Meteor.publish('user.language', function() {
		checkUserLoggedIn();
		return Meteor.users.find(this.userId, {
			fields : {
				lang : true
			}
		});
	});
}