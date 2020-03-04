/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:32:03
  @Last Modified time: 2020-03-04 18:37:00
\*----------------------------------------*/

import React from 'react';
import { config } from './../../../../startup/config.js';
import { getTranslations } from "./../../../../i18n/index.js";

// App component - represents the whole app
const SouvenirItemPosterBadge = () => {
	const {C} = getTranslations("souvenir.item.poster");
	return (
		<li className="souvenir__item">
			<a className="souvenir__link" href={FlowRouter.path("posterDescription")}>
				<div className="wrapper">
					<img className="souvenir__link-image" src="/images/souvenirs/poster.png" alt=""/>
				</div>
				<span className="souvenir__link-title">
					<C>title</C>
				</span>
				<span className="souvenir__link-badge">
					<C amount={config.souvenir.poster.price.amount}>price</C>
				</span>
			</a>
		</li>
	);
}

export default SouvenirItemPosterBadge;

