/*----------------------------------------*\
  web.bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:22
  @Last Modified time: 2020-02-15 22:35:54
\*----------------------------------------*/
import { Blocks } from './archives.js';
import { Meteor } from 'meteor/meteor';
import { 
	checkArray,
	checkString,
	checkGreaterThan,
	checkDBReference,
	checkUserLoggedIn
} from './../../../imports/utilities/validation.js';
import { log } from './../../../imports/utilities/log.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import { genSecurizedBlock, cleanInput, oldies } from './utilities.archive.js';
import { config } from './../../../imports/startup/config.js';
import { Archives } from './../../../imports/api/archives/archives.js';
import { Settings } from './../../../imports/api/settings/settings.js';

String.prototype.remove = function (startIndex, count){ // remove text has to be removed
	return this.substr(0, startIndex) + this.substr(startIndex + count)
};

export const ArchiveAdd = new ValidatedMethod({
	name: 'Archives.methods.add',
	validate({ text }) {
		checkUserLoggedIn();
		checkString(text);
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.mid,
	applyOptions: {
		noRetry: true,
	},
	run({ text }) {
		this.unblock();
		text = cleanInput(text);
		let mySettings = Settings.findOne({
			owner : Meteor.userId()
		}, {
			fields : {
				publishToPublicFeed : 1
			}
		});
		
		if(mySettings.publishToPublicFeed){
			const publicArchive = Archives.findOne({
				type : Archives.Type.PUBLIC,
				owner : {
					$exists: false
				}
			}, {
				fields : {
					longBuffer : true
				}
			});
			
			Archives.update({
				type : Archives.Type.PUBLIC,
				owner : {
					$exists: false
				}
			}, {
				$inc : {
					count : text.length + 1 // +1 for the space between blocks
				},
				$set:{
					longBuffer : (text + " " + publicArchive.longBuffer).substr(0, config.archives.public.longBuffer.maxMaxLen),
					updatedAt : new Date()
				}
			});
		}

		Archives.update({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId()
		}, {
			$push : {
				blocks : {
					$each: [ genSecurizedBlock(text) ],
					$position: 0
				}
			},
			$inc : {
				count : text.length + 1 // +1 for the space between blocks
			},
			$set : {
				updatedAt : new Date()
			}
		});
		
		return "YES";
	}
});



export const ArchiveClear = new ValidatedMethod({
	name: 'Archives.methods.clear',
	validate() {
		checkUserLoggedIn();
		checkDBReference({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId()
		}, Archives);
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run() {
		this.unblock();
		
		const myArchive = Archives.findOne({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId(),
		});
		
		Blocks.remove({
			_id : {
				$in : myArchive.blocks
			}
		});

		Archives.update({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId()
		}, {
			$set : {
				blocks : [],
				count : -1,
				updatedAt : new Date()
			}
		});
		
		const T2 = i18n.createTranslator("userprofile.danger.deleteArchive.confirmation");
		return {
			success : true,
			message : {
				title : T2("title"),
				content : T2("content")
			}
		};
	}
});



export const ArchiveDownload = new ValidatedMethod({
	name: 'Archives.methods.download',
	validate() {
		checkUserLoggedIn();
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run() {
		this.unblock();
		const myArchive = Archives.findOne({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId()
		});
		const data = {
			count : myArchive.count,
			content : myArchive.populateBlocks().blocks.map(({content})=>content).join(" "),
			createdAt : myArchive.createdAt,
			updatedAt : myArchive.updatedAt,
		};
		const file = [
			i18n.createTranslator("souvenir.item.download.file")("content", {
				createdAt : moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
				updatedAt : moment(data.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
				content : data.content,
				count : data.count
			})
		];
		const T2 = i18n.createTranslator("souvenir.item.download.confirmation");
		return {
			success : true,
			data : file,
			message : {
				title : T2("title"),
				content : T2("content")
			}
		};
	}
});

export const ArchiveEdit = new ValidatedMethod({
	name: 'Archives.methods.edit',
	validate(partialBlocks) {
		let _ids = _.pluck(partialBlocks, '_id');
		checkUserLoggedIn();
		checkArray(_ids);
		checkDBReference({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId(),
			blocks : {
				$all : _ids
			}
		}, Archives);
		checkDBReference({
			_id : {
				$in : _ids
			}
		}, Blocks);
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.mid,
	applyOptions: {
		noRetry: true,
	},
	run(partialBlocks) {
		this.unblock();
		const partialBlock_ids = _.pluck(partialBlocks, '_id');
		const myArchive = Archives.findOne({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId(),
			blocks : {
				$all : partialBlock_ids
			}
		});
		const indexes = partialBlock_ids.map(_id => myArchive.blocks.indexOf(_id) );
		const startAtBlock = Math.min(...indexes);
		const countBlock = indexes.length;
		const blocks = myArchive.populateBlocks(startAtBlock, countBlock).blocks;
		let theRest = "";
		for(let block of blocks){
			let partialBlock = _.findWhere(partialBlocks , {_id : block._id});
			if(partialBlock && partialBlock.text==block.content.substr(partialBlock.startAt, partialBlock.count)){
				theRest += block.content.remove(partialBlock.startAt, partialBlock.count);
			}
		}

		Blocks.remove({
			_id : {
				$in : partialBlock_ids
			}
		});

		Archives.update({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId(),
			blocks : {
				$all : partialBlock_ids
			}
		}, {
			$pull: {
				blocks : {
					$in: partialBlock_ids
				}
			},
			$inc : {
				count : -1 * (_.pluck(blocks, 'content').join("").length + blocks.length)
			},
			$set : {
				updatedAt : new Date()
			}
		});

		if(!_.isEmpty(theRest)){
			Archives.update({
				type : Archives.Type.PRIVATE,
				owner : Meteor.userId()
			}, {
				$push : {
					blocks : {
						$each: [ genSecurizedBlock(theRest) ],
						$position: startAtBlock
					}
				},
				$inc : {
					count : theRest.length + 1
				},
				$set : {
					updatedAt : new Date()
				}
			});
		}

		const T2 = i18n.createTranslator("archive.edit.confirmation");
		return {
			success : true,
			message : {
				title : T2("title"),
				content : T2("content")
			}
		};
	}
});
