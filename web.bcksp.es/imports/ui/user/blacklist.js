/*----------------------------------------*\
  bcksp.es - blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:12:11
  @Last Modified time: 2020-01-28 22:59:29
\*----------------------------------------*/
import React, { useState, useEffect } from 'react';
import FixeWait from "./../fixe/wait.js";
import MyToggleButton from "./../shared/MyToggleButton.js";
import { successHandler, errorHandler } from '../../utilities/ui.js';
import { SettingsBlacklistRemove } from '../../api/settings/methods.js';


const Blacklist = ({settings}) => {
	const [ loading, setLoading ] = useState(false);
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T = i18n.createComponent("userprofile.settings");
  	const T2 = i18n.createTranslator("userprofile.settings");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const handleToggleBlacklist = (url) => {
		if(loading)return;
		setLoading(true);
		SettingsBlacklistRemove.call({url}, (error, res) =>{
			setLoading(false);
			if(errorHandler(error))return;
			successHandler(res);
		});
		return false;
	};
	
	return (
		<div>
			<h2>
			{
				_.isEmpty(settings.blacklist) ? <T>noBlacklist.title</T> : <T>blacklist.title</T>
			}
			</h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						<T>noBlacklist.desc</T>
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
				{ 
					settings.blacklist.map((url, k) => (
						<li key={k}>
							<span className="input-wrapper--inline">
								{url}
							</span>
							<span className="input-wrapper--inline">
								<MyToggleButton
									value={ true }
									onToggle={flag=>handleToggleBlacklist(url, flag)}
									activeLabel={T2("blacklist.activeLabel")}
									inactiveLabel={T2("blacklist.inactiveLabel")}
								/>
							</span>
						</li>
					))
				}
			</ul>
		</div>
	);
};

export default Blacklist;