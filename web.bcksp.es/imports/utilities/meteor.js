/*----------------------------------------*\
  bcksp.es - meteor.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 16:12:39
  @Last Modified time: 2020-01-09 13:15:40
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
		return resolve(getMainEmail(Meteor.user().emails));
		//let emails = Meteor.user().emails;
		//let last = _.chain(emails).filter(email=>email.verified).last().value();
		//let first = _.chain(emails).filter(email=>!email.verified).first().value();
		//return resolve((last || first).address);
	});
}



export function getMainEmail(emails){
	let last = _.chain(emails).filter(email=>email.verified).last().value();
	let first = _.chain(emails).filter(email=>!email.verified).first().value();
	return (last || first).address;
}