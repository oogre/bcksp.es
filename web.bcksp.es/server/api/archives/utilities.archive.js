/*----------------------------------------*\
  bcksp.es - utilities.archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 16:30:37
  @Last Modified time: 2020-02-07 22:40:09
\*----------------------------------------*/
import CryptoJS from 'crypto-js';
import { htmlDecode } from'htmlencode';
import Secrete from './../../secrete.js';
import { streamer } from './../../../imports/api/streamer.js';
import { config } from './../../../imports/startup/config.js';
import { Archives } from './../../../imports/api/archives/archives.js';

//https://code.google.com/archive/p/crypto-js/
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
	let publicArchive = Archives.findOne({
		type : Archives.Type.PUBLIC,
		owner : {
			$exists: false
		}
	}, {
		fields : {
			longBuffer : true
		}
	});
	let longBuffer = ""
	if(!publicArchive.longBuffer){
		longBuffer = await readAsync(publicArchive._id);
		longBuffer = content + longBuffer;
		longBuffer = longBuffer.substr(0, config.archives.public.longBuffer.maxMaxLen);
	}else{
		longBuffer = publicArchive.longBuffer;
	}
	longBuffer = content + longBuffer;
	longBuffer = longBuffer.substr(0, config.archives.public.longBuffer.maxMaxLen);
	
	Archives.update({
		type : Archives.Type.PUBLIC,
		owner : {
			$exists: false
		}
	}, {
		$inc : {
			count : content.length
		},
		$set:{
			longBuffer : longBuffer,
			updatedAt : new Date()
		}
	});
}
