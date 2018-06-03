/*----------------------------------------*\
  web.bitRepublic - users.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:17:11
  @Last Modified time: 2018-06-02 17:50:52
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import './startup.js';

import { config } from '../../startup/config.js';
import { Archives } from './../archives/archives.js';
import * as Utilities from '../../utilities.js';

if(Meteor.isServer){
	Archives.find({
		owner : {
			$exists : true
		}
	}).observeChanges({
		added(id, archive) {
			if(Meteor.users.find({
				archive : id
			}).count() > 0) return;

			Meteor.users.update({
				_id : archive.owner
			}, {
				$set : {
					archive : id
				}
			});

			Utilities.log("Archive "+id+" is attached to user : " + archive.owner);
		}
	});
}