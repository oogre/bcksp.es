/*----------------------------------------*\
  bcksp.es - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-19 22:10:37
  @Last Modified time: 2020-02-26 12:44:06
\*----------------------------------------*/
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ArchiveWrapper from './archive/wrapper.js';
import ArchiveCounter from './archive/counter.js';
import BannerBaseline from './banner/baseline.js';
import AboutShort from './about/short.js';
import HowtoList from './howto/list.js';
import AboutPrivacy from './about/privacy.js';
import SouvenirPannel from './souvenir/pannel.js';
import SharePopup from './shared/sharePopup.js';
import ButtonShare from './shared/shareButton.js';

// App component - represents the whole app

const App = ({isConnected}) => {
	const [sharePopupOpen, setSharePopupOpen] = React.useState(false);
	const [selection, setSelection] = React.useState(false);

	return (
		<div className="page__content">
			
			<BannerBaseline isConnected={isConnected}/>
			{
				isConnected &&
					<div className="container">
						<div className="homepage-counter">
							<ArchiveCounter/>
						</div>
					</div>
			}
			{
				<ArchiveWrapper type="home" onSelect={setSelection}/>
			}
			<div className="about-parallax">
				<div id="aboutParallaxContainer" className="about-parallax__background"></div>
					<AboutShort/>
					{
						!isConnected && <HowtoList/>
					}
			</div>
			{
				!isConnected &&
					<AboutPrivacy/>
			}
			<SouvenirPannel/>
			{
				_.isObject(selection) && 
					<ButtonShare 	
						left={selection.position[0]}
						top={selection.position[1]}
						content={selection.content}
						onShare={()=>setSharePopupOpen(true)}
					/>
			}
			{
				_.isObject(selection) && sharePopupOpen && 
					<SharePopup quote={selection.content} closeRequested={()=>{setSharePopupOpen(false);setSelection(false)}}/>
			}
			
		</div>
	);
}

export default withTracker(self => {
	return {
		isConnected : Meteor.userId()
	};
})(App);
