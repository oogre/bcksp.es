/*----------------------------------------*\
  bcksp.es - artists.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 18:51:56
  @Last Modified time: 2021-03-03 13:45:06
\*----------------------------------------*/
import React from 'react';
import { getTranslations } from "./../../i18n/index.js";

// App component - represents the whole app
const AboutArtists = () => {
	const {C, T} = getTranslations("artists");
	return (
		<div className="artists">
			<div className="container">
				<div className="artists__column">

				</div>
				<div className="artists__column">
					<a id={T("title")} href={"#"+T("title")} className="text-block__link--title">
						<h3 className="text-block__title artists__title">
							<C>title</C>
						</h3>
					</a>
					<p className="artists__intro">
						<C>intro</C>
					</p>
					<ul className="artists-list">
						{
							Object.values(T("list")).map((artist, k) =>(
								<li className="artist" key={k} >
									<h3 className="artist__name">{artist.name}</h3>
									<ul className="artist__picture">
										{
											artist.pic && 
											Object.values(artist.pic).map((pic, k) =>(
												<li key={k}>
													<img alt="" src={pic}/>
												</li>
											))
										}
									</ul>
									<p className="artist__description">
										<C>
											{"list."+k+".bio"}
										</C>
									</p>
									<ul className="artist__social-list">
										{
											artist.links && 
											Object.values(artist.links).map((link, k2) =>(
												<li className="artist__social-list-item" key={k2} >
													<a className="artist__social-link" href={link} rel="noopener noreferrer" target="_blank">
														<img alt="" src="/images/icons/icon-globe.svg"/>
														<div className="sr-only">
															<C>{"list."+k+".links."+k2}</C>
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