/*----------------------------------------*\
  bcksp.es - confirm.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-03 15:35:04
  @Last Modified time: 2020-02-26 17:35:19
\*----------------------------------------*/
import { Session } from "meteor/session";
import { config } from './../startup/config.js';

export async function needConfirmation(context){

	if(confirm(i18n.createTranslator("utilities")("needConfirmation"))){
		return true;
	}else{
		throw new Error("The action has been canceled");
	}
}

export function getDate(){
	const dt = new Date();
	return `${
    (dt.getMonth()+1).toString().padStart(2, '0')}-${
    dt.getDate().toString().padStart(2, '0')}-${
    dt.getFullYear().toString().padStart(4, '0')} ${
    dt.getHours().toString().padStart(2, '0')}:${
    dt.getMinutes().toString().padStart(2, '0')}:${
    dt.getSeconds().toString().padStart(2, '0')}`;
}

export function buildObjectFromStringKey(obj, is, value){
	if (typeof is == 'string')
		return buildObjectFromStringKey(obj, is.split('.'), value);
	else if (is.length==1 && value!==undefined)
		return obj[is[0]] = value;
	else if (is.length==0)
		return obj;
	else{
		obj[is[0]] = obj[is[0]] || {};
		return buildObjectFromStringKey(obj[is[0]], is.slice(1), value);
	}
}

export function isVisible(elem) {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter   = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };

    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer && (pointContainer = pointContainer.parentNode));
    return false;
}

export function mobileAndTabletcheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

export function isExtensionInstalled(){
	return document.documentElement.hasAttribute("bcksp-es-extension-installed");	
}

export function installExtension(){
	const browser = require('bowser').getParser(window.navigator.userAgent);
	switch(browser.getBrowserName()){
		case "Chrome" : 
			window.open("https://chrome.google.com/webstore/detail/"+config.devices.chrome, '_blank');
		break;
		case "Firefox" : 
			window.open("https://addons.mozilla.org/en-US/firefox/addon/bckspes/", '_blank');
		break;
	}
	return false;
}

export function setupView(){
	if(FlowRouter.current().context.hash == ""){
		$('html, body').animate({
			scrollTop: 0
		}, 666 );
	}else{
		scrollTo(FlowRouter.current().context.hash);
	}
}

export function scrollTo(hash, offset = 0){
	let h = $("#"+hash);
	if(!!h.length){
		$('html, body').animate({
			scrollTop: h.offset().top - offset
		}, 666 );
	}
}


export function errorHandler(error, setErrorMessage=()=>{}){
	if (!error){
		return false;
	}
	else if(_.isArray(error.details) && !_.isEmpty(error.details)){
		for(let e of error.details){
			if(e?.details?.origin == "main"){
				Session.set("error", {
					origin : "main",
					type : e.type, 
					value : e.details.value
				});
			}else{
				setErrorMessage(e?.details?.origin , e?.type, e?.details?.value);	
			}
		}
	}
	else if(error?.errorType == "Meteor.Error"){
		Session.set("error", {
			origin : "main",
			type : "Meteor.Error", 
			value : error.reason
		});
	}
	else if(error?.name == "Error"){
		Session.set("error", {
			origin : "main",
			type : "Error", 
			value : error.message
		});
	}else {
		Session.set("error", {
			origin : "main",
			type : "Unknow", 
			value : error.toString()
		});
	}
	return true;
}

export function successHandler({success, message, data}){
	if (!success){
		return false;
	}
	Session.set("success", message || data);
	return true;
}
