/*----------------------------------------*\
  bcksp.es - tab.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-04 14:41:20
  @Last Modified time: 2019-04-17 12:22:35
\*----------------------------------------*/

import { last, findWhere } from './tools.js';
import { config } from './../shared/config.js';
import { isEmpty, isArray } from './validation.js';
import { getIntoBlackList } from './localStorage.js';
import { tabsQuery, tabsReload, tabsHighlight } from './browser.js';

export async function tabHandler(){
	return tabsQuery({ 
			url : config.standard_url, 
			currentWindow: true 
		})
		.then(tabs=>{
			return findWhere(tabs, {active : true}) || last(tabs);
		})
		.then(tab=>{
			if(!tab.active){
				return tabsHighlight({tabs:tab.index}).then(()=>tab);
			}
			return tab;
		});
}

export async function reloadTabs(urls){
	return urls.map( url => {
		tabsQuery({
			'url': "*://" + url.replace(/:\d+/, "") + "/*",
		})
		.then(tabs => {
			tabs.forEach(tab => tabsReload(tab.id))
		});
	});
}

export async function getTabStatus(request){
		return tabsQuery(request)
		.then(async (tabs) => {
			if(tabs.length == 0)throw new Error("Tab not found " + JSON.stringify(request));
			let regexp = /.+\:\/\/([^\/?#]+)(?:[\/?#]|$)/i
			let url = (tabs[0].url.match(regexp)).shift();
			url = url.replace(/https?:\/\//, "");
			url = url.split("").reverse().join("").replace(/\//, "").split("").reverse().join("");
			url = isEmpty(url) ? tabs[0].url : url;
			if(!isArray(tabs) || tabs.length <= 0 ) throw new Error("URL not found");
			return {
				url : url,
				blackListed : getIntoBlackList(url) !== false
			};
		});
	}