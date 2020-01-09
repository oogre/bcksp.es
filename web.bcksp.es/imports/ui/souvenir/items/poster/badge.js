/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:32:03
  @Last Modified time: 2019-12-21 15:15:01
\*----------------------------------------*/

import T from './../../../../i18n/index.js';
import React, { Component } from 'react';

// App component - represents the whole app
export default class SouvenirItemPosterBadge extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<li className="souvenir__item">
				<a className="souvenir__link" href={FlowRouter.path("posterDescription")}>
					<div className="wrapper">
						<img className="souvenir__link-image" src="/images/souvenirs/poster.png" alt=""/>
					</div>
					<span className="souvenir__link-title"><T>souvenir.item.poster.title</T></span>
					<span className="souvenir__link-badge"><T>souvenir.item.poster.price</T></span>
				</a>
			</li>
		);
	}
}

