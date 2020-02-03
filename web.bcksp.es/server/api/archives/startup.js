/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:39
  @Last Modified time: 2020-01-30 16:45:16
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Archives } from '../../../imports/api/archives/archives.js';
import { log, warn } from './../../../imports/utilities/log.js';
import { htmlDecode } from'htmlencode';
import { streamer } from './../../../imports/api/streamer.js';
import { publishSampleToPublicArchive } from './utilities.archive.js';

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

	const runAutoPublicPublishingDelay = parseInt(process.env.RUN_AUTO_PUBLIC_PUBLISHING);
	if(runAutoPublicPublishingDelay){
		const autoPublicSamplePublish = (delay = 20) => {
			delay = Math.floor(delay);
			console.log("Next public sample publishing delay : "+ delay);
			Meteor.setTimeout(() => 
				publishSampleToPublicArchive({
					lang : _.sample(
						(new Array(6).fill("en")).concat
						(new Array(3).fill("fr")).concat
						(new Array(2).fill("de")).concat
						(new Array(2).fill("es")).concat
						(new Array(2).fill("nl")).concat
						(new Array(3).fill("zh")).concat
						(new Array(2).fill("ru")).concat
						(new Array(1).fill("ko")).concat
						(new Array(1).fill("ja")).concat
						(new Array(1).fill("el")).concat
						(new Array(1).fill("yi"))
					)
				})
				.finally(() => 
					autoPublicSamplePublish(runAutoPublicPublishingDelay * Math.random())
				), 
				delay
			);
		}
		autoPublicSamplePublish();
	}
});