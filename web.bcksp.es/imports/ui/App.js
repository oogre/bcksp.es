/*----------------------------------------*\
  web.bitRepublic - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-19 22:10:37
  @Last Modified time: 2018-09-13 19:19:53
\*----------------------------------------*/
import React, { Component } from 'react';

import LiveStream from './LiveStream.js';
import HeaderMenu from './menu/header.js';
import BannerBaseline from './banner/baseline.js';
import AboutShort from './about/short.js';
import HowtoList from './howto/list.js';
import AboutPrivacy from './about/privacy.js';
import MenuFooter from './menu/footer.js';

// App component - represents the whole app
export default class App extends Component {
	constructor(props){
		super(props);
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