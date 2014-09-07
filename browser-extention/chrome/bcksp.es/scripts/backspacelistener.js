var BCKSPES;

(function(){
	"use strict";
	/*global $:false */
	/*global chrome:false */
	/*global window:false */
	/*global NodeList:false */
	/*global StringStream:false */
	/*global diff_match_patch:false */

	NodeList.prototype.map = function(fnc){
		return Array.prototype.slice.call(this).map(fnc);
	};

	BCKSPES = (function(){
		var _privacySettings = {};
		var _backspaced;
		var _screenBeforeBackspace;
		var _stream = new StringStream()
				.setSender(function(elem){
					chrome.runtime.sendMessage({
						action : "send",
						char : elem
					});
				});
		var _diff = new diff_match_patch();

		var _innerTEXT = function(elem){
			if("INPUT" === elem.tagName){
				return elem.value;
			}else{
				return elem.innerHTML.replace(/(<([^>]+)>)/ig, "\n");	
			}
		};

		var _getCaretPosition = function(elem){
			try{
				if (elem.selectionStart){
					return elem.selectionStart;
				}
				else if (elem.ownerDocument.selection){
					elem.focus();
					var r = elem.ownerDocument.selection.createRange();
					if (null === r){
						return false;
					}
					var re = elem.createTextRange();
					var rc = re.duplicate();
					re.moveToBookmark(r.getBookmark());
					rc.setEndPoint("EndToStart", re);
					return rc.text.length;
				}
			}catch(e){

			}
			return false;
		};

		// Gets the high lighted text
		var _getHighlightText = function(elem){
			var highlighted = elem.ownerDocument.getSelection();
			_backspaced =highlighted.toString();
			_stream.add(_backspaced ? _backspaced.split("").reverse().join("") : "");
			if(_backspaced){
				window.console.log("get highLight text");
			}
			return _backspaced;
		};

		//Get the character before the cursor
		var _getCharBeforeCaret = function(elem){
			var caretPosition = _getCaretPosition(elem);
			_backspaced = caretPosition && elem.value.charAt(caretPosition-1);
			_stream.add(_backspaced ? _backspaced : "");
			if(_backspaced){
				window.console.log("get character before caret");
			}
			return _backspaced;
		};

		//Get a screen of activeElement
		var _getScreenBeforeBackspace = function(elem){
			_screenBeforeBackspace = _innerTEXT(elem);
			return false;
		};

		var _getBackspaced = function(elem){
			//If passed by getScreenBeforeBackspace()
			if(_screenBeforeBackspace){
				// Math the difference between screenBeforeBackspace and curent screen of activeElement
				var screenAfterBackspace = _innerTEXT(elem);
				_backspaced = ("" === screenAfterBackspace) ? _screenBeforeBackspace : _diff.diff_main(_screenBeforeBackspace, screenAfterBackspace).map(function(elem, key){
					return 1 == key ? elem[1] : null;
				}).join("");
				_backspaced = _backspaced.split("").reverse().join("");
				_stream.add(_backspaced ? _backspaced : "");
				if(_backspaced){
					window.console.log("get difference between before and after backspace");
				}
				_screenBeforeBackspace = undefined;
			}
			return _stream;
		};

		var _canListenToHere = function(elem){
			var id = ((elem.getAttribute("type") || "")+(elem.getAttribute("name") || "")+(elem.getAttribute("id") || "")+(elem.getAttribute("placeholder") || "")).toLowerCase();
			if(!_privacySettings.appConfig.captureEmail && id.replace(/\-|\_|\ /g, "").match("email")){
				return false;
			}
			if(!_privacySettings.appConfig.capturePassword && id.replace(/\-|\_|\ /g, "").match("password")) {
				return false;
			}
			if(_privacySettings.appConfig.captureBlacklist.indexOf(window.location.hostname.replace(/www\./, ""))>-1){
				return false;
			}
			return true;
		};

		var _keyDownListener = function(event){
			// CTRL + BCKSP !! PC
			// ALT + BCKSP / CMD + BCKSP  !! MAC
			if(8 === event.keyCode ){
				var activeElement = this.activeElement;
				if(_canListenToHere(event.target) && activeElement && ("input" === activeElement.nodeName.toLowerCase() || "textarea" === activeElement.nodeName.toLowerCase() || "true" === activeElement.getAttribute("contenteditable") || "" === activeElement.getAttribute("contenteditable"))){
					if(!_getHighlightText(event.target)){
						if(!_getCharBeforeCaret(event.target)){
							_getScreenBeforeBackspace(event.target);
						}
					}
					chrome.runtime.sendMessage({
						action :  "backspacing"
					});
				}
				//else{
			//		event.preventDefault();
			//	}
				//return handle;
			}
		};

		var _keyUpListener = function(event){
			if(8 === event.keyCode){
				if(_canListenToHere(event.target)){
					_getBackspaced(event.target).send();
					if(_backspaced){
						window.console.log("backspaced : \n"+_backspaced);
						_backspaced = undefined;
					}
				}
			}
		};
		return {
			privacySettings : function(data){
				if(undefined == data){
					return _privacySettings;
				}
				else{
					data.appConfig.captureBlacklist = data.appConfig.captureBlacklist.split(", ");
					_privacySettings = data;
					return data;	
				}
			},
			keyDownListener : _keyDownListener,
			keyUpListener : _keyUpListener
		};
	}());

	var splashScreens = [
		$.Deferred(),
		function( /* OUTLOOK - HOTMAIL */ ){
			var deferred = $.Deferred();
			var elem = document.querySelector(".AppInner #Curtain");
			if(elem){
				var wait = setInterval(function(){
					if("none" === elem.style.display){
						clearInterval(wait);
						deferred.resolve();
					}
				}, 500);
			}else{
				deferred.resolve();
			}
			return deferred.promise();
		}()
		/* ADD HERE SPECIAL CONDITION TO BE READY */

		/* IFRAME GOOGLE TASK / GMAIL */
	];
	splashScreens.ready = function(fnc){
		$.when.apply($, this).done(function(){
			fnc();
		});
	};
	$(document).ready(function(){
		splashScreens[0].resolve();	
	});
	
	var setupListener = function(target){
		if("IFRAME" ===  target.nodeName){
				try{
						target.contentWindow.document.addEventListener("keydown", BCKSPES.keyDownListener, true);
						target.contentWindow.document.addEventListener("keyup", BCKSPES.keyUpListener, true);
						target.addEventListener("load", function(event) {
								target.contentWindow.document.addEventListener("keydown", BCKSPES.keyDownListener, true);
								target.contentWindow.document.addEventListener("keyup", BCKSPES.keyUpListener, true);
						}, false);
				}catch(e){
				}
		}else{
			document.addEventListener("keydown", BCKSPES.keyDownListener, true);
			document.addEventListener("keyup", BCKSPES.keyUpListener, true);
		}
	};

	var initListeners = function (){
		document.addEventListener("DOMSubtreeModified", function(event) {
			setupListener(event.target);
			if(event.target){
				try{
					var iframes = event.target.querySelectorAll("iframe");
					if(iframes){
						iframes.map(function(iframe){
							setupListener(iframe);
						});
					}
				}catch(error){}
			}
		}, false);
	};

	var init = function(){
		splashScreens.ready(function(){
			initListeners();

			chrome.runtime.sendMessage({
				action : "bckspesready"
			}, function(data){
				BCKSPES.privacySettings(data.data);
				console.log(BCKSPES.privacySettings());
			});
			console.log("bcksp.es - ready");
		});
	};

	$(document).ready(init);


	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if(!sender.tab && request.action == "updatePrivacySettings"){
				BCKSPES.privacySettings(request.data);
				console.log(BCKSPES.privacySettings());
			}
	});


}());
