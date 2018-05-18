/*----------------------------------------*\
  web.bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:29
  @Last Modified time: 2018-05-18 16:18:36
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';


if(Meteor.isServer){
	Meteor.publish(null, function (){
		return Meteor.roles.find({})
	});
}