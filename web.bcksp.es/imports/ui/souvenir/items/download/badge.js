/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:22:25
  @Last Modified time: 2020-01-25 19:17:45
\*----------------------------------------*/
import React from 'react';
import T from './../../../../i18n/index.js';

// App component - represents the whole app
const SouvenirItemDownloadBadge = () => {
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
export default SouvenirItemDownloadBadge;