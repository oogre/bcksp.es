/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:34:12
  @Last Modified time: 2019-12-21 14:35:07
\*----------------------------------------*/

import T from './../../../../i18n/index.js';
import React, { Component } from 'react';

// App component - represents the whole app
export default class SouvenirItemContactBadge extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<li className="souvenir__item">
				<a className="souvenir__link" href={FlowRouter.path("item", {type : "contact"})}>
					<div className="wrapper">
						<img className="souvenir__link-image" src="/images/souvenirs/contact.1.jpg" alt=""/>
					</div>
					<span className="souvenir__link-title"><T>souvenir.item.contact.title</T></span>
				</a>
			</li>
		);
	}
}