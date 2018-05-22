/*----------------------------------------*\
  bcksp.es - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-22 12:36:49
  @Last Modified time: 2018-05-23 00:26:47
\*----------------------------------------*/
import _ from 'underscore'
import diffMatchPatch from "diff-match-patch";
import Encoder from "htmlencode";

export function prefixFormat(input, base = 10){
	let table = [{
			value : Math.pow(base, 3),
			name : "kilo",
			symbol : "k"
		},{
			value : Math.pow(base, 6),
			name : "mega",
			symbol : "M"
		},{
			value : Math.pow(base, 9),
			name : "giga",
			symbol : "G"
		},{
			value : Math.pow(base, 12),
			name : "tera",
			symbol : "T"
	}];
	for(let i = table.length - 1 ; i >= 0 ; i --){
		if(input >= table[i].value){
			input /= table[i].value;
			input = input.toFixed(1);
			if(input.length > 3){
				input = input.substr(0, input.indexOf("."));
			}
			input += table[i].symbol;
			return input;
		}
	}
	return ""+Math.round(input);
}

export function getHighlightText(elem){
	let highlighted = elem.ownerDocument.getSelection().toString();
	if(_.isEmpty(highlighted)) return false;
	return highlighted.split("").reverse().join("");
};

export function getCaretPosition(elem){
	try{
		if (elem.selectionStart){
			return elem.selectionStart;
		}
		else if (elem.ownerDocument.selection){
			elem.focus();
			let r = elem.ownerDocument.selection.createRange();
			if (null === r){
				return false;
			}
			let re = elem.createTextRange();
			let rc = re.duplicate();
			re.moveToBookmark(r.getBookmark());
			rc.setEndPoint("EndToStart", re);
			return rc.text.length;
		}
	}catch(e){}
	return false;
};

export function getCharBeforeCaret(elem){
	let caretPosition = getCaretPosition(elem);
	if(!caretPosition) return false;
	return elem.value.charAt(caretPosition-1);
};

export function innerTEXT(elem){
	if("INPUT" === elem.tagName){
		return elem.value;
	}else{
		return elem.innerHTML.replace(/(<([^>]+)>)/ig, "\n");	
	}
};

export function diff(a, b){
	let diff = new diffMatchPatch();
	return diff.diff_main(a, b)
	.map(function(elem, key){
		return 1 == key ? elem[1] : null;
	}).join("");
}

export function getArchiveBuffer(){
	return localStorage.getItem("archive") || "";
}

export function clearArchiveBuffer(){
	localStorage.removeItem("archive");
}
export function decode(value){
	var marker = "-";
	return Encoder.htmlDecode(marker+""+value).substr(marker.length);
}

export function addToArchiveBuffer(data){
	data = decode(data);
    localStorage.setItem("archive", getArchiveBuffer() + data);
}
export function sendMessage(action, data){
	if(!_.isEmpty(data)){
		chrome.runtime.sendMessage({
			action : action,
			data : data
		});
	}
}
export function log(...data){
	if(true){
		console.log(data);
	}
}

export function isAcceptable(elem){
	return 		elem && (  "input" === elem.nodeName.toLowerCase()
					|| 	"textarea" === elem.nodeName.toLowerCase() 
					|| 	    "true" === elem.getAttribute("contenteditable") 
					|| 	        "" === elem.getAttribute("contenteditable") ) ; 
}

export function getTarget(defaultValue){
	switch(window.location.host){
		case "docs.google.com" : 
			return document.querySelector(".kix-appview-editor")
		break;
		default : 
			return defaultValue;
		break;
	}
}