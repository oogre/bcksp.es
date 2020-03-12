/*----------------------------------------*\
  bcksp.es - TermesOfUse.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-03-09 17:59:41
  @Last Modified time: 2020-03-10 17:51:42
\*----------------------------------------*/


import React from 'react';
import { config } from './../startup/config.js'
import { nf } from "./../utilities/math.js";
import YoutubeEmbed from './shared/youtubeEmbed.js';
import GalleryKenBurns from './gallery/kenBurns.js';
import { getTranslations } from "./../i18n/index.js";
// App component - represents the whole app
const TermesOfUse = () => {
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("termesOfUse");
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
			
				<div className="termes-of-user">
					<div className="termes-of-user__content">
						{
							Object.values(T("website")).map((article, k) => (

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
															{"website."+k+".content."+k2+".text"}
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
						{
							Object.values(T("extensions")).map((article, k) => (
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
															{"content."+k+".content."+k2+".text"}
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
		</div>
	);
}

export default TermesOfUse;