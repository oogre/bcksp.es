/*----------------------------------------*\
  bcksp.es - utilities.archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 16:30:37
  @Last Modified time: 2020-01-29 19:03:41
\*----------------------------------------*/
import CryptoJS from 'crypto-js';
import { htmlDecode } from'htmlencode';
import Secrete from './../../secrete.js';
import { streamer } from './../../../imports/api/streamer.js';
import { config } from './../../../imports/startup/config.js';
import { Archives } from './../../../imports/api/archives/archives.js';

let fsExtra = Npm.require('fs-extra');
const fs = require('fs');

function encrypt(txt, name){
	return CryptoJS.AES.encrypt(txt, Secrete.getKey(name)).toString();
}


function decrypt(txt, name){
	return CryptoJS.AES.decrypt(txt, Secrete.getKey(name)).toString(CryptoJS.enc.Utf8);
}


export function getArchivePath(name){
	return process.env.ARCHIVE_PATH+"/"+name+".txt";
}


export function fileExists(name){
	return fs.existsSync(getArchivePath(name));
	
}

export async function fileDelete(name){
	return fsExtra.remove(getArchivePath(name));
}


export async function readAsync(name){
	return fsExtra.readFile(getArchivePath(name), "utf8")
			.then( data =>{
				return htmlDecode(decrypt(data, name))
			});
}

export async function writeAsync(name, txt){
	return fsExtra.writeFile(getArchivePath(name), encrypt(txt, name), "utf8");
}


export function cleanInput(text){
	text = text.replace(/&nbsp;/g, " ").replace(/\n/g, " ").replace(/\t/g, " ");
	text = htmlDecode(text);
	text = text+" ";
	return text;
}

export async function clearPrivateArchive(){
	let archive = Archives.findOne({
		type : Archives.Type.PRIVATE,
		owner : Meteor.userId()
	}, {
		fields : {
			_id : true
		}
	});
	Archives.update({
		_id : archive._id
	}, {
		$set : {
			count : 0,
			updatedAt : new Date()
		}
	});

	return writeAsync(archive._id, "")
}

export async function unpublishToPrivateArchive(token, startAt, stopAt){
	let myArchive = Archives.findOne({
		type : Archives.Type.PRIVATE,
		owner : Meteor.userId()
	}, {
		fields : {
			_id : 1
		}
	});
	let data = await readAsync(myArchive._id);
	data = data.split("");
	let txt = data.splice(startAt, stopAt-startAt).join("");
	data = data.join("");
	
	if(token != txt) throw new Error("Token must be equals to text to be Erased");
	
	await writeAsync(myArchive._id, data);
	return Archives.update({
		_id : myArchive._id
	}, {
		$inc : {
			count : -(stopAt - startAt), 
		},
		$set : {
			updatedAt : new Date()
		}
	});
}

export async function publishToPrivateArchive(content){
	let myArchive = Archives.findOne({
		type : Archives.Type.PRIVATE,
		owner : Meteor.userId()
	}, {
		fields : {
			_id : 1
		}
	});

	let data = await readAsync(myArchive._id);
	data = content + data;
	await writeAsync(myArchive._id, data);
	return Archives.update({ 
		_id : myArchive._id
	},{
		$inc : {
			count : content.length
		},
		$set : {
			updatedAt : new Date()
		}
	});
}

export async function publishToPublicArchive(content){
	streamer.emit('publicBackspaces', {content : content});
	let longBuffer = await readAsync(__Public_Archive_ID__);
	longBuffer = content + longBuffer;
	longBuffer = longBuffer.substr(0, config.archives.public.longBuffer.maxMaxLen);
	return writeAsync(__Public_Archive_ID__, longBuffer)
}

export async function incrementPublicArchiveCounter(length){
	return Archives.update({ 
		_id : __Public_Archive_ID__
	}, {
		$inc : {
			count : length
		},
		$set : {
			updatedAt : new Date()
		}
	});
}