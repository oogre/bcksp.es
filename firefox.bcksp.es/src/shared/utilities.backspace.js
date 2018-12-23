/*----------------------------------------*\
  bcksp.es - Utilities.backspace.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-25 23:56:21
  @Last Modified time: 2018-12-23 14:02:46
\*----------------------------------------*/

import { Caret } from 'caret-pos';
import _ from 'underscore';
import Data from "./Data.js";
import diffMatchPatch from "diff-match-patch";

export default class UtilitiesBackspace {
	static getHighlightText(elem){
		let caret = new Caret(elem, false);
		caret.enable(elem);
		let highlighted = caret.getSelectedText();
		if(_.isEmpty(highlighted)) return false;
		return highlighted.split("").reverse().join("");
	}

	static checkTarget(element){
  		if(!UtilitiesBackspace.isInputField(element)){
    		element = UtilitiesBackspace.getContentEditableInParent(element);
  		}
  		return element;
	}

	static getCharBeforeCaret(elem){
		let caret = new Caret(elem, false);
		caret.enable(elem);
		return caret.getCharBeforCaret() || false;
	}

	static isContentEditable(element){
		return !!(
  			element.contentEditable &&
  			element.contentEditable === 'true'
		);
	}
	static getContentEditableInParent(element){
  		if(UtilitiesBackspace.isContentEditable(element)){
  		  	return element;
  		}
  		if(element.parentElement){
    		return UtilitiesBackspace.getContentEditableInParent(element.parentElement);  
  		}
  		return false;
	}

	static isInputField(element){
  		let nodeName = element.nodeName;
  		return nodeName == 'TEXTAREA' || nodeName == 'INPUT';
	}

	static getContent(element){
  		if(element instanceof NodeList) [].slice.call(element).reduce((memo, e) => memo += UtilitiesBackspace.getContent(e), '');
  		if(! (element instanceof Element)) return '';
  		if(UtilitiesBackspace.isInputField(element)) return element.value;
  		return element.innerHTML.replace(/(<([^>]+)>)/ig, ''); 
	}

	static diff(a, b){
		let diff = new diffMatchPatch();
		let d = diff.diff_main(a, b);
		return _.chain(d).filter(elem => elem[0] == -1).reduce((memo, elem) => memo + elem[1], "").value();
	}

	static isAcceptable(elem){
		return elem 
			&& _.isArray(Data.state.blindfields.types) 
			&& _.isArray(Data.state.blindfields.class) 
			&& !Data.state.blindfields.types.includes(elem.getAttribute("type")) 
			&& _.chain(Data.state.blindfields.class).intersection(elem.className.split(" ")).isEmpty().value();
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