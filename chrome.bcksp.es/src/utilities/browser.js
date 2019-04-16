/*----------------------------------------*\
  bcksp.es - browser.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 14:29:49
  @Last Modified time: 2019-04-16 17:44:05
\*----------------------------------------*/
export async function tabsQuery(req){
	return new Promise(resolve => chrome.tabs.query(req, tabs=>resolve(tabs)));
}

export async function tabsReload(req){
	return new Promise(resolve => chrome.tabs.reload(req, ()=>resolve()));	
}

export async function tabsUpdate(req){
	return new Promise(resolve => chrome.tabs.update(req, ()=>resolve()));	
}

export async function tabsCreate(req){
	return new Promise(resolve => chrome.tabs.create(req, ()=>resolve()));	
}

export async function tabsHighlight(req){
	return new Promise(resolve => chrome.tabs.highlight(req, ()=>resolve()));	
}

export function tabsOnActivatedAddListener(req){
	return chrome.tabs.onActivated.addListener(req);
}

export async function tabsSendMessage(id, req){
	return new Promise(resolve => chrome.tabs.sendMessage(id, req, ()=>resolve()));	
}

export async function browserActionSetIcon(req){
	return new Promise(resolve => chrome.browserAction.setIcon(req, ()=>resolve()));	
}

export function browserActionOnClickAddListener(req){
	return chrome.browserAction.onClicked.addListener(req);
}

export function runtimeId(){
	return chrome.runtime.id;
}
export function runtimeGetURL(file){
	return chrome.runtime.getURL(file)
}

export async function runtimeSendMessage(req){
	return new Promise(resolve => chrome.runtime.sendMessage(req, data => resolve(data)));	
}

export function runtimeSetUninstallURL(url){
	return chrome.runtime.setUninstallURL(url);
}

export function runtimeOnInstalledAddListener(req){
	return chrome.runtime.onInstalled.addListener(req);
}

export function runtimeOnMessageAddListener(req){
	return chrome.runtime.onMessage.addListener(req);
}

export function runtimeOnMessageRemoveListener(req){
	return chrome.runtime.onMessage.removeListener(req);
}