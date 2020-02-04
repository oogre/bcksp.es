/*----------------------------------------*\
  bcksp.es - artists.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 18:51:56
  @Last Modified time: 2020-02-03 14:57:16
\*----------------------------------------*/
import React from 'react';

// App component - represents the whole app
const AboutArtists = () => {
	const T2 = i18n.createTranslator("artists");
	const T = i18n.createComponent(T2);

	return (
		<div className="artists">
			<div className="container">
				<div className="artists__column">

				</div>
				<div className="artists__column">
					<a id={T2("artists.title")} href={"#"+T2("title")} className="text-block__link--title">
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
										<T>
											{"list."+k+".bio"}
										</T>
									</p>
									<ul className="artist__social-list">
										{
											artist.links && 
											Object.values(artist.links).map((link, k2) =>(
												<li className="artist__social-list-item" key={k2} >
													<a className="artist__social-link" href={link} target="_blank">
														<img alt="" src="/images/icons/icon-globe.svg"/>
														<div className="sr-only">
															<T>{"list."+k+".links."+k2}</T>
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