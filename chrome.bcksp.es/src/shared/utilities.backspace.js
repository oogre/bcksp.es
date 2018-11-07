/*----------------------------------------*\
  bcksp.es - Utilities.backspace.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-25 23:56:21
  @Last Modified time: 2018-11-07 16:23:13
\*----------------------------------------*/
import diffMatchPatch from "diff-match-patch";
import _ from 'underscore';
import Data from "./Data.js";

export default class UtilitiesBackspace {
	static getHighlightText(elem){
		let highlighted = elem.ownerDocument.getSelection().toString();
		if(_.isEmpty(highlighted)) return false;
		return highlighted.split("").reverse().join("");
	}

	static getCaretPosition(elem){
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
	}

	static getCharBeforeCaret(elem){
		let caretPosition = UtilitiesBackspace.getCaretPosition(elem);
		if(!caretPosition) return false;
		return elem.value.charAt(caretPosition-1);
	}

	static innerTEXT(elem){
		if(elem instanceof NodeList) return _.chain(elem).reduce((memo, e) => memo += UtilitiesBackspace.innerTEXT(e), "").value();
		if(! (elem instanceof Element)) return "";
		if("input" === elem.tagName.toLowerCase()) return elem.value;
		return elem.innerHTML.replace(/(<([^>]+)>)/ig, "");	
	}

	static diff(a, b){
		let diff = new diffMatchPatch();
		let d = diff.diff_main(a, b);
		return _.chain(d).filter(elem => elem[0] == -1).reduce((memo, elem) => memo + elem[1], "").value();
	}

	static isAcceptable(elem){
		let acceptable = elem && (  
							"input" === elem.nodeName.toLowerCase() ||
							"textarea" === elem.nodeName.toLowerCase()  ||
							"true" === elem.getAttribute("contenteditable") ||
							"" === elem.getAttribute("contenteditable") 
						) &&
						_.isArray(Data.state.blindfields.types) &&
						_.isArray(Data.state.blindfields.class) &&
						!Data.state.blindfields.types.includes(elem.getAttribute("type")) &&
						_.chain(Data.state.blindfields.class).intersection(elem.className.split(" ")).isEmpty().value();
		!acceptable && console.log("bcksp.es", "this field is not acceptable");
		return acceptable;
	}

	static getTarget(defaultValue){
		switch(window.location.host){
			case "docs.google.com" : 
				return document.querySelector(".kix-appview-editor")
			break;
			default : 
				return defaultValue;
			break;
		}
	}
	static selectProtocol(obj){
		if(!_.isObject(obj)) return;
		let name = UtilitiesBackspace.getProtocolName();
		if(!_.isString(name)) name = "default";
		if(!_.isFunction(obj[name])) return;
		obj[name]();
	}

	static getProtocolName(){
		let location = window.location.toString();
		let data = [{
			regExp : /docs\.google\.com\/document/,
			name : "googleDocument"
		}, {
			regExp : /docs\.google\.com\/spreadsheets/,
			name : "googleSpreadsheets"
		}, {
			regExp : /docs\.google\.com\/presentation/,
			name : "googlePresentation"
		}, {
			regExp : /docs\.google\.com\/drawings/,
			name : "googleDrawings"
		}, {
			regExp : /.*/,
			name : "default"
		}];
		return _.chain(
					data
				).find(elem => elem.regExp.test(location)
				).pick("name"
				).values(
				).first(
				).value();
	}
}