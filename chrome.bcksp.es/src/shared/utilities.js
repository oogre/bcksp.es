/*----------------------------------------*\
  bcksp.es - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:36:49
  @Last Modified time: 2018-05-26 00:23:48
\*----------------------------------------*/
import _ from 'underscore'
import UtilitiesIcon from "./utilities.icon.js";


export default class Utilities extends UtilitiesIcon {

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

