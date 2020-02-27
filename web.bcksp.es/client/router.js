/*----------------------------------------*\
  bcksp.es - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:36:59
  @Last Modified time: 2020-02-26 12:49:14
\*----------------------------------------*/
  import React from 'react';
  import { render } from 'react-dom';
  import App from './../imports/ui/App.js';
  import Stat from './../imports/ui/Stat.js';
  import About from './../imports/ui/About.js';
  import FormContact from './../imports/ui/form/contact';
  import {setupView} from './../imports/utilities/ui.js';
  import Souvenir from './../imports/ui/souvenir/list.js';
  import UserProfile from './../imports/ui/user/profile.js';
  import OrderDetail from './../imports/ui/order/detail.js';
  import Translations from './../imports/ui/translations.js';
  import TemplateFull from './../imports/ui/template/full.js';
  import TemplateMini from './../imports/ui/template/mini.js';
  import ArchiveWrapper from './../imports/ui/archive/wrapper.js';
  import SouvenirItemBookCreation from './../imports/ui/souvenir/items/book/creation.js';
  import SouvenirItemPosterCreation from './../imports/ui/souvenir/items/poster/creation.js';
  import SouvenirItemBookDescription from './../imports/ui/souvenir/items/book/description.js';
  import SouvenirItemPosterDescription from './../imports/ui/souvenir/items/poster/description.js';
  import SouvenirItemDownLoadDescription from './../imports/ui/souvenir/items/download/description.js';
  
FlowRouter.wait();
Tracker.autorun(() => {
    const subscribtion = Meteor.subscribe('getRoles');    
    const shouldInitializeRouter = subscribtion.ready() && Roles.subscription.ready() && !FlowRouter._initialized; // eslint-disable-line no-underscore-dangle
    if (shouldInitializeRouter) {
        FlowRouter.initialize();
    }
});

const loginRoutes = FlowRouter.group({
	name : 'loginRoutes',
	triggersEnter: [(context, redirect)=>{
		if(!Meteor.userId()){
			redirect(FlowRouter.path("home"));
		}
	}]
});

const adminRoutes = FlowRouter.group({
	name : 'adminRoutes',
	triggersEnter: [(context, redirect)=>{
		if(!Meteor.userId() ||!Roles.userIsInRole(Meteor.userId(),['admin'])) {
			redirect(FlowRouter.path("home"));
		}
	}]
});

///////////// START BASIC ROUTES /////////////

FlowRouter.notFound = {
    action() {
    	FlowRouter.go("home");
    }
};

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

FlowRouter.route( '/translations', {
	name: 'home',
	action( params ) {
		render(<TemplateFull><Translations/></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		
	}
});	

FlowRouter.route( '/livefeed', {
	name: 'livefeed',
	action( params ) {
		
		render(<TemplateMini><ArchiveWrapper fullscreen={true}/></TemplateMini>, document.getElementById('render-target'));
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

FlowRouter.route( '/contact/:type', {
	name: 'contact',
	action( params ) {
		render(<TemplateFull><FormContact type={params.type}/></TemplateFull>, document.getElementById('render-target'));
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

FlowRouter.route( '/souvenir/poster', {
	name: 'posterDescription',
	action( params ) {
		render(<TemplateFull><SouvenirItemPosterDescription/></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		
	}
});

FlowRouter.route( '/souvenir/poster/creation', {
	name: 'posterCreation',
	action( params ) {
		render(<TemplateFull><SouvenirItemPosterCreation/></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		
	}
});

FlowRouter.route( '/order/:id', {
	name: 'orderDetail',
	action( params ) {
		render(<TemplateFull><OrderDetail id={params.id}/></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		this.register('order.get', Meteor.subscribe('order.get',  params.id));
	}
});

///////////// END BASIC ROUTES /////////////

///////////// START LOGIN ROUTES /////////////

loginRoutes.route( '/logout', {
	name: 'logout',
	action( params ) {
		Meteor.logout();
		FlowRouter.go("home");
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

loginRoutes.route( '/souvenir/download', {
	name: 'downloadArchive',
	action( params ) {
		render(<TemplateFull><SouvenirItemDownLoadDescription/></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		
	}
});

loginRoutes.route( '/souvenir/book', {
	name: 'bookDescription',
	action( params ) {
		render(<TemplateFull><SouvenirItemBookDescription/></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		
	}
});

loginRoutes.route( '/souvenir/book/creation', {
	name: 'bookCreation',
	action( params ) {
		render(<TemplateFull><SouvenirItemBookCreation/></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
	
	}
});

///////////// END LOGIN ROUTES /////////////

///////////// START ADMIN ROUTES /////////////

adminRoutes.route("/stat", {
	name: "stat",
	action( params ) {
		render(<TemplateFull><Stat/></TemplateFull>, document.getElementById('render-target'));
		setupView();
	},
	subscriptions( params, queryParams ) {
		this.register('archive.public.counter', Meteor.subscribe('archive.public.counter'));
		this.register('users.counter', Meteor.subscribe('users.counter'));
		this.register('order.all', Meteor.subscribe('order.all'));
	}
});

///////////// END ADMIN ROUTES /////////////

