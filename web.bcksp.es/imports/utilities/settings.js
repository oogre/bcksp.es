/*----------------------------------------*\
  bcksp.es - settings.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-24 16:24:54
  @Last Modified time: 2019-04-21 18:12:11
\*----------------------------------------*/
import { Settings } from './../api/settings/settings.js';
import { config } from "./../startup/config.js";

export function create(){
	return Settings.insert({
		blacklist : [],
		blindfield : {
			types : config.settings.blindfield.disabled.default.type,
			class : config.settings.blindfield.disabled.default.class
		},
		publishToPublicFeed : true,
		createdAt : new Date(),
		updatedAt : new Date()
	});
}