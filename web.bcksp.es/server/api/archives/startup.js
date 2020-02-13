/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:39
  @Last Modified time: 2020-02-11 18:43:23
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Archives } from '../../../imports/api/archives/archives.js';
import { log, warn } from './../../../imports/utilities/log.js';
import { htmlDecode } from'htmlencode';
import { streamer } from './../../../imports/api/streamer.js';
import { publishSampleToPublicArchive } from './utilities.archive.js';

Meteor.startup(() => {
	const publicArchive = Archives.findOne({ 
		type : Archives.Type.PUBLIC,
		owner : {
			$exists: false
		}
	});
	
	if(!publicArchive) {
		Archives.insert({
			type : Archives.Type.PUBLIC,
			count : -1,
			longBuffer : ""
		});
		log(">>> INSERT PUBLIC ARCHIVE");
	}
});