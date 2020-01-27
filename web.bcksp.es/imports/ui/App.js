/*----------------------------------------*\
  web.bitRepublic - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-19 22:10:37
  @Last Modified time: 2020-01-27 01:30:37
\*----------------------------------------*/
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import LiveStream from './archive/LiveStream.js';
import ArchiveCounter from './archive/counter.js';
import BannerBaseline from './banner/baseline.js';
import AboutShort from './about/short.js';
import HowtoList from './howto/list.js';
import AboutPrivacy from './about/privacy.js';
import SouvenirPannel from './souvenir/pannel.js';
// App component - represents the whole app

const App = ({isConnected}) => {
	
	const onShare = data => {
		console.log(data);
	}

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
			<LiveStream type="home" onShare={onShare}/>
			{
				!isConnected &&
				<div className="about-parallax">
					<div id="aboutParallaxContainer" className="about-parallax__background"></div>
						<AboutShort/>
						<HowtoList/>
				</div>
			}

			{
				!isConnected &&
					<AboutPrivacy/>
			}
			{
				isConnected &&
					<SouvenirPannel/>
			}
		</div>
	);
}

export default withTracker(self => {
	return {
		isConnected : Meteor.userId()
	};
})(App);
