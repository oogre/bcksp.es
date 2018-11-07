/*----------------------------------------*\
  bcksp.es - artists.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 18:51:56
  @Last Modified time: 2018-10-31 15:19:06
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
					<h2><T>artists.title</T></h2>
					<ul className="">
						{
							i18n.createTranslator("artists")("list").map((artist, k) =>(
								<li className="" key={k} >	
									<h3>{artist.name}</h3>
									<p dangerouslySetInnerHTML={{__html: artist.bio}} ></p>
									<ul className="">
										{
											artist.links.map((link, k) =>(
												<li className="" key={k} >	
													<a href={link}>{link}</a>
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
		);
	}
}