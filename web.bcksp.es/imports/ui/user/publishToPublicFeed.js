/*----------------------------------------*\
  bcksp.es - publishToPublicFeed.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 19:51:28
  @Last Modified time: 2020-01-26 14:59:34
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { useState } from 'react';
import FixeWait from "./../fixe/wait.js";
import { config } from '../../startup/config.js'
import MyToggleButton from "./../shared/MyToggleButton.js";
import { successHandler, errorHandler } from '../../utilities/ui.js';
import { SettingsTogglePublishToPublicFeed } from '../../api/settings/methods.js';


const PublishToPublicFeed = ({settings})=> {
	const [loading, setLoading] = useState(false);
	
	const handleTogglePublishToPublicFeed = ()=>{
		if(loading)return;
		setLoading(true);
		SettingsTogglePublishToPublicFeed.call((error, res) =>{
			setLoading(false);
			if(errorHandler(error))return;
			successHandler(res);
		});
		return false;
	}
	return (
		<div>
			<h2><T>userprofile.settings.publishToPublicFeed.title</T></h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						{ loading && <FixeWait/> }
						{ !loading && 
							<MyToggleButton
								value={ !settings.publishToPublicFeed }
								onToggle={()=>handleTogglePublishToPublicFeed()}
								activeLabel={i18n.__("userprofile.settings.publishToPublicFeed.activeLabel")}
								inactiveLabel={i18n.__("userprofile.settings.publishToPublicFeed.inactiveLabel")}
							/>
						}
					</span>
				</li>
				<li>
					<span className="input-wrapper--inline">
						<T maxCounter={config.archives.public.longBuffer.maxMaxLen}>userprofile.settings.publishToPublicFeed.desc</T>
					</span>
				</li>
			</ul>
		</div>
	);
}

export default PublishToPublicFeed;