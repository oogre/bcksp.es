/*----------------------------------------*\
  bcksp.es - settings.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-24 16:24:54
  @Last Modified time: 2019-03-24 16:26:38
\*----------------------------------------*/
import { Settings } from './../api/settings/settings.js';


export function create(){
	return Settings.insert({
		blacklist : [],
		blindfield : {
			types : [],
			class : ["bcksp-es-disabled"]
		},
		publishToPublicFeed : true,
		createdAt : new Date(),
		updatedAt : new Date()
	});
}