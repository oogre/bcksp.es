/*----------------------------------------*\
  bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:36:59
  @Last Modified time: 2019-03-26 11:30:05
  \*----------------------------------------*/
  import React from 'react';
  import { render } from 'react-dom';
  import App from '../imports/ui/App.js';
  import About from '../imports/ui/About.js';
  import {setupView} from '../imports/utilities/ui.js';
  import Souvenir from '../imports/ui/souvenir/list.js';
  import LiveStream from '../imports/ui/archive/LiveStream.js';
  import UserProfile from '../imports/ui/user/profile.js';
  import SouvenirItem from '../imports/ui/souvenir/item.js';
  import TemplateFull from '../imports/ui/template/full.js';

const DEVELOPPMENT = true;

if(DEVELOPPMENT){
	FlowRouter.route( '/', {
		name: 'home',
		action( params ) {
			render(<TemplateFull><App/></TemplateFull>, document.getElementById('render-target'));
			setupView();
		},
		subscriptions( params, queryParams ) {
			
		}
	});
}else{
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
			setupView();
		},
		subscriptions( params, queryParams ) {
			
		}
	});	
}

FlowRouter.route( '/livefeed', {
		name: 'livefeed',
		action( params ) {
			render(<LiveStream/>, document.getElementById('render-target'));
			setupView();
		},
		subscriptions( params, queryParams ) {
			
		}
	});

FlowRouter.route( '/about', {
	name: 'about',
	action( params ) {
		render(<TemplateFull><About /></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		
	}
});

FlowRouter.route( '/souvenir', {
	name: 'souvenir',
	action( params ) {
		render(<TemplateFull><Souvenir /></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		
	}
});

FlowRouter.route( '/souvenir/:type', {
	name: 'item',
	action( params ) {
		render(<TemplateFull><SouvenirItem type={params.type}/></TemplateFull>, document.getElementById('render-target'));
		setupView();
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
		setupView();
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