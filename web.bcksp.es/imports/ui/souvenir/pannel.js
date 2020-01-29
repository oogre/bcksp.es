/*----------------------------------------*\
  bcksp.es - pannel.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-11 13:53:56
  @Last Modified time: 2020-01-28 22:52:04
\*----------------------------------------*/

import React from 'react';
import Slider from "react-slick";

// App component - represents the whole app
const SouvenirPannel = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		autoplay : false,
		arrows : true
	};
	const T = i18n.createComponent("souvenir");
	const T2 = i18n.createComponent("menus");

	return (
		<div className="souvenir-pannel" /*onClick={()=>FlowRouter.go("souvenir")}*/>
			<div className="container">
				<div className="souvenir-pannel__intro">
					<h3><T>title</T></h3>
					<div>
						<p>
							<T>short</T>
						</p>
						<a className="button button--secondary" href={FlowRouter.path("souvenir")}>
							<T2>souvenir</T2>
						</a>
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

export default SouvenirPannel;