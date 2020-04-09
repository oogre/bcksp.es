/*----------------------------------------*\
  bcksp.es - utilities.archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 16:30:37
  @Last Modified time: 2020-04-09 16:17:26
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
	console.log(content);
	const cryptedContent = encrypt(content);
	const blockId = Blocks.insert({
		ct : cryptedContent.toString(),
		iv : cryptedContent.iv.toString(),
		createdAt : new Date(),
	});
	console.log(blockId);
	return blockId;
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
