/*----------------------------------------*\
  bcksp.es - index.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-21 21:10:15
  @Last Modified time: 2018-09-23 23:07:51
\*----------------------------------------*/

import $ from 'jquery';
import Utilities from '../shared/utilities.js';
import _ from 'underscore';
import Data from "../shared/Data.js";
import Protocol from "../shared/Protocol.js";

document.documentElement.setAttribute('bcksp-es-extension-installed', true);

$(document).ready(()=>{
	Utilities.sendMessage("isLogin", "true")
		.then(async (isLoggedIn) => {
			if(!isLoggedIn) throw new Error('You are not logged in, so bcksp.es in not available');
			return true;
		})
		.then(() => Utilities.sendMessage("getUrl", "true"))
		.then(async ({blackListed}) => {
			if(blackListed) throw new Error('This web site is blacklisted, so here bcksp.es in not available');
			return true;
		})
		.then(() => new BackspaceListener())
		.catch(error => Utilities.error(error));
});

class BackspaceListener{
	constructor(){
		Utilities.log("BackspaceListener initializer");
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


		Protocol.add("Highlight", target => {
			Utilities.log("Highlight");
			let content = Utilities.getHighlightText(target);
			if(_.isString(content)){
				Utilities.sendMessage("archive", content);
			}
			return content !== false;
		});

		Protocol.add("CharBeforeCaret", target => {
			Utilities.log("CharBeforeCaret");
			let content = Utilities.getCharBeforeCaret(target);
			if(_.isString(content)){
				Utilities.sendMessage("archive", content);
			}
			return content !== false;
		});

		Protocol.add("Diff", ({before, after}) =>{
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
						if(!Data.state.downFlag){
							Data.setState({
								innerText : Utilities.innerTEXT(document.querySelector(".kix-appview-editor"))
							});
						}
					},
					"googleSpreadsheets" : () => {
						if(!Data.state.downFlag){
							Data.setState({
								innerText : Utilities.innerTEXT(document.querySelector(".cell-input"))
							});
						}
					},
					"googlePresentation" : () => {
						if(!Data.state.downFlag){
							Data.setState({
								innerText : Utilities.innerTEXT(document.querySelectorAll(".panel-right text"))
							});
						}
					},
					"googleDrawings" : () => {
						if(!Data.state.downFlag){
							Data.setState({
								innerText : Utilities.innerTEXT(document.querySelectorAll("text"))
							});
						}
					},
					"default" : () => {
						if(!Protocol.exec("Highlight", event.target)){
							if(!Protocol.exec("CharBeforeCaret", event.target)){
								if(!Data.state.downFlag){
									Data.setState({
										innerText : Utilities.innerTEXT(event.target)
									});
								}
							}
						}
					}
				});
			}
			Data.setState({
				downFlag : true
			});
		}
	}
	keyUpListener(event){
		if(8 === event.keyCode ){
			Utilities.sendMessage("backspaceup", "true");
			if(!_.isEmpty(Data.state.innerText)){
				Utilities.selectProtocol({
					"googleDocument" : () => Protocol.exec("Diff", {
						before : Data.state.innerText,
						after : Utilities.innerTEXT(document.querySelector(".kix-appview-editor"))
					}),
					"googleSpreadsheets" : () => Protocol.exec("Diff", {
						before : Data.state.innerText,
						after : Utilities.innerTEXT(document.querySelector(".cell-input"))
					}),
					"googlePresentation" : () => Protocol.exec("Diff", {
						before : Data.state.innerText,
						after : Utilities.innerTEXT(document.querySelectorAll(".panel-right text"))
					}),
					"googleDrawings" : () => Protocol.exec("Diff", {
						before : Data.state.innerText,
						after : Utilities.innerTEXT(document.querySelectorAll("text"))
					}),
					"default" : () => Protocol.exec("Diff", {
						before : Data.state.innerText,
						after : Utilities.innerTEXT(event.target)
					})
				});
			}
			Data.setState({
				downFlag : false,
				innerText : "" 
			});
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