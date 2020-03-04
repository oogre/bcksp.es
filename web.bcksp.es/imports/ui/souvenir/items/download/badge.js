/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:22:25
  @Last Modified time: 2020-03-04 18:35:04
\*----------------------------------------*/
import React from 'react';
import { getTranslations } from "./../../../../i18n/index.js";

// App component - represents the whole app
const SouvenirItemDownloadBadge = () => {
	const {C} = getTranslations("souvenir.item.download");
	return (
		<li className="souvenir__item">
			<a className="souvenir__link" href={FlowRouter.path("downloadArchive")}>
				<img className="souvenir__link-image" src="#" src="/images/souvenirs/archive.svg" alt="" />
				<span className="souvenir__link-title">
					<C>title</C>
				</span>
				<span className="souvenir__link-badge souvenir__link-badge--free">
					<C>price</C>
				</span>
			</a>
		</li>
	);
}
export default SouvenirItemDownloadBadge;