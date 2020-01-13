/*----------------------------------------*\
  web.bitRepublic - backspaces.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:01
  @Last Modified time: 2020-01-13 00:56:30
\*----------------------------------------*/

export const Archives = new Mongo.Collection('archives');

Archives.helpers({
  populate: function () {
  	this.type = Archives.Type.properties[this.type].name
  	return this;
  }
});

Archives.Type = {
	PUBLIC : 0,
	PRIVATE : 1,
	properties: {
		0 : { name: "public", 		value: 0 },
		1 : { name: "private", 		value: 1 },
	}
}

if(!Meteor.isServer){
	export const PrivateArchive = new Mongo.Collection('privateArchive');
}