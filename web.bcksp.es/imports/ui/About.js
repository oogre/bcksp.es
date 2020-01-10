/*----------------------------------------*\
  bcksp.es - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:21:49
  @Last Modified time: 2020-01-09 23:47:03
\*----------------------------------------*/
import T from './../i18n/index.js';
import AboutLong from './about/long.js';
import React, { Component } from 'react';
import AboutPress from './about/press.js';
import AboutArtists from './about/artists.js';
import { config } from './../startup/config.js'
import YoutubeEmbed from './shared/youtubeEmbed.js';
import GalleryKenBurns from './gallery/kenBurns.js';

// App component - represents the whole app
export default class About extends Component {
	constructor(props){
		super(props);
		
	}
	
	render() {
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title"><T>about.title</T></h1>
					</div>
					<div className="about--long">
						<GalleryKenBurns samplePath="/images/j.vache/j.vache.[ID].jpg" idmax={73}/>
						<div className="about__content">
						{
							Object.values(i18n.__("about.long")).map((article, k) =>(
								<div key={k}>
									{
										k == 1 &&
											<div className="text-block">
												<YoutubeEmbed youtubeID="hGB58ybRoJU"/>
											</div>
									}
									<div className="text-block">
										{
											article.title &&
												<a id={article.title.id} href={"#"+article.title.id} className="text-block__link--title">
													<h3 className="text-block__title">
														{article.title.value}
													</h3>
												</a>
										}
										{
											Object.values(article.content).map((subarticle, k2) => (
												<span key={k2}>
													{
														subarticle.subtitle &&
															<h2 className="text-block__subtitle">
																<p dangerouslySetInnerHTML={
																	{
																		__html:i18n.__("about.long."+k+".content."+k2+".subtitle")
																	}
																}></p>
															</h2>
													}
													{
														subarticle.text &&
															<p dangerouslySetInnerHTML={
																{
																	__html:i18n.__("about.long."+k+".content."+k2+".text", {
																		bookMaxChar:config.book.getMaxChar(), 
																		bookMaxPage:config.book.page.count,
																		download:FlowRouter.path("item", {type : "download"})
																	})
																}
															}></p>
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
				</div>

				<AboutArtists/>

				<div className="container">
					<AboutPress/>
				</div>
			</div>
		);
	}
}