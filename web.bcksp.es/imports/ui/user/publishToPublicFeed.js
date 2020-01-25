/*----------------------------------------*\
  bcksp.es - publishToPublicFeed.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 19:51:28
  @Last Modified time: 2020-01-19 22:21:27
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { useState } from 'react';
import FixeWait from "./../fixe/wait.js";
import { useForm } from 'react-hook-form';
import { config } from '../../startup/config.js'
import { errorHandler } from '../../utilities/ui.js';
import MyToggleButton from "./../shared/MyToggleButton.js";
import { SettingsTogglePublishToPublicFeed } from '../../api/settings/methods.js';


const PublishToPublicFeed = ({settings})=> {
	const [loading, setLoading] = useState(false);
	const { errors, setError } = useForm();

	const handleTogglePublishToPublicFeed = ()=>{
		if(loading)return;
		setLoading(true);
		SettingsTogglePublishToPublicFeed.call((err, res) =>{
			setLoading(false);
			if(!errorHandler(err, setError)){
			}
		});
		return false;
	}
	return (
		<div>
			<h2><T>userprofile.settings.publishToPublicFeed.title</T></h2>
			<ul className="toggle-list">
				{ 
					loading && 
					<li>
						<span className="input-wrapper--inline">
							<FixeWait/>
						</span>
					</li>
				}
				<li>
					<span className="input-wrapper--inline">
						<MyToggleButton
							error={errors?.main?.message}
							value={ !settings.publishToPublicFeed }
							onToggle={()=>handleTogglePublishToPublicFeed()}
							activeLabel={i18n.__("userprofile.settings.publishToPublicFeed.activeLabel")}
							inactiveLabel={i18n.__("userprofile.settings.publishToPublicFeed.inactiveLabel")}
						/>
					</span>
				</li>
				{
					errors?.main?.message && 
					<li>
						<span className="input-wrapper--inline">
							{errors?.main?.message}
						</span>
					</li>
				}
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