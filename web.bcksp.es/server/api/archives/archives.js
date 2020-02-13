/*----------------------------------------*\
  bcksp.es - archives.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-26 19:07:03
  @Last Modified time: 2020-02-13 23:40:27
\*----------------------------------------*/
import './methods.js';
import './startup.js';
import './publications.js';
import { Archives } from './../../../imports/api/archives/archives.js';
import { decrypt } from './utilities.archive.js';

export const Blocks = new Mongo.Collection('blocks');

Blocks.helpers({
	decrypt : function() {
		return {
			_id : this._id, 
			content : decrypt(this)
		};
	}
});

Archives.helpers({
	populateBlocks : function (fisrtBlockId=0, count=Infinity) {
		this.blockLength = this.blocks.length;
		const ids = this.blocks.splice(fisrtBlockId, count);
		this.blocks = 	Blocks.find({ 
							_id : { 
								$in : ids
							}
						}, {
							fields : {
								ct : true, 
								iv : true
							}
						}).fetch().sort(function(a, b) {
        					// Sort docs by the order of their _id values in ids.
					        return ids.indexOf(a._id) - ids.indexOf(b._id);
    					});
		for(let i = 0 ; i < this.blocks.length ; i ++){
			this.blocks[i] = this.blocks[i].decrypt()
		}
		return this;
 	}
});