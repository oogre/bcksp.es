/*----------------------------------------*\
  bcksp.es - artists.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 18:51:56
  @Last Modified time: 2020-01-27 01:28:16
\*----------------------------------------*/
import React, { useEffect, useState } from 'react';

// App component - represents the whole app
const AboutArtists = () => {
	const [ locale, setLocale ] = useState(i18n.getLocale());
	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const T = i18n.createComponent("artists");
	const T2 = i18n.createTranslator("artists");

	return (
		<div className="artists">
			<div className="container">
				<div className="artists__column">

				</div>
				<div className="artists__column">
					<a id={i18n.__("artists.title")} href={"#"+T2("title")} className="text-block__link--title">
						<h3 className="text-block__title artists__title">
							<T>title</T>
						</h3>
					</a>
					<p className="artists__intro"><T>intro</T></p>
					<ul className="artists-list">
						{
							Object.values(T2("list")).map((artist, k) =>(
								<li className="artist" key={k} >
									<h3 className="artist__name">{artist.name}</h3>
									<p className="artist__description" dangerouslySetInnerHTML={{__html: artist.bio}} ></p>
									<ul className="artist__social-list">
										{
											artist.links && 
												Object.values(artist.links).map((link, k) =>(
													<li className="artist__social-list-item" key={k} >
														<a className="artist__social-link" href={link}>
															<img alt="" src="/images/icons/icon-globe.svg"/>
															<div className="sr-only">
																{link}
															</div>
														</a>
													</li>
												))
										}
									</ul>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		</div>
	);
}
export default AboutArtists;