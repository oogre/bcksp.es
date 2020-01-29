/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:32:03
  @Last Modified time: 2020-01-28 22:48:11
\*----------------------------------------*/

import React from 'react';


// App component - represents the whole app
const SouvenirItemPosterBadge = () => {
	const T = i18n.createComponent("souvenir.item.poster");
	return (
		<li className="souvenir__item">
			<a className="souvenir__link" href={FlowRouter.path("posterDescription")}>
				<div className="wrapper">
					<img className="souvenir__link-image" src="/images/souvenirs/poster.png" alt=""/>
				</div>
				<span className="souvenir__link-title"><T>title</T></span>
				<span className="souvenir__link-badge"><T>price</T></span>
			</a>
		</li>
	);
}

export default SouvenirItemPosterBadge;

