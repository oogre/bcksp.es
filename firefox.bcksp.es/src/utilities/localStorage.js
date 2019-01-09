/*----------------------------------------*\
  bcksp.es - setting.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 14:59:50
  @Last Modified time: 2019-01-09 17:53:28
\*----------------------------------------*/

import Encoder from "htmlencode";
import { difference, uniq } from './tools.js';
import { isArray, isObject } from './validation.js';

function decode(value){
	var marker = "-";
	return Encoder.htmlDecode(marker+""+value).substr(marker.length);
}

export function addToArchiveBuffer(data){
    localStorage.setItem("archive", getArchiveBuffer() + decode(data));
}

export function getArchiveBuffer(){
	return localStorage.getItem("archive") || "";
}

export function clearArchiveBuffer(){
	localStorage.removeItem("archive");
}

export function getIntoBlackList(url){
	let blackList = JSON.parse(localStorage.getItem("blackList") || "[]");
	for(let i = 0 ; i < blackList.length ; i++){
		if(blackList[i] == url){
			return i;
		}
	}
	return false;
}

export async function setBlackList(urls){
	if(!isArray(urls)) throw new Error("setBlackList : need array as parameter");
	let oldBlackList = JSON.parse(localStorage.getItem("blackList") || "[]");
	let blackliststed = difference(urls, oldBlackList);
	let whiteliststed = difference(oldBlackList, urls);
	localStorage.setItem("blackList", JSON.stringify(urls));
	return uniq(blackliststed.concat(whiteliststed));
}

export function removeToBlackList(url){
	let blackList = JSON.parse(localStorage.getItem("blackList") || "[]");
	let itemId = getIntoBlackList(url);
	if(itemId === false) return;
	blackList.splice(itemId, 1);
	localStorage.setItem("blackList", JSON.stringify(blackList));
}


export async function setBlindfield(blindfiels){
	if(!isObject(blindfiels)) throw new Error("setBlindfield : need blindfiels to be an object");
	if(!isArray(blindfiels.class)) throw new Error("setBlindfield : need blindfiels.class to be an array");
	if(!isArray(blindfiels.types)) throw new Error("setBlindfield : need blindfiels.types to be an array");
	
	localStorage.setItem("blindfiels", JSON.stringify(blindfiels));
	return blindfiels;
}

export function getBlindfields(){
	return JSON.parse(localStorage.getItem("blindfiels") || "[]");
}
