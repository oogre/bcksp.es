/*----------------------------------------*\
  bcksp.es - tools.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 15:38:28
  @Last Modified time: 2020-01-29 11:24:02
\*----------------------------------------*/

import _T from 'i18n-react';
import { config } from './../shared/config.js';
import { isContentEditable, isInputField, isArray, isEmpty } from "./validation.js";
import { sendMessage } from './com.js';

sendMessage("getTranslation")
.then(data => {
    _T.setTexts(JSON.parse(data), { MDFlavor: 1 });
});

export { filter, reduce, intersection, last, findWhere, difference, uniq, mapObject } from 'underscore';

export const T = _T;


export function getContentEditableInParent(element){
	if(isContentEditable(element)){
	  	return element;
	}
	if(element.parentElement){
		return getContentEditableInParent(element.parentElement);  
	}
	return false;
}

export function getContent(element){
    if(element instanceof element.ownerDocument.defaultView.NodeList) [].slice.call(element).reduce((memo, e) => memo += getContent(e), '');
    if(! (element instanceof element.ownerDocument.defaultView.Element)) return '';
	if(isInputField(element)) return element.value;
	return element.innerText; 
    //return element.innerHTML.replace(/(<([^>]+)>)/ig, ''); 
}

export function handleError(error){
    if(isArray(error.details) && !isEmpty(error.details)){
        return error.details.map(e=>e.details.value).join(", ");
    }
    else if(error.errorType == "Meteor.Error"){
        switch(error.reason){
            case "Email already exists.":
                error.reason = T.translate("errors.email.already-exists");
            break;
            case "Incorrect password":
                error.reason = T.translate("errors.password.wrong");
            break;
            case "User not found":
                error.reason = T.translate("errors.email.no-match");
            break;
            default:
                error.reason = "REPORT THIS TO DEV : Meteor.Error - " + error.reason
            break;
        }
        return error.reason;
    }
    else if(error.name == "Error"){
        return "REPORT THIS TO DEV : Error - " + error.message;
    }
    else{
        return "REPORT THIS TO DEV : " + error.toString();
    }
}