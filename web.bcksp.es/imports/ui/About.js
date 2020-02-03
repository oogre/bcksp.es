/*----------------------------------------*\
  bcksp.es - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:21:49
  @Last Modified time: 2020-02-02 23:57:41
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

	const open = id => {
		location.hash="#"+id;
		Meteor.setTimeout(()=>scrollTo(id, 100), 20);
	}

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
								<div key={k} className="text-block" onClick={ () => open(article?.title?.id) }>
									{
										article?.title &&
										<a id={ article.title.id } href={"#"+article.title.id} className="text-block__link--title">
											<h3 className="text-block__title">
												{article?.title.value} {/*<T>{"long."+k+".title.value"}</T>*/}
											</h3>
										</a>
									}
									<div className={ k == 0 || (article?.title && ("#"+article?.title?.id) == location.hash) ? "" : " masked"}>
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
														>
															{"long."+k+".content."+k2+".text"}
														</T>
													</p>
												}
											</div>
										))
									}
									</div>
								</div>
							))
						}
						<GalleryKenBurns samplePath="/images/j.vache/j.vache.[ID].jpg" idmax={73}/>
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