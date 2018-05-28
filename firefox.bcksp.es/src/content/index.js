/*----------------------------------------*\
  runtime-examples - content.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-28 03:12:11
  @Last Modified time: 2018-05-28 03:27:23
\*----------------------------------------*/

import $ from 'jquery';
import Utilities from '../shared/utilities.js';
import _ from 'underscore';
import Data from "../shared/Data.js";


$(document).ready(()=>{
	browser.runtime.sendMessage({
		action : "getUrl",
	}, ({url, blackListed}) => {
		if(!blackListed){
			new BackspaceListener();
		}
	});
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


		Data.protocol.add("Highlight", target => {
			Utilities.log("Highlight");
			let content = Utilities.getHighlightText(target);
			if(_.isString(content)){
				Utilities.sendMessage("archive", content);
			}
			return content !== false;
		});

		Data.protocol.add("CharBeforeCaret", target => {
			Utilities.log("CharBeforeCaret");
			let content = Utilities.getCharBeforeCaret(target);
			if(_.isString(content)){
				Utilities.sendMessage("archive", content);
			}
			return content !== false;
		});

		Data.protocol.add("Diff", ({before, after}) =>{
			Utilities.log("Diff");
			let	content;
			if(_.isEmpty(after)) content = before;
			else content = Utilities.diff(before, after);
			if(!_.isEmpty(content) && _.isString(content) ){
				Utilities.sendMessage("archive", content.split("").reverse().join(""));
			}
		});
	}
	
	keyDownListener(event){
		if(8 === event.keyCode ){
			Utilities.sendMessage("backspacing", "true");
			if(	Utilities.isAcceptable(this.activeElement) ){
				Utilities.selectProtocol({
					"googleDocument" : () => {
						if(!Data.downFlag){
							Data.innerText = Utilities.innerTEXT(document.querySelector(".kix-appview-editor"));
						}
					},
					"googleSpreadsheets" : () => {
						if(!Data.downFlag){
							Data.innerText = Utilities.innerTEXT(document.querySelector(".cell-input"));
						}
					},
					"googlePresentation" : () => {
						if(!Data.downFlag){
							Data.innerText = _.chain(
												document.querySelectorAll(".panel-right text")
											).reduce((memo, elem) => memo += Utilities.innerTEXT(elem), ""
											).value();
						}
					},
					"googleDrawings" : () => {
						if(!Data.downFlag){
							Data.innerText = _.chain(
												document.querySelectorAll("text")
											).reduce((memo, elem) => memo += Utilities.innerTEXT(elem), ""
											).value();
						}
					},
					"default" : () => {
						if(!Data.protocol.exec("Highlight", event.target)){
							if(!Data.protocol.exec("CharBeforeCaret", event.target)){
								if(!Data.downFlag){
									Data.innerText = Utilities.innerTEXT(event.target);
								}
							}
						}
					}
				});
			}
			Data.downFlag = true;
		}
	}
	keyUpListener(event){
		if(8 === event.keyCode ){
			Utilities.sendMessage("backspaceup", "true");
			if(!_.isEmpty(Data.innerText)){
				Utilities.selectProtocol({
					"googleDocument" : () => Data.protocol.exec("Diff", {
						before : Data.innerText,
						after : Utilities.innerTEXT(document.querySelector(".kix-appview-editor"))
					}),
					"googleSpreadsheets" : () => Data.protocol.exec("Diff", {
						before : Data.innerText,
						after : Utilities.innerTEXT(document.querySelector(".cell-input"))
					}),
					"googlePresentation" : () => Data.protocol.exec("Diff", {
						before : Data.innerText,
						after : _.chain(
									document.querySelectorAll(".panel-right text")
								).reduce((memo, elem) => memo += Utilities.innerTEXT(elem), ""
								).value()
					}),
					"googleDrawings" : () => Data.protocol.exec("Diff", {
						before : Data.innerText,
						after : _.chain(
									document.querySelectorAll("text")
								).reduce((memo, elem) => memo += Utilities.innerTEXT(elem), ""
								).value()
					}),
					"default" : () => Data.protocol.exec("Diff", {
						before : Data.innerText,
						after : Utilities.innerTEXT(event.target)
					})
				});
			}
			Data.downFlag = false;
			Data.innerText = "" 
		}
	}
	setupListener(target){
		if("IFRAME" ===  target.nodeName) {
			target.addEventListener("load", event => {
				try{
					this.addListeners(event.target.contentWindow.document)
				}catch(e){
					Utilities.error(e);
				}
			} , false);
		}
		else this.addListeners(document);
	}
	addListeners (element){
		element.addEventListener("keydown", this.keyDownListener, true);
		element.addEventListener("keyup", this.keyUpListener, true);	
	}
}