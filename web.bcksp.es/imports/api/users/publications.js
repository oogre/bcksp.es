/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:29
  @Last Modified time: 2019-12-21 01:11:29
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { streamer } from './../streamer.js';
import { config } from './../../startup/config.js';
import { Archives } from './../../api/archives/archives.js';

if(Meteor.isServer){
	Meteor.publish("getRoles", function (){
		return Meteor.roles.find({})
	});
}