/*----------------------------------------*\
  bcksp.es - meteor.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 16:12:39
  @Last Modified time: 2020-01-29 12:47:16
\*----------------------------------------*/
import {checkUserLoggedIn} from "./validation.js";

export function getEmailOfCurrentUser(){
	checkUserLoggedIn();
	return getMainEmail(Meteor.user().emails);
}

export function getMainEmail(emails){
	let last = _.chain(emails).filter(email=>email.verified).last().value();
	let first = _.chain(emails).filter(email=>!email.verified).first().value();
	return (last || first).address;
}