/*----------------------------------------*\
  bcksp.es - publishToPublicFeed.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2021-03-08 13:08:24
  @Last Modified time: 2021-03-08 17:29:36
\*----------------------------------------*/
import React from 'react';
import FixeWait from './fixe/wait.js';
import { useForm } from 'react-hook-form';
import { T } from './../utilities/tools.js';
import MyToggleButton from './MyToggleButton.js';
import { sendMessage } from './../utilities/com.js';
import { log, info, warn, error } from './../utilities/log.js';


const PublishToPublicFeed = () => {
	const [isPublishToPublicFeed, setPublishToPublicFeed] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	
	React.useEffect(() => {//componentDidMount
		sendMessage("getPublishToPublicFeed")
		.then((data) => {
			setPublishToPublicFeed(!data);
		})
		.catch(e => error(e));
		return () => {//componentWillUnmount
		
		}
	}, []); 
	
	const handlePublishToPublicFeedChange = wasBlacklisted =>{
		if(loading)return;
		setLoading(true);
		sendMessage("togglePublishToPublicFeed")
		.then(data => {
			setPublishToPublicFeed(!isPublishToPublicFeed);
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
				<T.span  className="field__label" text={{ key: "userprofile.settings.publishToPublicFeed.title"}}/>
				<MyToggleButton
					value={ isPublishToPublicFeed } 
					onToggle={handlePublishToPublicFeedChange}
					activeLabel={T.translate("userprofile.settings.publishToPublicFeed.activeLabel")}
					inactiveLabel={T.translate("userprofile.settings.publishToPublicFeed.inactiveLabel")}
					
				/>
			</div>
			{
				loading && <FixeWait/>
			}
		</div>
	);
}
export default PublishToPublicFeed;