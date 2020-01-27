/*----------------------------------------*\
  bcksp.es - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:21:49
  @Last Modified time: 2020-01-27 01:27:23
\*----------------------------------------*/

import React, { useEffect, useState } from 'react';
import AboutPress from './about/press.js';
import AboutArtists from './about/artists.js';
import { config } from './../startup/config.js'
import YoutubeEmbed from './shared/youtubeEmbed.js';
import GalleryKenBurns from './gallery/kenBurns.js';

// App component - represents the whole app
const About = () => {
	const [ locale, setLocale ] = useState(i18n.getLocale());
	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 
	const T = i18n.createComponent("about");
	const T2 = i18n.createTranslator("about");

	console.log(T2("long"));

	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title"><T>title</T></h1>
				</div>
				<div className="about--long">
					<GalleryKenBurns samplePath="/images/j.vache/j.vache.[ID].jpg" idmax={73}/>
					<div className="about__content">
					{
						Object.values(T2("long")).map((article, k) =>(
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
										article.content && 
											Object.values(article.content).map((subarticle, k2) => (
												<span key={k2}>
													{
														subarticle.subtitle &&
															<h2 className="text-block__subtitle">
																<p dangerouslySetInnerHTML={
																	{
																		__html:T2("long."+k+".content."+k2+".subtitle")
																	}
																}></p>
															</h2>
													}
													{
														subarticle.text &&
															<p dangerouslySetInnerHTML={
																{
																	__html:T2("long."+k+".content."+k2+".text", {
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

export default About;