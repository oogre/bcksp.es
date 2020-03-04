/*----------------------------------------*\
  bcksp.es - pannel.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-11 13:53:56
  @Last Modified time: 2020-03-04 18:46:03
\*----------------------------------------*/

import React from 'react';
import Slider from "react-slick";
import { getTranslations } from "./../../i18n/index.js";

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
	const {C, C1} = getTranslations("souvenir", "menus");
	return (
		<div className="souvenir-pannel">
			<div className="container souvenir-pannel__container">
				<div className="souvenir-pannel__intro">
					<h2 className="souvenir-pannel__title"><C>title</C></h2>
					<div className="souvenir-pannel__content">
						<C>short</C>
						<a className="button button--secondary" href={FlowRouter.path("souvenir")}>
							<C1>souvenir</C1>
						</a>
					</div>
				</div>
			</div>
			<div className="slider">
				{
				false &&
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
				}
			</div>

		</div>
	);
}

export default SouvenirPannel;