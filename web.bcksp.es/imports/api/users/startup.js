/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:47
  @Last Modified time: 2019-01-03 15:31:40
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { 
	log,
	warn
} from './../../utilities/log.js';

Meteor.startup(() => {
	if(Meteor.isServer){
		if(!process.env.ADMIN_MAIL || !process.env.ADMIN_PWD){
			return warn("TO CREATE USER ADMIN : SETUP 'ADMIN_MAIL' AND 'ADMIN_PWD' AS process.env");
		}

		if(Meteor.users.findOne({
			emails : {
				$elemMatch: {
					address : process.env.ADMIN_MAIL
				}
			}
		})){
			return;
		}
		
		log("INSERT USER ADMIN");
		let adminId =  Accounts.createUser({
			email : process.env.ADMIN_MAIL,
			password : process.env.ADMIN_PWD,
			createdAt : new Date(),
			updatedAt : new Date()
		});
		Roles.addUsersToRoles(adminId, ['admin'])
	}
});