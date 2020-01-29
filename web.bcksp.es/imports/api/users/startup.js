/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:18:47
  @Last Modified time: 2020-01-29 16:43:14
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { log, warn } from './../../utilities/log.js';

Meteor.startup(() => {
	if(Meteor.isServer){
		if(!process.env.ADMIN_MAIL || !process.env.ADMIN_PWD || !process.env.DEMO_MAIL || !process.env.DEMO_PWD){
			return warn(">>> TO CREATE ADMIN USER & DEMO USER : SETUP 'ADMIN_MAIL', 'ADMIN_PWD', 'DEMO_MAIL' AND 'DEMO_PWD' AS process.env");
		}
		
		if(!Meteor.users.findOne({ emails : { $elemMatch: { address : process.env.ADMIN_MAIL } } }) ){
			log(">>> INSERT ADMIN USER");
			let adminId =  Accounts.createUser({
				email : process.env.ADMIN_MAIL,
				password : process.env.ADMIN_PWD,
				createdAt : new Date(),
				updatedAt : new Date()
			});
			Roles.addUsersToRoles(adminId, ['admin'])
		}

		if(!Meteor.users.findOne({ emails : { $elemMatch: { address : process.env.DEMO_MAIL } } }) ){
			log(">>> INSERT DEMO USER");
			let adminId =  Accounts.createUser({
				email : process.env.DEMO_MAIL,
				password : process.env.DEMO_PWD,
				createdAt : new Date(),
				updatedAt : new Date()
			});
		}
		

		
	}
});