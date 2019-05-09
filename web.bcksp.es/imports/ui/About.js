/*----------------------------------------*\
  bcksp.es - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:21:49
  @Last Modified time: 2019-05-04 18:43:40
\*----------------------------------------*/
import Slider from "react-slick";
import AboutLong from './about/long.js';
import React, { Component } from 'react';
import AboutPress from './about/press.js';
import AboutArtists from './about/artists.js';
import YoutubeEmbed from './shared/youtubeEmbed.js';

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
			autoplay : false,
			arrows : true
		};
		console.log(i18n.__("about"));
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title"><T>about.title</T></h1>
						<h2 className="page__subtitle"><T>about.subtitle</T></h2>
					</div>
					<div className="about--long">
						{
							i18n.__("about.long").map((article, k) =>(
								<div key={k}>
									{
										k == 2 &&
											<div className="text-block">
												<YoutubeEmbed className="logo--header__picture" youtubeID="hGB58ybRoJU"/>
											</div>
									}
									<div className="text-block">
										{
											article.title &&
												<a id={article.title.id} href={"#"+article.title.id} className="text-block__link--title">
													<h3 className="text-block__title">
														{ article.title.value }
													</h3>
												</a>
										}
										{
											article.content.map((subarticle, k) => (
												<span key={k}>
													{
														subarticle.subtitle &&
															<h2 className="text-block__subtitle">
																{ subarticle.subtitle }
															</h2>
													}
													{
														subarticle.text &&
															<p dangerouslySetInnerHTML={{__html:subarticle.text}}></p>
													}
												</span>
											))
										}
									</div>
								</div>
							))
						}
					</div>
				</div>

				<AboutArtists/>

				<div className="container">
					<AboutPress/>
				</div>
			</div>
		);
	}
}