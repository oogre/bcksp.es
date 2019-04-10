/*----------------------------------------*\
  bcksp.es - meteor.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 16:12:39
  @Last Modified time: 2019-04-06 22:10:18
\*----------------------------------------*/
import {checkUserLoggedIn} from "./validation.js";

export async function resetPassword(token, pwd){
	return new Promise((resolve, reject)=>{
		Accounts.resetPassword(token, pwd, (err) => {
			if(err) return reject(err);
			return resolve();
		});
	});
}

export async function getEmailOfCurrentUser(){
	return new Promise((resolve, reject)=>{
		try{
			checkUserLoggedIn();
		}catch(err){
			return reject(err);
		}
		if(!Meteor.user())return reject();
		let emails = Meteor.user().emails;
		let last = _.chain(emails).filter(email=>email.verified).last().value();
		let first = _.chain(emails).filter(email=>!email.verified).first().value();
		return resolve((last || first).address);
	});
}