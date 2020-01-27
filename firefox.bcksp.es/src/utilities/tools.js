/*----------------------------------------*\
  bcksp.es - tools.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 15:38:28
  @Last Modified time: 2020-01-26 22:24:42
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

export async function getTranslation(){
    return new Promise((resolve, reject) => {
        var xhr = (window.XMLHttpRequest) ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open("GET", config.getTranslationUrl(), true);
        xhr.onload = () => {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    try{
                        let txt = xhr.responseText.replace("(Package['universe:i18n'].i18n).addTranslations(", "");
                        let tmp = txt.split(",");
                        let lang = tmp.shift();
                        txt = tmp.join(",");
                        txt = txt.substr(0, txt.length-2);
                        txt = JSON.parse(txt);
                        resolve(txt);    
                    }catch(e){
                        reject(e)    
                    }
                }else{
                    reject(xhr)
                }
            }
        };
        xhr.onerror = error => reject(error);
        xhr.send(null);
    });
}