/*----------------------------------------*\
  bcksp.es - index.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-21 21:10:15
  @Last Modified time: 2018-05-23 18:50:04
\*----------------------------------------*/
import $ from 'jquery';
import * as Utilities from '../shared/utilities.js';
import _ from 'underscore';
import Data from "../shared/Data.js";

$(document).ready(()=>{
	new BackspaceListener();
});

class BackspaceListener{
	constructor(){
		document.addEventListener("DOMSubtreeModified", event => {
			this.setupListener(event.target);
			if(event.target){
				try{
					event.target.querySelectorAll("iframe").forEach( iframe => {
						this.setupListener(iframe);
					});
				}catch(error){}
			}
		}, false);

		Data.protocol.add("default", target => {
			if(!Data.protocol.exec("Highlight", target)){
				if(!Data.protocol.exec("CharBeforeCaret", target)){
					Data.protocol.exec("BrutCopy", target)
				}
			}
		});

		Data.protocol.add("Highlight", target => {
			let content = Utilities.getHighlightText(target);
			if(_.isString(content)){
				Utilities.sendMessage("archive", content);
			}
			return content !== false;
		});

		Data.protocol.add("CharBeforeCaret", target => {
			let content = Utilities.getCharBeforeCaret(target);
			if(_.isString(content)){
				Utilities.sendMessage("archive", content);
			}
			return content !== false;
		});

		Data.protocol.add("BrutCopy", target =>{
			if(!Data.downFlag){
				Data.innerText = Utilities.innerTEXT(target);
				Data.downFlag = true;
			}
		});
	}
	
	keyDownListener(event){
		if(8 === event.keyCode ){
			Utilities.sendMessage("backspacing", "true");
			if(	Utilities.isAcceptable(this.activeElement) ){
				switch(window.location.host){
					case "docs.google.com" : 
						return Data.protocol.exec("BrutCopy", document.querySelector(".kix-appview-editor"))
					break;
					default : 
						return Data.protocol.exec("default", event.target);
					break;
				}
			}
		}
	}
	keyUpListener(event){
		if(8 === event.keyCode ){
			Utilities.sendMessage("backspaceup", "true");
			Data.downFlag = false;
			if(!_.isEmpty(Data.innerText)){
				let afterInnerText = Utilities.innerTEXT(Utilities.getTarget(event.target));
				let content;
				if(_.isEmpty(afterInnerText)){
					content = Data.innerText;
				}else{
					content = Utilities.diff(Data.innerText, afterInnerText);
				}
				content = content.split("").reverse().join("");
				Utilities.sendMessage("archive", content.replace(/&nbsp;/g, " "));
			}
			Data.innerText = "" 
		}
	}
	setupListener(target){
		if("IFRAME" ===  target.nodeName){
			try{
				this.addListeners(target.contentWindow.document);
				target.addEventListener("load", event => {
					this.addListeners(target.contentWindow.document);
				}, false);
			}catch(e){}
		}else{
			this.addListeners(document);
		}
	}
	addListeners (element){
		element.addEventListener("keydown", this.keyDownListener, true);
		element.addEventListener("keyup", this.keyUpListener, true);
	}
}