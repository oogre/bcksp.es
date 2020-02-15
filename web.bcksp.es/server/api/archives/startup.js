/*----------------------------------------*\
  web.bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:39
  @Last Modified time: 2020-02-15 22:39:18
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Archives } from '../../../imports/api/archives/archives.js';
import { log, warn } from './../../../imports/utilities/log.js';
import { oldies, genSecurizedBlock } from './utilities.archive.js';

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


	Archives.find({
		type : Archives.Type.PRIVATE,
		blocks : { 
			$exists: false
		}
	}).fetch()
	.map(archive =>{
		log("archive._id : ", archive._id);

		let data = oldies.readSync(archive._id);

		Archives.update({
			_id : archive._id
		}, {
			$set : {
				count : -1,
				updatedAt : new Date()
			}
		});

		let count = 0;
		let sData = data.split(" ");
		let blocks = sData.map(text => {
			log( (count / (data.length-sData.length+1)).toFixed(2) );
			count+=text.length;
			return genSecurizedBlock(text);
		});

		Archives.update({
			_id : archive._id
		}, {
			$set : {
				blocks : blocks,
				count : count + blocks.length-1,
				updatedAt : new Date()
			}
		});

		log(" DONE");
	});
});