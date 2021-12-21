/*----------------------------------------*\
  bcksp.es - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:21:49
  @Last Modified time: 2021-12-21 17:00:59
\*----------------------------------------*/

import React from 'react';
import AboutPress from './about/press.js';
import AboutArtists from './about/artists.js';
import { config } from './../startup/config.js'
import { nf } from "./../utilities/math.js";
import VimeoEmbed from './shared/vimeoEmbed.js';

//import GalleryKenBurns from './gallery/kenBurns.js';
import { getTranslations } from "./../i18n/index.js";
// App component - represents the whole app
const About = () => {
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("about");
	React.useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	
	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<C>title</C>
					</h1>
				</div>
			
				<div className="about--long">
					<div className="about__content">
						<VimeoEmbed vimeoID="659004167" className="container"/>
						{
							Object.values(T("long")).map((article, k) => (
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
														<C 	bookMaxChar={nf(config.book.getMaxChar())} 
															bookMaxPage={nf(config.book.page.count)} 
															download={FlowRouter.path("downloadArchive")}
															money={FlowRouter.path("about")+"#money"}
															deletion={FlowRouter.path("about")+"#deletion"}
															souvenir={FlowRouter.path("souvenir")}
															userProfile={FlowRouter.path("userProfile")}
														>
															{"long."+k+".content."+k2+".text"}
														</C>
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