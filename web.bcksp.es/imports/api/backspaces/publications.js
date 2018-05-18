/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:30
  @Last Modified time: 2018-05-18 17:56:04
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Backspaces } from './backspaces.js';


if(Meteor.isServer){
	Meteor.publish('backspaces', function backspacesPublication(){
		return Backspaces.find({});
	});
}