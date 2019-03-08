/*----------------------------------------*\
  bcksp.es - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:21:49
  @Last Modified time: 2019-01-15 12:18:17
\*----------------------------------------*/
import Slider from "react-slick";
import AboutLong from './about/long.js';
import React, { Component } from 'react';
import AboutPress from './about/press.js';
import AboutArtists from './about/artists.js';

import T from './../i18n/index.js';
// App component - represents the whole app
export default class About extends Component {
	constructor(props){
		super(props);
	}

	render() {
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			autoplay : true,
			arrows : true
		};
		return (
			<div className="page__content">
				<div className="container">
					<h1 className="page__title"><T>about.title</T></h1>
					<h2 className="page__subtitle"><T>about.subtitle</T></h2>
					<AboutLong/>
				</div>
				<Slider className="slider" {...settings}>
					<div>
						<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
					</div>
					<div>
						<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
					</div>
					<div>
						<img className="logo--header__picture" src="/	images/logo-animated.gif" alt="#bcksp.es"/>
					</div>
					<div>
						<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
					</div>
					<div>
						<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
					</div>
				</Slider>
				<div className="container">
					<AboutArtists/>
					<AboutPress/>
				</div>
			</div>
		);
	}
}