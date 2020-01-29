/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:22:25
  @Last Modified time: 2020-01-28 22:45:57
\*----------------------------------------*/
import React from 'react';

// App component - represents the whole app
const SouvenirItemDownloadBadge = () => {
	const T = i18n.createComponent("souvenir.item.download");
	return (
		<li className="souvenir__item">
			<a className="souvenir__link" href={FlowRouter.path("downloadArchive")}>
				<img className="souvenir__link-image" src="#" src="/images/souvenirs/archive.svg" alt="" />
				<span className="souvenir__link-title"><T>title</T></span>
				<span className="souvenir__link-badge souvenir__link-badge--free"><T>price</T></span>
			</a>
		</li>
	);
}
export default SouvenirItemDownloadBadge;