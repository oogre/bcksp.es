/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:36:12
  @Last Modified time: 2019-12-21 14:37:07
\*----------------------------------------*/

import T from './../../../../i18n/index.js';
import React, { Component } from 'react';

// App component - represents the whole app
export default class SouvenirItemAlmanachBadge extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<li className="souvenir__item">
				<a className="souvenir__link" href={FlowRouter.path("item", {type : "almanach"})}>
					<div className="wrapper">
						<img className="souvenir__link-image" src="#" alt=""/>
					</div>
					<span className="souvenir__link-title"><T>souvenir.item.almanach.title</T></span>
					<span className="souvenir__link-badge"><T>souvenir.item.almanach.price</T></span>
				</a>
			</li>
		);
	}
}