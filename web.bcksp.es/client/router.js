/*----------------------------------------*\
  web.bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:12:52
  @Last Modified time: 2019-01-05 15:32:42
  \*----------------------------------------*/
/*----------------------------------------*\
  bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:36:59
  @Last Modified time: 2018-04-12 10:33:17
  \*----------------------------------------*/
  import React from 'react';
  import { render } from 'react-dom';

  import TemplateFull from '../imports/ui/template/full.js';

  import App from '../imports/ui/App.js';
  import About from '../imports/ui/About.js';
  import UserProfile from '../imports/ui/user/profile.js';


FlowRouter.route( '/', {
	name: 'temp',
	action( params ) {
		FlowRouter.go("home");
	}
});

FlowRouter.route( '/dev', {
	name: 'home',
	action( params ) {
		render(<TemplateFull><App/></TemplateFull>, document.getElementById('render-target'));
	},
	subscriptions( params, queryParams ) {
		this.register('archive.public', Meteor.subscribe('archive.public'));
		this.register('archive.public.counter', Meteor.subscribe('archive.public.counter'));
	}
});

FlowRouter.route( '/about', {
	name: 'about',
	action( params ) {
		render(<TemplateFull><About /></TemplateFull>, document.getElementById('render-target'));
	},
	subscriptions( params, queryParams ) {
		
	}
});

FlowRouter.route( '/login/:token', {
	name: 'login',
	action( params ) {
		LoginLinks.loginWithToken(params.token, (e, r) => {
			if (e) {
				console.log(e);
			}
			FlowRouter.go("home");
		});
	}
});

let loginRoutes = FlowRouter.group({
	name : 'loginRoutes',
	triggersEnter: [(context, redirect)=>{
		if(!Meteor.userId()){
			redirect("/");
		}
	}]
});

loginRoutes.route( '/logout', {
	name: 'logout',
	action( params ) {
		Meteor.logout();
	}
});

loginRoutes.route("/profile", {
	name: "userProfile",
	action( params ) {
		render(<TemplateFull><UserProfile/></TemplateFull>, document.getElementById('render-target'));
	},
	subscriptions( params, queryParams ) {
		this.register('settings.private', Meteor.subscribe('settings.private'));
	}
});

Tracker.autorun(()=>{
	let current = FlowRouter.current();
	if((!Meteor.userId() 
		&& current 
		&& current.route 
		&& current.route.group 
		&& current.route.group.name == "loginRoutes"
		) || ( 
		Meteor.userId() 
		&& current
		&& current.route
		&& current.route.name == "login"
		) || (
		!Meteor.userId() 
		&& current
		&& current.route
		&& current.route.name == "logout"
		)
	){
		FlowRouter.go("home");
	}
});