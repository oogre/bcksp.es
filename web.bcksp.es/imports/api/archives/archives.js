/*----------------------------------------*\
  web.bitRepublic - backspaces.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:01
  @Last Modified time: 2018-12-13 19:34:16
\*----------------------------------------*/

export const Archives = new Mongo.Collection('archives');

if(!Meteor.isServer){
	export const PublicArchive = new Mongo.Collection('publicArchive');
	export const PrivateArchive = new Mongo.Collection('privateArchive');
}