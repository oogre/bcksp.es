/*----------------------------------------*\
  bcksp.es - utilities.archive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 00:08:27
  @Last Modified time: 2018-05-26 00:23:07
\*----------------------------------------*/

import Encoder from "htmlencode";
import UtilitiesBlacklist from "./utilities.blacklist.js";

export default class UtilitiesArchive extends UtilitiesBlacklist{


	static addToArchiveBuffer(data){
	    localStorage.setItem("archive", UtilitiesArchive.getArchiveBuffer() + UtilitiesArchive.decode(data));
	}

	static getArchiveBuffer(){
		return localStorage.getItem("archive") || "";
	}

	static clearArchiveBuffer(){
		localStorage.removeItem("archive");
	}

	static decode(value){
		var marker = "-";
		return Encoder.htmlDecode(marker+""+value).substr(marker.length);
	}
}