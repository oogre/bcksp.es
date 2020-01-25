/*----------------------------------------*\
  web.bitRepublic - backspaces.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:01
  @Last Modified time: 2020-01-25 15:53:52
\*----------------------------------------*/
import EasyEnum from "./../EasyEnum.js";


export const Archives = new Mongo.Collection('archives');

Archives.helpers({
  populate: function () {
  	this.type = Archives.Type.getName(this.type);
  	return this;
  }
});

Archives.Type = EasyEnum({
  PUBLIC : 0,
  PRIVATE : 1,
});

if(!Meteor.isServer){
	export const PrivateArchive = new Mongo.Collection('privateArchive');
}