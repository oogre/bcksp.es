/*----------------------------------------*\
  bcksp.es - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:36:49
  @Last Modified time: 2018-05-26 00:34:58
\*----------------------------------------*/
import _ from 'underscore'
import Multi from "./Multi.inherit.js";
import UtilitiesIcon from "./utilities.icon.js";
import UtilitiesArchive from "./utilities.archive.js";
import UtilitiesBackspace from "./utilities.backspace.js";
import UtilitiesBlacklist from "./utilities.blacklist.js";


export default class Utilities extends Multi.inherit( UtilitiesIcon, UtilitiesBackspace, UtilitiesArchive, UtilitiesBlacklist ) {

	static sendMessage(action, data){
		if(!_.isEmpty(data)){
			chrome.runtime.sendMessage({
				action : action,
				data : data
			});
		}
	}

	static log(...data){
		if(true){
			console.log(data);
		}
	}
}

