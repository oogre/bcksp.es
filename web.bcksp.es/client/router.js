/*----------------------------------------*\
  web.bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:12:52
  @Last Modified time: 2018-10-07 19:40:49
\*----------------------------------------*/
/*----------------------------------------*\
  bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:36:59
  @Last Modified time: 2018-04-12 10:33:17
\*----------------------------------------*/
import React from 'react';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';
import About from '../imports/ui/About.js';
import UserProfile from '../imports/ui/user/profile.js';

FlowRouter.route( '/', {
	name: 'home',
	action( params ) {
		render(<App />, document.getElementById('render-target'));
	},
	subscriptions( params, queryParams ) {
		this.register('archive.public', Meteor.subscribe('archive.public'));
		
	}
});

FlowRouter.route( '/about', {
	name: 'about',
	action( params ) {
		render(<About />, document.getElementById('render-target'));
	},
	subscriptions( params, queryParams ) {
		
	}
});

FlowRouter.route( '/login/:token', {
	name: 'login',
	action( params ) {
		LoginLinks.loginWithToken(params.token, (e, r) => {
			if (e) return console.log("KO");
		});
	}
});

FlowRouter.route( '/logout', {
	name: 'logout',
	action( params ) {
		Meteor.logout();
	}
});

let loginRoutes = FlowRouter.group({
	triggersEnter: [(context, redirect)=>{
		if(!Meteor.userId()){
			redirect("/");
		}
	}]
});

loginRoutes.route("/user/:userId", {
	name: "userProfile",
	action( params ) {
		render(<UserProfile />, document.getElementById('render-target'));
	},
	subscriptions( params, queryParams ) {
		this.register('archive.private', Meteor.subscribe('archive.private'));
	}
});
