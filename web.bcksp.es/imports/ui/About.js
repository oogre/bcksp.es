/*----------------------------------------*\
  bcksp.es - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:21:49
  @Last Modified time: 2018-09-23 19:48:16
\*----------------------------------------*/
import React, { Component } from 'react';

import HeaderMenu from './menu/header.js';
import AboutLong from './about/long.js';
import GalleryCaroussel from './gallery/caroussel.js';
import AboutArtists from './about/artists.js';
import AboutPress from './about/press.js';
import MenuFooter from './menu/footer.js';
import T from './../i18n/index.js';
// App component - represents the whole app
export default class About extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page page--about">
				<HeaderMenu />
				<div className="page__content">
					<AboutLong/>
					<GalleryCaroussel>
						<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
					</GalleryCaroussel>
					<AboutArtists/>
					<AboutPress/>
				</div>
				<MenuFooter/>
			</div>
		);
	}
}