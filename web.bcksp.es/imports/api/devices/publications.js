/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-09 16:23:58
  @Last Modified time: 2020-01-09 16:29:14
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { config } from './../../startup/config.js';
if(Meteor.isServer){
	Meteor.publish("devices.config", function(){
		this.added('deviceConfig', +new Date(), config.devices.config );
		this.ready();
		this.onStop(() => { } );
	});
}