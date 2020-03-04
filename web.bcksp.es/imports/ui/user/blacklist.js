/*----------------------------------------*\
  bcksp.es - blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:12:11
  @Last Modified time: 2020-03-04 18:48:34
\*----------------------------------------*/
import React from 'react';
import FixeWait from "./../fixe/wait.js";
import { getTranslations } from "./../../i18n/index.js";
import MyToggleButton from "./../shared/MyToggleButton.js";
import { successHandler, errorHandler } from '../../utilities/ui.js';
import { SettingsBlacklistRemove } from '../../api/settings/methods.js';


const Blacklist = ({settings}) => {
	const [ loading, setLoading ] = React.useState(false);
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	
	const {C, T} = getTranslations("userprofile.settings");
  	React.useEffect(() => {//componentDidMount
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
				_.isEmpty(settings.blacklist) ? <C>noBlacklist.title</C> : <C>blacklist.title</C>
			}
			</h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						<C>noBlacklist.desc</C>
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
									activeLabel={T("blacklist.activeLabel")}
									inactiveLabel={T("blacklist.inactiveLabel")}
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