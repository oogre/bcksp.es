/*----------------------------------------*\
  bcksp.es - publishToPublicFeed.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 19:51:28
  @Last Modified time: 2020-03-04 18:55:19
\*----------------------------------------*/

import React from 'react';
import FixeWait from "./../fixe/wait.js";
import { nf } from "./../../utilities/math.js";
import { config } from './../../startup/config.js'
import { getTranslations } from "./../../i18n/index.js";
import MyToggleButton from "./../shared/MyToggleButton.js";
import { successHandler, errorHandler } from './../../utilities/ui.js';
import { SettingsTogglePublishToPublicFeed } from './../../api/settings/methods.js';


const PublishToPublicFeed = ({settings})=> {
	const [loading, setLoading] = React.useState(false);
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("userprofile.settings.publishToPublicFeed");
  	React.useEffect(() => {//componentDidMount
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
			<h2>
				<C>title</C>
			</h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						{ loading && <FixeWait/> }
						{ !loading && 
							<MyToggleButton
								value={ !settings.publishToPublicFeed }
								onToggle={()=>handleTogglePublishToPublicFeed()}
								activeLabel={T("activeLabel")}
								inactiveLabel={T("inactiveLabel")}
							/>
						}
					</span>
				</li>
				<li>
					<span className="input-wrapper--inline">
						<C maxCounter={nf(config.archives.public.longBuffer.maxMaxLen)}>desc</C>
					</span>
				</li>
			</ul>
		</div>
	);
}

export default PublishToPublicFeed;