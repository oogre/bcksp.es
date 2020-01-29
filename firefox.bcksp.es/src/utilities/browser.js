/*----------------------------------------*\
  bcksp.es - browser.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 14:29:49
  @Last Modified time: 2019-06-08 17:37:55
\*----------------------------------------*/
import { isNull, isUndefined } from 'underscore';

export async function tabsQuery(req){
	return browser.tabs.query(req);
}

export async function tabsReload(req){
	return browser.tabs.reload(req);	
}

export async function tabsUpdate(req){
	return browser.tabs.update(req);	
}

export async function tabsCreate(req){
	return browser.tabs.create(req);	
}

export async function tabsHighlight(req){
	return browser.tabs.highlight(req);
}

export async function tabsOnActivatedAddListener(req){
	return browser.tabs.onActivated.addListener(req);
}

export async function tabsSendMessage(id, req){
	return browser.tabs.sendMessage(id, req)
	.catch(error => {
		return new Promise((resolve, reject) => {
			return reject({
				origin : "tabsSendMessage",
				tabId : id,
				request : req,
				error : runtimeLastError()
			});
		});
	});
}

export async function browserActionSetIcon(req){
	return browser.browserAction.setIcon(req);
}

export function browserActionOnClickAddListener(req){
	return browser.browserAction.onClicked.addListener(req);
}

export function runtimeId(){
	return browser.runtime.id;
}

export function runtimeLastError(){
	return browser.runtime.lastError;
}

export function runtimeGetURL(file){
	return browser.runtime.getURL(file)
}

export async function runtimeSendMessage(req){
	return browser.runtime.sendMessage(req)
	.catch(error => {
		return new Promise((resolve, reject) => {
			return reject({
				origin : "runtimeSendMessage",
				request : req,
				error : runtimeLastError()
			});
		});
	});
}

export function runtimeSetUninstallURL(url){
	return browser.runtime.setUninstallURL(url);
}

export function runtimeOnInstalledAddListener(req){
	return browser.runtime.onInstalled.addListener(req);
}

export function runtimeOnMessageAddListener(req){
	return browser.runtime.onMessage.addListener(req);
}

export function runtimeOnMessageRemoveListener(req){
	return browser.runtime.onMessage.removeListener(req);
}	