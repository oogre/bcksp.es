/*----------------------------------------*\
  bcksp.es - archives.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-26 19:07:03
  @Last Modified time: 2020-04-21 15:09:58
\*----------------------------------------*/
import './methods.js';
import './startup.js';
import './publications.js';
import { Archives } from './../../../imports/api/archives/archives.js';
import { decrypt } from './utilities.archive.js';
//import { testEncryptDecrypt } from './utilities.archive.js';

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
		this.blockIds = (this.blocks||[]).map(id=>id);
		this.blocks = 	Blocks.find({ 
							_id : { 
								$in : this.blockIds.map(id=>id).splice(fisrtBlockId, count)
							}
						}, {
							fields : {
								ct : true, 
								iv : true
							}
						}).fetch()
    					.map(block => block.decrypt() )
    					.sort((a, b) => (
        					// Sort docs by the order of their _id values in ids.
							this.blockIds.indexOf(a._id) - this.blockIds.indexOf(b._id)
    					));
		return this;
 	}
});


//testEncryptDecrypt();