/*----------------------------------------*\
  web.bitRepublic - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-19 22:10:37
  @Last Modified time: 2018-05-21 00:32:27
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import  LiveStream from './LiveStream.js';
import  UserLogIn from './user/login.js';

// App component - represents the whole app
class App extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page page--home">
				{ 
					this.props.userId ? 
						this.props.userMail
					:
						<UserLogIn/>
				}
				<LiveStream type={this.props.userId ? "private" : "public"}/>
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
})(App);
