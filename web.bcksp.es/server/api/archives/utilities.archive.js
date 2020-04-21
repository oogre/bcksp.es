/*----------------------------------------*\
  bcksp.es - utilities.archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 16:30:37
  @Last Modified time: 2020-04-09 19:23:28
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


export const testEncryptDecrypt = ()=>{
	let max = 16 * 16 * 16 * 16;
	let warnings = [];
	for(let i = 0 ; i < max ; i ++){
		let t = " "+String.fromCharCode(i);
		try{
			const cryptedContent = encrypt(t);
			const block = {
				ct : cryptedContent.toString(),
				iv : cryptedContent.iv.toString(),
				createdAt : new Date(),
			}
			const result = decrypt(block);
			//if(t != result) throw new Error("");
		}catch(e){
			warnings.push(i);
			console.log("WARNING with charCode : ", i);
		}
	}
	console.log("DONE");
	console.log(JSON.stringify(warnings));
}



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
