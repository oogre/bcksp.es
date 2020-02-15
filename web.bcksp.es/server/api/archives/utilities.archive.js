/*----------------------------------------*\
  bcksp.es - utilities.archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 16:30:37
  @Last Modified time: 2020-02-15 23:52:08
\*----------------------------------------*/
import CryptoJS from 'crypto-js';
import { htmlDecode } from'htmlencode';
import { Blocks } from './archives.js';
import Secrete from './../../secrete.js';

const genIV = () =>(
	CryptoJS.enc.Hex.parse(
		Math.random().toString(16).substr(2)+
		Math.random().toString(16).substr(2)+
		Math.random().toString(16).substr(2)
	)
);

export const genSecurizedBlock = (content)=>{
	const cryptedContent = encrypt(content);
	return Blocks.insert({
		ct : cryptedContent.toString(),
		iv : cryptedContent.iv.toString(),
		createdAt : new Date(),
	});
}

export const encrypt = txt => (
	CryptoJS.AES.encrypt(cleanInput(txt), CryptoJS.SHA256(process.env.ARCHIVE_CRYPTO_KEY), { 
		iv: genIV(),
		mode: CryptoJS.mode.CTR, 
		padding: CryptoJS.pad.AnsiX923
	})	
);

export const decrypt = (block) => (
	CryptoJS.AES.decrypt(block.ct, CryptoJS.SHA256(process.env.ARCHIVE_CRYPTO_KEY), { 
		iv: CryptoJS.enc.Hex.parse(block.iv),
		mode: CryptoJS.mode.CTR, 
		padding: CryptoJS.pad.AnsiX923
	}).toString(CryptoJS.enc.Utf8)
);

export const cleanInput = text => (
	htmlDecode(text.replace(/&nbsp;/g, " ").replace(/\n/g, " ").replace(/\t/g, " "))
);

let fsExtra = Npm.require('fs-extra');
const fs = require('fs');

export const oldies = {
	encrypt : (txt, name) => {
		return CryptoJS.AES.encrypt(txt, Secrete.getKey(name)).toString();
	},
	decrypt : (txt, name) => {
		return CryptoJS.AES.decrypt(txt, Secrete.getKey(name)).toString(CryptoJS.enc.Utf8);
	},
	fileDelete : async (name) =>{
		return fsExtra.remove(process.env.ARCHIVE_PATH+"/"+name+".txt");
	},
	readSync : (name) => {
		try {
			const data = fs.readFileSync(process.env.ARCHIVE_PATH+"/"+name+".txt", "utf8")
			return htmlDecode(oldies.decrypt(data, name))
		} catch (err) {
			console.error(err)
		}
	}
}