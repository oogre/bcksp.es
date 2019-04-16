/*----------------------------------------*\
  runtime-examples - content.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-28 03:12:11
  @Last Modified time: 2019-04-16 18:45:14
\*----------------------------------------*/
import Data from "./../utilities/Data.js";
import Protocol from "./../utilities/Protocol.js";
import { on, sendMessage } from './../utilities/com.js';
import { getContent, jQuery } from './../utilities/tools.js';
import { log, info, warn, error } from './../utilities/log.js';
import { runtimeId, runtimeGetURL } from './../utilities/browser.js';
import { diff, getHighlightText, getCharBeforeCaret, specialCase } from './../utilities/backspace.js';
import { checkString, checkTarget, isAcceptable, isInputField, isEmpty } from './../utilities/validation.js';
var iframe;
document.documentElement.setAttribute('bcksp-es-extension-installed', true);

function openPopup(){
	iframe = document.createElement('iframe');
	// Must be declared at web_accessible_resources in manifest.json
	iframe.src = runtimeGetURL('popup.html');
	iframe.name = iframe.id = "bcksp_es_frame";

	// Some styles for a fancy sidebar
	iframe.style.cssText = 	"position:fixed;"+
							"top:10px;"+
							"right:10px;"+
							"display:block;"+
							"width:300px;"+
							"height:400px;"+
							"z-index:100000;"+
							"background-color:#fff;";
	document.body.appendChild(iframe);
}

function closePopup(){
	iframe.parentNode.removeChild(iframe);
	iframe = null;
}

on("closePopup", (data, resolve) =>{
	if(window != window.top)return;
	closePopup();
});

on("openPopup", (data, resolve) =>{
	if(window != window.top)return;
	if(iframe){
		closePopup();
	}else{
		openPopup();	
	}
	resolve(true);
});
on("blindfield", (data, resolve) =>{
	Data.setState({
		blindfields : data
	});
	resolve(true);
});

jQuery.fn.ready(() => {
	sendMessage("isLogin")
	.then(async (isLoggedIn) => {
		if(!isLoggedIn) throw new Error('You are not logged in, so bcksp.es in not available');
		return true;
	})
	.then(() => sendMessage("getUrlStatus"))
	.then(async ({blackListed}) => {
		if(blackListed) throw new Error('This web site is blacklisted, so here bcksp.es in not available');
		return true;
	})
	.then(() => new BackspaceListener())
	.catch(e => error(e.message));

	window.addEventListener("message", function(event) {
	    // We only accept messages from ourselves
	    if (event.source != window)
	        return;

	    if (event.data.type && (event.data.type == "login")) {
	        sendMessage("login", event.data)
			.then(data => info(data))
			.catch(e => info(e.message));;
	    }
	    if (event.data.type && (event.data.type == "logout")) {
	    	sendMessage("logout")
			.then(data => info(data))
			.catch(e => info(e.message));;
	    }
	});
});

class BackspaceListener{
	constructor(){
		sendMessage("getBlindfields")
		.then(blindfields=>{
			Data.setState({
				blindfields : blindfields
			});
		});
		log("BackspaceListener initializer");
		this.setupListener(document);
		Protocol.add("Highlight", target => {
			try{
				let content = getHighlightText(target);
				log("Highlight", content.split("").reverse().join(""));
				
				sendMessage("archive", content)
				.then(data => info(data))
				.catch(e => info(e.message));
				
				return true;
			}catch(e){
				return false;
			}
		});
		Protocol.add("CharBeforeCaret", target => {
			try{
				let content = getCharBeforeCaret(target);
				log("CharBeforeCaret", content);
				
				sendMessage("archive", content)
				.then(data => info(data))
				.catch(e => info(e.message));
				
				return true;
			}catch(e){
				return false;
			}
		});
		Protocol.add("Diff", ({before, after}) =>{
			let	content = isEmpty(after) ? before : diff(before, after);
			try{
				checkString(content)
				log("Diff", content);

				sendMessage("archive", content.split("").reverse().join(""))
				.then(data => info(data))
				.catch(e => info(e.message));
				
				return true;
			}catch(e){
				return false;
			}
		});
	}
	
	keyDownListener(event){
		if(8 !== event.keyCode)return true;
		let target;
		
		if(false === (target = checkTarget(this.activeElement))){
			warn("Error with : " + this.activeElement);
		}

		if(!isAcceptable(target)){
			log("This field is not acceptable");
			return true;
		}

		sendMessage("backspace")
		.then(data => info(data))
		.catch(e => info(e.message));

		specialCase({
			"googleDocument" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : getContent(document.querySelector(".kix-appview-editor"))
					});
				}
			},
			"googleSpreadsheets" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : getContent(document.querySelector(".cell-input"))
					});
				}
			},
			"googlePresentation" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : getContent(document.querySelectorAll(".panel-right text"))
					});
				}
			},
			"googleDrawings" : () => {
				if(!Data.state.downFlag){
					Data.setState({
						innerText : getContent(document.querySelectorAll("text"))
					});
				}
			},
			"default" : () => {
				if(isInputField(target)){
					if(!Protocol.exec("Highlight", target)){
						if(!Protocol.exec("CharBeforeCaret", target)){
							if(!Data.state.downFlag){
								Data.setState({
									innerText : getContent(target)
								});
							}
						}
					}	
				}else{
					if(!Data.state.downFlag){
						Data.setState({
							innerText : getContent(target)
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
		
		if(isEmpty(Data.state.innerText)){
			Data.setState({
				downFlag : false,
			});
			return true;
		}

		let target;
		if(false === (target = checkTarget(this.activeElement))){
			warn("Error with : "+this.activeElement);
			Data.setState({
				downFlag : false,
			});
		}

		if(!isAcceptable(target)){
			log("This field is not acceptable");
			Data.setState({
				downFlag : false,
			});
			return true;
		}

		sendMessage("backspace")
		.then(data => info(data))
		.catch(e => info(e.message));
		specialCase({
			"googleDocument" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(document.querySelector(".kix-appview-editor"))
			}),
			"googleSpreadsheets" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(document.querySelector(".cell-input"))
			}),
			"googlePresentation" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(document.querySelectorAll(".panel-right text"))
			}),
			"googleDrawings" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(document.querySelectorAll("text"))
			}),
			"default" : () => Protocol.exec("Diff", {
				before : Data.state.innerText,
				after : getContent(target)
			})
		});
		Data.setState({
			downFlag : false,
			innerText : "" 
		});
	}
	setupListener(target){
		this.addListeners(target);
		/*let self = this;
		try{
			target.querySelectorAll("iframe")
			.forEach(iframe => {
				try{
					iframe.contentWindow.document.addEventListener("keydown", self.keyDownListener, true);
					iframe.contentWindow.document.addEventListener("keyup", self.keyUpListener, true);
					iframe.addEventListener("load", function(event) {
							iframe.contentWindow.document.addEventListener("keydown", self.keyDownListener, true);
							iframe.contentWindow.document.addEventListener("keyup", self.keyUpListener, true);
					}, false);
				}catch(e){}
			});
		}catch(e){}*/
	}
	addListeners (element){
		element.addEventListener("keydown", this.keyDownListener, true);
		element.addEventListener("keyup", this.keyUpListener, true);	
	}
}
