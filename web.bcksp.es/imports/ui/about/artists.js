/*----------------------------------------*\
  bcksp.es - artists.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 18:51:56
  @Last Modified time: 2019-03-24 17:31:25
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';

// App component - represents the whole app
export default class AboutArtists extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="artists">
				<div className="container">
					<div className="artists__column">

					</div>
					<div className="artists__column">
						<h3 className="artists__title"><T>artists.title</T></h3>
						<p className="artists__intro"><T>artists.intro</T></p>
						<ul className="artists-list">
							{
								i18n.__("artists.list").map((artist, k) =>(
									<li className="artist" key={k} >
										<h3 className="artist__name">{artist.name}</h3>
										<p className="artist__description" dangerouslySetInnerHTML={{__html: artist.bio}} ></p>
										<ul className="artist__social-list">
											{
												artist.links.map((link, k) =>(
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
}