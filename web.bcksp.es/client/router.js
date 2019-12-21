/*----------------------------------------*\
  bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:36:59
  @Last Modified time: 2019-12-21 01:14:13
  \*----------------------------------------*/
  import React from 'react';
  import { render } from 'react-dom';
  import App from '../imports/ui/App.js';
  import Stat from '../imports/ui/Stat.js';
  import About from '../imports/ui/About.js';
  import {setupView} from '../imports/utilities/ui.js';
  import Souvenir from '../imports/ui/souvenir/list.js';
  import LiveStream from '../imports/ui/archive/LiveStream.js';
  import UserProfile from '../imports/ui/user/profile.js';
  import SouvenirItem from '../imports/ui/souvenir/item.js';
  import TemplateFull from '../imports/ui/template/full.js';
  import TemplateMini from '../imports/ui/template/mini.js';
  

const DEVELOPPMENT = true;

FlowRouter.wait();
Tracker.autorun(() => {
    const subscribtion = Meteor.subscribe('getRoles');    
    const shouldInitializeRouter =
        subscribtion.ready() &&
        Roles.subscription.ready() &&
        !FlowRouter._initialized; // eslint-disable-line no-underscore-dangle
    if (shouldInitializeRouter) {
        FlowRouter.initialize();
    }
});

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
			render(<TemplateMini><LiveStream/></TemplateMini>, document.getElementById('render-target'));
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
		
	},
	triggersEnter: [(context, redirect)=>{
		if(context.params.type == "download" && !Meteor.userId()){
			redirect(FlowRouter.path("souvenir"));
		}
	}]
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
			redirect(FlowRouter.path("home"));
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



let adminRoutes = FlowRouter.group({
	name : 'adminRoutes',
	triggersEnter: [(context, redirect)=>{
		if(!Meteor.userId() ||!Roles.userIsInRole(Meteor.userId(),['admin'])) {
			redirect(FlowRouter.path("home"));
		}
	}]
});



adminRoutes.route("/stat", {
	name: "stat",
	action( params ) {
		render(<TemplateFull><Stat/></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		this.register('getInfo', Meteor.subscribe('getInfo'));
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