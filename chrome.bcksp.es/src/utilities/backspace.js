/*----------------------------------------*\
  bcksp.es - backspoace.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 15:31:41
  @Last Modified time: 2019-03-10 20:20:28
\*----------------------------------------*/
import { Caret } from 'caret-pos';
import { error } from "./log.js";
import diffMatchPatch from "diff-match-patch";
import { isContentEditable, isInputField, checkTarget, checkString, checkFunction } from "./validation.js";
import { filter, reduce } from './tools';

export function getHighlightText(elem){
	let caret = new Caret(elem, false);
	caret.enable(elem);
	let highlighted = caret.getSelectedText();
	checkString(highlighted);
	return highlighted.split("").reverse().join("");
}

export function getCharBeforeCaret(elem){
	let caret = new Caret(elem, false);
	caret.enable(elem);
	let charBeforeCaret = caret.getCharBeforCaret();
	checkString(charBeforeCaret);
	return charBeforeCaret;
}

export function diff(a, b){
	let diff = new diffMatchPatch();
	let d = diff.diff_main(a, b);
	return reduce(filter(d, elem => elem[0] == -1), (memo, elem) => memo + elem[1], "");
}

export function specialCase(obj){
	let name;
	try{
		name = checkString(getCaseName());
	}catch(e){
		name = "default";
	}
	try{
		let action = checkFunction(obj[name]);
		action();
	}catch(e){
		error(e);
	}
}

function getCaseName(){
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
	return data.reduce((acc, e) =>{
		if(e.regExp.test(location)){
			acc.push(e.name)
		}
		return acc;
	}, [])[0];
}