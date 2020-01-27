/*----------------------------------------*\
  bcksp.es - observe.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-26 18:56:46
  @Last Modified time: 2020-01-26 19:22:51
\*----------------------------------------*/


import { Meteor } from 'meteor/meteor';
import { Archives } from '../../../imports/api/archives/archives.js';
import * as ArchiveTools from './utilities.archive.js';
import { log, warn } from './../../../imports/utilities/log.js';



Archives.find({}).observeChanges({
	added(id, archive) {
		if(!ArchiveTools.fileExists(id)){
			ArchiveTools.writeAsync(id, "")
			.then(()=>{ 
				log(">>> ARCHIVE FILE HAS BEEN CREATED");
			})
			.catch(err => {
				warn(err)
			});
		}
	},
	removed(id){
		ArchiveTools.fileDelete(id)
		.then(()=>{ 
			log(">>> PRIVATE ARCHIVE FILE HAS BEEN DELETED");
		})
		.catch(err => {
			warn(err)
		});
	}
});