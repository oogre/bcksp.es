/*----------------------------------------*\
  bcksp.es - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:21:49
  @Last Modified time: 2020-02-17 13:31:08
\*----------------------------------------*/

import React, { useEffect, useState } from 'react';
import AboutPress from './about/press.js';
import AboutArtists from './about/artists.js';
import { config } from './../startup/config.js'
import YoutubeEmbed from './shared/youtubeEmbed.js';
import GalleryKenBurns from './gallery/kenBurns.js';
import { scrollTo } from './../utilities/ui.js';

// App component - represents the whole app
const About = () => {
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const T2 = i18n.createTranslator("about");
	const T = i18n.createComponent(T2);
	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title"><T>title</T></h1>
				</div>
			
				<div className="about--long">
					<div className="about__content">
						<YoutubeEmbed youtubeID="hGB58ybRoJU" className="container"/>
						{
							Object.values(T2("long")).map((article, k) => (
								<div key={k} className="text-block">
									{
										article?.title &&
										<a id={ article.title.id } href={"#"+article.title.id} className="text-block__link--title">
											<h3 className="text-block__title">
												{article?.title.value} {/*<T>{"long."+k+".title.value"}</T>*/}
											</h3>
										</a>
									}
									{	
										article?.content && 
										Object.values(article.content).map((subarticle, k2) => (
											<div key={k2}>
												{
													subarticle?.subtitle &&
													<h2 className="text-block__subtitle">
														{subarticle.subtitle} {/*<T>{"long."+k+".content."+k2+".subtitle"}</T>*/}
													</h2>
												}
												{
													subarticle?.text &&
													<p>
														<T 	bookMaxChar={config.book.getMaxChar()} 
															bookMaxPage={config.book.page.count} 
															download={FlowRouter.path("downloadArchive")}
															money={FlowRouter.path("about")+"#money"}
															deletion={FlowRouter.path("about")+"#deletion"}
															souvenir={FlowRouter.path("souvenir")}
														>
															{"long."+k+".content."+k2+".text"}
														</T>
													</p>
												}
											</div>
										))
									}
									<hr className="field-separator" />
								</div>
							))
						}
					</div>
				</div>
			</div>
			<AboutArtists/>
		</div>
	);
}

export default About;