/*----------------------------------------*\
  web.bitRepublic - backspaces.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:01
  @Last Modified time: 2018-05-18 22:37:18
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import './startup.js';
import './restAPI.js';
import { config } from '../../startup/config.js';

export const Backspaces = new Mongo.Collection('backspaces');

if(Meteor.isServer){
	Backspaces.find({
		type : config.backspaces.type.private,
		owner : { $exists : true }
	}).observe({
		changed(newBackspaces, oldBackspaces){
			let countBackspaces = newBackspaces.count - oldBackspaces.count;
			Backspaces.update({
				type : config.backspaces.type.public,
				owner : { $exists : false }
			}, {
				$inc : {
					count : countBackspaces
				}
			});
		}
	});
}