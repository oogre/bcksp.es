/*----------------------------------------*\
  runtime-examples - content.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-28 03:12:11
  @Last Modified time: 2018-12-23 13:49:30
\*----------------------------------------*/
import $ from 'jquery';
import _ from 'underscore';
import Data from "../shared/Data.js";
import Protocol from "../shared/Protocol.js";
import Utilities from '../shared/utilities.js';

document.documentElement.setAttribute('bcksp-es-extension-installed', true);

Utilities.on("blindfield", (data, resolve) =>{
	Data.setState({
		blindfields : data
	});
	resolve(true);
});

$(document).ready(()=>{
	Utilities.sendMessage("isLogin")
		.then(async (isLoggedIn) => {
			if(!isLoggedIn) throw new Error('You are not logged in, so bcksp.es in not available');
			return true;
		})
		.then(() => Utilities.sendMessage("getUrlStatus"))
		.then(async ({blackListed}) => {
			if(blackListed) throw new Error('This web site is blacklisted, so here bcksp.es in not available');
			return true;
		})
		.then(() => new BackspaceListener())
		.catch(error => Utilities.error(error.message));
	window.addEventListener("message", function(event) {
	    // We only accept messages from ourselves
	    if (event.source != window)
	        return;

	    if (event.data.type && (event.data.type == "login")) {
	        Utilities.sendMessage("login", event.data);
	    }
	    if (event.data.type && (event.data.type == "logout")) {
	    	Utilities.sendMessage("logout");
	    }
	});
});

class BackspaceListener{
	constructor(){
		Utilities.sendMessage("getBlindfields")
			.then(blindfields=>{
				Data.setState({
					blindfields : blindfields
				});
			});

		Utilities.log("BackspaceListener initializer");
		/*document.addEventListener("DOMSubtreeModified", event => {
			this.setupListener(event.target);
			if(event.target){
				try{
					event.target.querySelectorAll("iframe").forEach( iframe => {
						this.setupListener(iframe);
					});
				}catch(error){}
			}
		}, false);*/
		this.setupListener(document);


		Protocol.add("Highlight", target => {
			let content = Utilities.getHighlightText(target);
			if(_.isString(content)){
				Utilities.log("Highlight", content.split("").reverse().join(""));
				Utilities.sendMessage("archive", content);
			}
			return content !== false;
		});

		Protocol.add("CharBeforeCaret", target => {
			let content = Utilities.getCharBeforeCaret(target);
			if(_.isString(content)){
				Utilities.log("CharBeforeCaret", content);
				Utilities.sendMessage("archive", content);
			}
			return content !== false;
		});

		Protocol.add("Diff", ({before, after}) =>{
			let	content;
			if(_.isEmpty(after)) content = before;
			else content = Utilities.diff(before, after);
			if(!_.isEmpty(content) && _.isString(content) ){
				Utilities.log("Diff", content);
				Utilities.sendMessage("archive", content.split("").reverse().join(""));
			}
		});
	}
	
	keyDownListener(event){
		if(8 !== event.keyCode)return true;
		let target;
		if(false === (target = Utilities.checkTarget(this.activeElement))){
			Utilities.warn("Error with : "+this.activeElement);
		}
		if(!Utilities.isAcceptable(target)){
			Utilities.log("This field is not acceptable");
			return true;
		}
		
		Utilities.sendMessage("backspace");
		Utilities.selectProtocol({
			"googleDocument" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : Utilities.getContent(document.querySelector(".kix-appview-editor"))
					});
				}
			},
			"googleSpreadsheets" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : Utilities.getContent(document.querySelector(".cell-input"))
					});
				}
			},
			"googlePresentation" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : Utilities.getContent(document.querySelectorAll(".panel-right text"))
					});
				}
			},
			"googleDrawings" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : Utilities.getContent(document.querySelectorAll("text"))
					});
				}
			},
			"default" : () => {
				if(Utilities.isInputField(target)){
					if(!Protocol.exec("Highlight", target)){
						if(!Protocol.exec("CharBeforeCaret", target)){
							if(!Data.state.downFlag){
								Data.setState({
									innerText : Utilities.getContent(target)
								});
							}
						}
					}	
				}else{
					if(!Data.state.downFlag){
						Data.setState({
							innerText : Utilities.getContent(target)
						});
					}					
				}
			}
		});
		Data.setState({
			downFlag : true
		});
	}
	keyUpListener(event){
		if(8 !== event.keyCode)return true;
		if(_.isEmpty(Data.state.innerText))return true;
		let target;
		if(false === (target = Utilities.checkTarget(this.activeElement))){
			Utilities.warn("Error with : "+this.activeElement);
		}
		if(!Utilities.isAcceptable(target)){
			Utilities.log("This field is not acceptable");
			return true;
		}
		
		Utilities.sendMessage("backspace");
		Utilities.selectProtocol({
			"googleDocument" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : Utilities.getContent(document.querySelector(".kix-appview-editor"))
			}),
			"googleSpreadsheets" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : Utilities.getContent(document.querySelector(".cell-input"))
			}),
			"googlePresentation" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : Utilities.getContent(document.querySelectorAll(".panel-right text"))
			}),
			"googleDrawings" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : Utilities.getContent(document.querySelectorAll("text"))
			}),
			"default" : () => {
				Protocol.exec("Diff", {
					before : Data.state.innerText,
					after : Utilities.getContent(target)
				})
			}
		});
		Data.setState({
			downFlag : false,
			innerText : "" 
		});
	}
	setupListener(target){
		this.addListeners(document);
	}
	addListeners (element){
		element.addEventListener("keydown", this.keyDownListener, true);
		element.addEventListener("keyup", this.keyUpListener, true);	
	}
}
