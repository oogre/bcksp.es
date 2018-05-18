/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:39
  @Last Modified time: 2018-05-18 16:46:46
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';

import { config } from '../../startup/config.js';
import { Backspaces } from './backspaces.js';
import * as Utilities from '../../utilities.js';

Meteor.startup(() => {
	if(Meteor.isServer){
		if(Backspaces.find({}).count() < 1){
			Utilities.log(" INSERT Backspaces");
			Backspaces.insert({
				type : config.backspaces.type.public,
				count : 0 
			});
		}
	}
});

