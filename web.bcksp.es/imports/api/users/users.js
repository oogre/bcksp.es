/*----------------------------------------*\
  web.bitRepublic - users.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:17:11
  @Last Modified time: 2019-12-20 22:14:47
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import './startup.js';

import { config } from '../../startup/config.js';
import { Archives } from './../archives/archives.js';
import { log } from './../../utilities/log.js';


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

			log("Archive "+id+" is attached to user : " + archive.owner);
		}
	});
	Meteor.users.find({}).observeChanges({
		added(id, user) {
			let emails = user.emails;
			let first = _.chain(emails).filter(email=>!email.verified).first().value();
			if((!user.services.email) || (user.services.email.verificationTokens.length == 0 && first)){
				Accounts.sendVerificationEmail(id);
				log("Verification email is send");
			}
		}
	});
}