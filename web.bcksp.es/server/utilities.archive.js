/*----------------------------------------*\
  bcksp.es - utilities.archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 16:30:37
  @Last Modified time: 2018-11-25 22:18:50
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

export async function readAsync(name){
	return fsExtra.readFile(getArchivePath(name), "utf8")
			.then( data =>{
				return decrypt(data, name)
			});
}

export async function writeAsync(name, txt){
	return fsExtra.writeFile(getArchivePath(name), encrypt(txt, name), "utf8");
}