/*----------------------------------------*\
  bcksp.es - blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:12:11
  @Last Modified time: 2020-01-15 20:09:21
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { useState } from 'react';
import FixeWait from "./../fixe/wait.js";
import MyToggleButton from "./../shared/MyToggleButton.js";
import { SettingsBlacklistRemove } from '../../api/settings/methods.js';


const Blacklist = ({settings}) => {
	const [loading, setLoading] = useState(false);
	const handleToggleBlacklist = (url) => {
		if(loading)return;
		setLoading(true);
		SettingsBlacklistRemove.call({url}, (err, res) =>{
			setLoading(false);
			console.log(err, res);
		});
		return false;
	};
	const displayBlacklistElement = (url, k) => (
		<li key={k}>
			<span className="input-wrapper--inline">
				{url}
			</span>
			<span className="input-wrapper--inline">
				<MyToggleButton
					value={ true }
					onToggle={flag=>handleToggleBlacklist(url, flag)}
					activeLabel={i18n.__("userprofile.settings.blacklist.activeLabel")}
					inactiveLabel={i18n.__("userprofile.settings.blacklist.inactiveLabel")}
				/>
			</span>
		</li>
	);
	return (
		<div>
			<h2>
			{
				_.isEmpty(settings.blacklist) ? <T>userprofile.settings.noBlacklist.title</T> : <T>userprofile.settings.blacklist.title</T>
			}
			</h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						<T>userprofile.settings.noBlacklist.desc</T>
					</span>
				</li>
				{ 
					loading && 
					<li>
						<span className="input-wrapper--inline">
							<FixeWait/>
						</span>
					</li>
				}
				{ settings.blacklist.map(displayBlacklistElement) }
			</ul>
		</div>
	);
};

export default Blacklist;