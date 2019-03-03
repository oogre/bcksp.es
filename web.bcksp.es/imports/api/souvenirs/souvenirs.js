/*----------------------------------------*\
  bcksp.es - souvenirs.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 14:04:35
  @Last Modified time: 2019-02-23 15:20:37
\*----------------------------------------*/
import './methods.js';

if(Meteor.isServer){
	export const Souvenirs = new Mongo.Collection('souvenir');
}