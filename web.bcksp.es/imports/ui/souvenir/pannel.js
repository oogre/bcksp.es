/*----------------------------------------*\
  bcksp.es - pannel.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-11 13:53:56
  @Last Modified time: 2019-05-04 17:42:09
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
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			autoplay : false,
			arrows : true
		};
		return (
			<div className="souvenir-pannel" /*onClick={()=>FlowRouter.go("souvenir")}*/>
				<div className="container">
					<div className="souvenir-pannel__intro">
						<h3><T>souvenir.title</T></h3>
						<div>
							<p>
								<T>souvenir.short</T>
							</p>
							<a className="button button--secondary" href={FlowRouter.path("souvenir")}><T>menus.souvenir</T></a>
						</div>
					</div>
				</div>
				<div className="slider">
					<Slider {...settings}>
						<div className="slider__slide">
							<div className="slider__slide-content">
								<img src="/images/photos/voodoo-alley.jpg" alt="#bcksp.es"/>
							</div>
						</div>
						<div className="slider__slide">
							<div className="slider__slide-content">
								<img src="/images/photos/hanging-beads.jpg" alt="#bcksp.es"/>
							</div>
						</div>
						<div className="slider__slide">
							<div className="slider__slide-content">
								<img src="/images/photos/swamp.jpg" alt="#bcksp.es"/>
							</div>
						</div>
						<div className="slider__slide">
							<div className="slider__slide-content">
								<img src="/images/photos/nola-street.jpg" alt="#bcksp.es"/>
							</div>
						</div>
						<div className="slider__slide">
							<div className="slider__slide-content">
								<img src="/images/photos/voodoo-alley.jpg" alt="#bcksp.es"/>
							</div>
						</div>
					</Slider>
				</div>
			</div>
		);
	}
}
