/*----------------------------------------*\
  bcksp.es - publishToPublicFeed.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 19:51:28
  @Last Modified time: 2020-01-28 23:43:53
\*----------------------------------------*/

import FixeWait from "./../fixe/wait.js";
import { config } from '../../startup/config.js'
import React, { useState, useEffect } from 'react';
import MyToggleButton from "./../shared/MyToggleButton.js";
import { successHandler, errorHandler } from '../../utilities/ui.js';
import { SettingsTogglePublishToPublicFeed } from '../../api/settings/methods.js';


const PublishToPublicFeed = ({settings})=> {
	const [loading, setLoading] = useState(false);
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T = i18n.createComponent("userprofile.settings.publishToPublicFeed");
  	const T2 = i18n.createTranslator("userprofile.settings.publishToPublicFeed");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

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
			<h2><T>title</T></h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						{ loading && <FixeWait/> }
						{ !loading && 
							<MyToggleButton
								value={ !settings.publishToPublicFeed }
								onToggle={()=>handleTogglePublishToPublicFeed()}
								activeLabel={T2("activeLabel")}
								inactiveLabel={T2("inactiveLabel")}
							/>
						}
					</span>
				</li>
				<li>
					<span className="input-wrapper--inline">
						<T maxCounter={config.archives.public.longBuffer.maxMaxLen}>desc</T>
					</span>
				</li>
			</ul>
		</div>
	);
}

export default PublishToPublicFeed;