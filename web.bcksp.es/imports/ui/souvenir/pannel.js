/*----------------------------------------*\
  bcksp.es - pannel.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-11 13:53:56
  @Last Modified time: 2019-03-04 21:42:09
\*----------------------------------------*/

import Slider from "react-slick";
import T from './../../i18n/index.js';
import React, { Component } from 'react';

// App component - represents the whole app
export default class SouvenirPannel extends Component {
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
			<div className="souvenir-pannel" onClick={()=>FlowRouter.go("souvenir")}>
				<div className="container">
					<h3><T>souvenir.title</T></h3>
					<div>
						<p>
							<T>souvenir.short</T>
						</p>
						<a href={FlowRouter.path("souvenir")}><T>menus.souvenir</T></a>
					</div>
				</div>
				<div className="slider">
					<Slider {...settings}>
						<div>
							<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						</div>
						<div>
							<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						</div>
						<div>
							<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						</div>
						<div>
							<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						</div>
						<div>
							<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						</div>
					</Slider>
				</div>
			</div>
		);
	}
}
