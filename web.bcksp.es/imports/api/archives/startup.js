/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:39
  @Last Modified time: 2018-05-20 15:27:48
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';

import { Archives } from './archives.js';
import * as Utilities from '../../utilities.js';
import { config } from '../../startup/config.js';


Meteor.startup(() => {
	if(Meteor.isServer){
		if(Archives.find({
			type : config.archives.public.type
		}).count() < 1){
			Utilities.log(" INSERT PUBLIC Archive");
			Archives.insert({
				type : config.archives.public.type,
				total : 0,
				shortBuffer : "",
				longBuffer : ""
			});
		}
	}
});

