/*----------------------------------------*\
  bcksp.es - utilities.blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 00:11:16
  @Last Modified time: 2018-05-26 00:23:43
\*----------------------------------------*/

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

	static addToBlackList(url){
		let blackList = JSON.parse(localStorage.getItem("blackList") || "[]");
		if(UtilitiesBlacklist.getIntoBlackList(url) !== false) return;
		blackList.push(url);
		localStorage.setItem("blackList", JSON.stringify(blackList));
	}

	static removeToBlackList(url){
		let blackList = JSON.parse(localStorage.getItem("blackList") || "[]");
		let itemId = UtilitiesBlacklist.getIntoBlackList(url);
		if(itemId === false) return;
		blackList.splice(itemId, 1);
		localStorage.setItem("blackList", JSON.stringify(blackList));
	}
}