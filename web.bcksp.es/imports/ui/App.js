/*----------------------------------------*\
  web.bitRepublic - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-19 22:10:37
  @Last Modified time: 2018-11-26 14:13:32
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import LiveStream from './archive/LiveStream.js';
import ArchiveCounter from './archive/counter.js';
import BannerBaseline from './banner/baseline.js';
import AboutShort from './about/short.js';
import HowtoList from './howto/list.js';
import AboutPrivacy from './about/privacy.js';
import T from './../i18n/index.js';

import { streamer } from './../api/streamer.js';

// App component - represents the whole app
class App extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		streamer.on('login', message => {
			console.log(message);		
		});
	}
	render() {
		return (
			<div className="page__content">
				<BannerBaseline/>
				{ this.props.isConnected && <ArchiveCounter/> }
				<LiveStream/>
				<AboutShort/>
				<HowtoList/>
				<AboutPrivacy/>
			</div>
		);
	}
}

export default withTracker(self => {
	return {
		isConnected : Meteor.userId()
	};
})(App);
