/*----------------------------------------*\
  bcksp.es - blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:02:18
  @Last Modified time: 2020-02-18 17:29:23
\*----------------------------------------*/
import React from 'react';
import FixeWait from './fixe/wait.js';
import { useForm } from 'react-hook-form';
import { T } from './../utilities/tools.js';
import MyToggleButton from './MyToggleButton.js';
import { sendMessage } from './../utilities/com.js';
import { log, info, warn, error } from './../utilities/log.js';


const Blacklist = () => {
	
	const [currentURL, setCurrentURL] = React.useState("");
	const [currentURLBlacklisted, setCurrentURLBlacklisted] = React.useState("whitelisted");
	const [isBlacklisted, setIsBlacklisted] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	
	React.useEffect(() => {//componentDidMount
		sendMessage("getUrlStatus")
		.then(({url, blackListed}) => {
			setCurrentURL(url);
			setIsBlacklisted(!!blackListed);
		})
		.catch(e => error(e));
		return () => {//componentWillUnmount
		
		}
	}, []); 
	
	
	const handleBlacklistChange = wasBlacklisted =>{
		if(loading)return;
		setLoading(true);
		const methodName = wasBlacklisted ? "blacklistRemove" : "blacklistAdd";
		sendMessage(methodName, currentURL)
		.then(data => {
			setIsBlacklisted(!isBlacklisted);
		})
		.catch(e => {
			//errorHandler(e, setError)
		})
		.finally(() => {
			setLoading(false);
		});
	}

	return (
		<div className="security">
			<div className="field">
				{
					isBlacklisted && 
						<T.span  className="field__label" text={{ key: "userprofile.settings.blacklist.label.inactiveLabel", url :  currentURL}}/>
				}

				{
					!isBlacklisted && 
						<T.span  className="field__label" text={{ key: "userprofile.settings.blacklist.label.activeLabel", url :  currentURL}}/>
				}
					
				<MyToggleButton
					value={ isBlacklisted } 
					onToggle={handleBlacklistChange}
					activeLabel={ T.translate("userprofile.settings.blacklist.activeLabel") }
					inactiveLabel={ T.translate("userprofile.settings.blacklist.inactiveLabel") }
				/>
			</div>
			{
				loading && <FixeWait/>
			}
		</div>
	);
}
export default Blacklist;