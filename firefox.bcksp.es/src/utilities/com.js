/*----------------------------------------*\
  bcksp.es - com.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 14:50:31
  @Last Modified time: 2019-04-16 18:42:07
\*----------------------------------------*/

import { 
	tabsQuery,
	runtimeId,
	tabsSendMessage,
	runtimeSendMessage, 
	runtimeOnMessageAddListener, 
	runtimeOnMessageRemoveListener
} from './browser.js';
import { isUndefined } from './validation.js';

let Listener = {};

export async function sendMessage(action, input){
	return runtimeSendMessage({
		action : action,
		data : input
	}).then(data=>{
		if(!data)return data;
		if(!isUndefined(data.error))throw data.error;
		if(!isUndefined(data.result))return data.result;
	});
}

export async function on(actions, cb){
	actions.split(/\W+/g).map(action=>{
		Listener[action] = Listener[action] || [];
		let listener = runtimeOnMessageAddListener((request, sender, sendResponse) => {
			if(request.action != action)return;
			if(sender.id != runtimeId())return;
			new Promise((resolve, reject) => cb(request.data, resolve, reject))
					.then(data => {
						sendResponse({result : data})
					})
					.catch(e => {
						sendResponse({
							error : { 
								name : e.name, 
								reason : e.reason,
								message : e.message, 
								details : e.details,
								errorType : e.errorType
							} 
						})
					});
			return true; //so i can use sendResponse later;
		});
		Listener[action].push(listener);
	});
}

export async function off(actions){
	actions.split(/\W+/g).map(action=>{
		runtimeOnMessageRemoveListener(Listener[action]);
		Listener[action] = [];
	});
}

export async function sendMessageToTab(action, data, tabQuery={ 'active': true, 'currentWindow': true }){
	return tabsQuery(tabQuery)
			.then(tabs => {
				tabs.map(tab =>{
					tabsSendMessage(tab.id, {action, data});
				});
			});
}