/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:29
  @Last Modified time: 2019-04-21 17:33:24
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { streamer } from './../streamer.js';

if(Meteor.isServer){
	Meteor.publish(null, function (){
		return Meteor.roles.find({})
	});
}