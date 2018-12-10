/*----------------------------------------*\
  bcksp.es - utilities.blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 00:11:16
  @Last Modified time: 2018-12-10 16:33:32
\*----------------------------------------*/
import _ from 'underscore';

export default class UtilitiesBlacklist {
	
	static getIntoBlackList(url){
		let blackList = JSON.parse(localStorage.getItem("blackList") || "[]");
		for(let i = 0 ; i < blackList.length ; i++){
			if(blackList[i] == url){
				return i;
			}
		}
		return false;
	}

	static getBlindfields(){
		return JSON.parse(localStorage.getItem("blindfiels") || "[]");
	}

	static async setBlackList(urls){
		if(!_.isArray(urls)) throw new Error("setBlackList : need array as parameter");
		let oldBlackList = JSON.parse(localStorage.getItem("blackList") || "[]");

		let blackliststed = _.difference(urls, oldBlackList);
		let whiteliststed = _.difference(oldBlackList, urls);

		localStorage.setItem("blackList", JSON.stringify(urls));
		
		return _.chain(blackliststed)
			.union(whiteliststed)
			.uniq()
			.value();
	}

	static async setBlindfield(blindfiels){
		if(!_.isObject(blindfiels)) throw new Error("setBlindfield : need blindfiels to be an object");
		if(!_.isArray(blindfiels.class)) throw new Error("setBlindfield : need blindfiels.class to be an array");
		if(!_.isArray(blindfiels.types)) throw new Error("setBlindfield : need blindfiels.types to be an array");
		
		localStorage.setItem("blindfiels", JSON.stringify(blindfiels));
		return blindfiels;
	}

	static removeToBlackList(url){
		let blackList = JSON.parse(localStorage.getItem("blackList") || "[]");
		let itemId = UtilitiesBlacklist.getIntoBlackList(url);
		if(itemId === false) return;
		blackList.splice(itemId, 1);
		localStorage.setItem("blackList", JSON.stringify(blackList));
	}
}