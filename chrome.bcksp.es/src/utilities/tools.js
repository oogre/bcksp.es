/*----------------------------------------*\
  bcksp.es - tools.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 15:38:28
  @Last Modified time: 2019-04-18 15:56:35
\*----------------------------------------*/

import { config } from './../shared/config.js';
import { isContentEditable, isInputField, isArray, isEmpty } from "./validation.js";
export { filter, reduce, intersection, last, findWhere, difference, uniq, mapObject } from 'underscore';

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

export function getMessageFromError(error){
    console.log(error);
	if(isArray(error.details) && !isEmpty(error.details)){
        console.log(1);
		return error.details.map(e=>e.details.value).join(", ");
	}
	if(error.errorType == "Meteor.Error"){
        console.log(2);
		return error.reason;
	}
	if(error.name == "Error"){
        console.log(3);
		return error.message;
	}
    console.log(4);
	return error.toString();
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

export function jQuery( selector, context ) {}

let rootjQuery;
let readyBound = false;
let readyList = [];
let DOMContentLoaded;

jQuery.fn = {
    ready: function( fn ) {
        jQuery.bindReady();
        if ( jQuery.isReady ) {
            fn.call( document, jQuery );
        } else if ( readyList ) {
            readyList.push( fn );
        }
        return this;
    }
};
jQuery.isReady = false;
jQuery.ready = function() {
        if ( !jQuery.isReady ) {
            if ( !document.body ) {
                return setTimeout( jQuery.ready, 13 );
            }
            jQuery.isReady = true;
            if ( readyList ) {
                var fn, i = 0;
                while ( (fn = readyList[ i++ ]) ) {
                    fn.call( document, jQuery );
                }
                readyList = null;
            }
        }
    };
jQuery.bindReady = function() {
        if ( readyBound ) {
            return;
        }
        readyBound = true;

        if ( document.readyState === "complete" ) {
            return jQuery.ready();
        }
        if ( document.addEventListener ) {
            document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            window.addEventListener( "load", jQuery.ready, false );
        } else if ( document.attachEvent ) {

            document.attachEvent("onreadystatechange", DOMContentLoaded);
            window.attachEvent( "onload", jQuery.ready );

            var toplevel = false;
            try {
                toplevel = window.frameElement == null;
            } catch(e) {}
            if ( document.documentElement.doScroll && toplevel ) {
                doScrollCheck();
            }
        }
    };
rootjQuery = jQuery(document);
if ( document.addEventListener ) {
    DOMContentLoaded = function() {
        document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
        jQuery.ready();
    };
} else if ( document.attachEvent ) {
    DOMContentLoaded = function() {
        if ( document.readyState === "complete" ) {
            document.detachEvent( "onreadystatechange", DOMContentLoaded );
            jQuery.ready();
        }
    };
}
function doScrollCheck() {
    if ( jQuery.isReady ) {
        return;
    }
    try {

        document.documentElement.doScroll("left");
    } catch(e) {
        setTimeout( doScrollCheck, 1 );
        return;
    }
    jQuery.ready();
}

