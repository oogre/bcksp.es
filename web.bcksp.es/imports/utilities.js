/*----------------------------------------*\
  web.bitRepublic - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:21:58
  @Last Modified time: 2018-05-18 16:22:55
\*----------------------------------------*/
import { check } from 'meteor/check';
import { config } from './startup/config.js';
import { Random } from 'meteor/random';

export function numberFormat(inputNumber, len){
	check(inputNumber, Number);

	let stringNumber = inputNumber+"";
	let outputNumber = stringNumber;
	while(outputNumber.length < len){
		outputNumber = "0"+outputNumber;
	}
	return outputNumber;
}

export function log(content){
	console.log(new Date(), content);
}

export function warn(content){
	console.warn(new Date(), content);
}

export function genPubKey(){
	return (Math.random()<0.5 ? "1" : "3") + Random.hexString(31);
}

export function genPrivateKey(){
	return Random.hexString(64);
}