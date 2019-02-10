/*----------------------------------------*\
  web.bitRepublic - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-19 22:10:37
  @Last Modified time: 2019-01-29 19:43:59
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
				<BannerBaseline/>
				{ this.props.isConnected && <ArchiveCounter/> }
				<LiveStream action={this.onShare.bind(this)}/>
				
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
				<SouvenirPannel/>
			</div>
		);
	}
}

export default withTracker(self => {
	return {
		isConnected : Meteor.userId()
	};
})(App);
