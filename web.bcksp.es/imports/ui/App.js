/*----------------------------------------*\
  web.bitRepublic - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-19 22:10:37
  @Last Modified time: 2019-03-27 15:47:19
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import LiveStream from './archive/LiveStream.js';
import ArchiveCounter from './archive/counter.js';
import BannerBaseline from './banner/baseline.js';
import AboutShort from './about/short.js';
import HowtoList from './howto/list.js';
import AboutPrivacy from './about/privacy.js';
import SouvenirPannel from './souvenir/pannel.js';
import T from './../i18n/index.js';
// App component - represents the whole app
class App extends Component {
	constructor(props){
		super(props);
	}
	onShare(data){
		console.log(data);
	}
	render() {
		return (
			<div className="page__content">
				<BannerBaseline isConnected={this.props.isConnected}/>
				{
					this.props.isConnected &&
						<div className="container">
							<div className="homepage-counter">
								<ArchiveCounter/>
							</div>
						</div>
				}
				<LiveStream type="home" onShare={this.onShare.bind(this)}/>
				{
					!this.props.isConnected &&
						<AboutShort/>
				}
				{
					!this.props.isConnected &&
						<HowtoList/>
				}
				{
					!this.props.isConnected &&
						<AboutPrivacy/>
				}
				{
					this.props.isConnected &&
						<SouvenirPannel/>
				}
			</div>
		);
	}
}

export default withTracker(self => {
	return {
		isConnected : Meteor.userId()
	};
})(App);
