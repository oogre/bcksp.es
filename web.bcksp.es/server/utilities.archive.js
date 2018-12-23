/*----------------------------------------*\
  bcksp.es - utilities.archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 16:30:37
  @Last Modified time: 2018-12-17 07:59:53
\*----------------------------------------*/
import { config } from '../imports/startup/config.js';
import CryptoJS from 'crypto-js';
import Secrete from './secrete.js';

let fsExtra = Npm.require('fs-extra');

function encrypt(txt, name){
	return CryptoJS.AES.encrypt(txt, Secrete.getKey(name)).toString();
}

function decrypt(txt, name){
	return CryptoJS.AES.decrypt(txt, Secrete.getKey(name)).toString(CryptoJS.enc.Utf8);
}

export function getArchivePath(name){
	return process.env.ARCHIVE_PATH+"/"+name+".txt";
}

export async function append(name, txt){
	let data = await readAsync(name);
	data = txt + data;
	await writeAsync(name, data);
}

export async function splice(name, token, startAt, stopAt){
	let data = await readAsync(name);
	data = data.split("");
	let txt = data.splice(startAt, stopAt-startAt).join("");
	data = data.join("");
	if(token == txt){
		await writeAsync(name, data);
	}else{
		throw new Error("Token must be equals to text to be Erased");
	}
}

export async function readAsync(name){
	return fsExtra.readFile(getArchivePath(name), "utf8")
			.then( data =>{
				return decrypt(data, name)
			});
}

export async function writeAsync(name, txt){
	return fsExtra.writeFile(getArchivePath(name), encrypt(txt, name), "utf8");
}