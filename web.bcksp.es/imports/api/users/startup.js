/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:47
  @Last Modified time: 2018-10-02 13:33:14
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import * as Utilities from '../../utilities.js';

Meteor.startup(() => {
	if(Meteor.isServer){
		if(!process.env.ADMIN_MAIL || !process.env.ADMIN_PWD){
			return Utilities.warn("TO CREATE USER ADMIN : SETUP 'ADMIN_MAIL' AND 'ADMIN_PWD' AS process.env");
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
		
		Utilities.log("INSERT USER ADMIN");
		let adminId =  Accounts.createUser({
			email : process.env.ADMIN_MAIL,
			password : process.env.ADMIN_PWD,
			createdAt : new Date(),
			updatedAt : new Date()
		});
		Roles.addUsersToRoles(adminId, ['admin'])
	}
});