/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:39
  @Last Modified time: 2020-01-29 12:57:05
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Archives } from '../../../imports/api/archives/archives.js';
import { log, warn } from './../../../imports/utilities/log.js';

__Public_Archive_ID__ = null;

Meteor.startup(() => {
	__Public_Archive_ID__ = Archives.findOne({ 
		type : Archives.Type.PUBLIC,
		owner : {
			$exists: false
		}
	})?._id;
	
	if(!__Public_Archive_ID__) {
		__Public_Archive_ID__ = Archives.insert({
									type : Archives.Type.PUBLIC,
									count : 0
								});
		log(">>> INSERT PUBLIC ARCHIVE");
	}
});