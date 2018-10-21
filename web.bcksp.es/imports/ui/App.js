/*----------------------------------------*\
  web.bitRepublic - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-19 22:10:37
  @Last Modified time: 2018-10-02 13:52:36
\*----------------------------------------*/
import React, { Component } from 'react';


import HeaderMenu from './menu/header.js';
import MenuFooter from './menu/footer.js';
import LiveStream from './LiveStream.js';

import BannerBaseline from './banner/baseline.js';
import AboutShort from './about/short.js';
import HowtoList from './howto/list.js';
import AboutPrivacy from './about/privacy.js';
import T from './../i18n/index.js';

import { streamer } from './../api/streamer.js';

// App component - represents the whole app
export default class App extends Component {
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
			<div className="page page--home">
				<HeaderMenu />
				<div className="page__content">
					<BannerBaseline/>
					<LiveStream/>
					<AboutShort/>
					<HowtoList/>
					<AboutPrivacy/>
				</div>
				<MenuFooter/>
			</div>
		);
	}
}