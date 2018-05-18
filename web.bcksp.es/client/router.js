/*----------------------------------------*\
  web.bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:12:52
  @Last Modified time: 2018-05-18 16:13:38
\*----------------------------------------*/
/*----------------------------------------*\
  bitRepublic - router.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:36:59
  @Last Modified time: 2018-04-12 10:33:17
\*----------------------------------------*/
import React from 'react';
import { render } from 'react-dom';


FlowRouter.route( '/', {
	name: 'home',
	action( params ) {
		render(<App />, document.getElementById('render-target'));
	},
	subscriptions: function(params, queryParams) {
		//this.register('public.bots', Meteor.subscribe('public.bots'));
		//this.register('schedules', Meteor.subscribe('schedules'));
		//this.register('targets', Meteor.subscribe('targets'));
		//this.register('public.wallet', Meteor.subscribe('public.wallet'));
	}
});