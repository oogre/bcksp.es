/*----------------------------------------*\
  web.bitRepublic - profile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-21 00:58:47
  @Last Modified time: 2018-05-21 01:04:43
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import  LiveStream from './../LiveStream.js';

// UserProfile component
class UserProfile extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page page--home">
				<LiveStream type="private"/>
			</div>
		);
	}
}
export default withTracker(self => {
	let currentUser = Meteor.user();
	let userMail = currentUser ? currentUser.emails[0].address : null;
	let userId = currentUser ? currentUser._id : null;
	return {
		userId,
		currentUser,
		userMail
	};
})(UserProfile);
