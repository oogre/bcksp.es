/*----------------------------------------*\
  bcksp.es - utilities.browser.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-12-10 06:38:27
  @Last Modified time: 2018-12-10 14:33:39
\*----------------------------------------*/
export default class UtilitiesBrowser {

	static async tabsQuery(req){
		return browser.tabs.query(req);
	}
	static async tabsReload(req){
		return browser.tabs.reload(req);	
	}
	static async tabsUpdate(req){
		return browser.tabs.update(req);	
	}
	static async tabsCreate(req){
		return browser.tabs.create(req);	
	}
	static async tabsHighlight(req){
		return browser.tabs.highlight(req);
	}
	static async tabsOnActivatedAddListener(req){
		return browser.tabs.onActivated.addListener(req);
	}
	static async tabsSendMessage(id, req){
		return browser.tabs.sendMessage(id, req);
	}
	static async browserActionSetIcon(req){
		return browser.browserAction.setIcon(req);
	}
	static runtimeId(){
		return browser.runtime.id;
	}
	static async runtimeSendMessage(req){
		return browser.runtime.sendMessage(req);
	}
	static async runtimeOnMessageAddListener(req){
		return browser.runtime.onMessage.addListener(req);
	}
	static async runtimeOnMessageRemoveListener(req){
		return browser.runtime.onMessage.removeListener(req);
	}	
}