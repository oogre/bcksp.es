/*----------------------------------------*\
  bcksp.es - utilities.browser.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-12-10 06:38:27
  @Last Modified time: 2018-12-10 14:40:13
\*----------------------------------------*/
export default class UtilitiesBrowser {

	static async tabsQuery(req){
		return new Promise(resolve => chrome.tabs.query(req, tabs=>resolve(tabs)));
	}
	static async tabsReload(req){
		return new Promise(resolve => chrome.tabs.reload(req, ()=>resolve()));	
	}
	static async tabsUpdate(req){
		return new Promise(resolve => chrome.tabs.update(req, ()=>resolve()));	
	}
	static async tabsCreate(req){
		return new Promise(resolve => chrome.tabs.create(req, ()=>resolve()));	
	}
	static async tabsHighlight(req){
		return new Promise(resolve => chrome.tabs.highlight(req, ()=>resolve()));	
	}
	static tabsOnActivatedAddListener(req){
		return chrome.tabs.onActivated.addListener(req);
	}
	static async tabsSendMessage(id, req){
		return new Promise(resolve => chrome.tabs.sendMessage(id, req, ()=>resolve()));	
	}
	static async browserActionSetIcon(req){
		return new Promise(resolve => chrome.browserAction.setIcon(req, ()=>resolve()));	
	}
	static runtimeId(){
		return chrome.runtime.id;
	}
	static async runtimeSendMessage(req){
		return new Promise(resolve => chrome.runtime.sendMessage(req, data=>resolve(data)));	
	}
	static runtimeOnMessageAddListener(req){
		return chrome.runtime.onMessage.addListener(req);
	}
	static runtimeOnMessageRemoveListener(req){
		return chrome.runtime.onMessage.removeListener(req);
	}	
}