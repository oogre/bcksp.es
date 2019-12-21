/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:22:25
  @Last Modified time: 2019-12-21 14:48:06
\*----------------------------------------*/
import React, { Component } from 'react';
import T from './../../../../i18n/index.js';

// App component - represents the whole app
export default class SouvenirItemDownloadBadge extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<li className="souvenir__item">
				<a className="souvenir__link" href={FlowRouter.path("downloadArchive")}>
					<img className="souvenir__link-image" src="#" src="/images/souvenirs/archive.svg" alt="" />
					<span className="souvenir__link-title"><T>souvenir.item.download.title</T></span>
					<span className="souvenir__link-badge souvenir__link-badge--free"><T>souvenir.item.download.price</T></span>
				</a>
			</li>
		);
	}
}