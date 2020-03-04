/*----------------------------------------*\
  bcksp.es - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-17 08:17:22
  @Last Modified time: 2020-03-04 19:54:13
\*----------------------------------------*/

import React from 'react';
import { config } from './../../startup/config.js';
import { withTracker } from 'meteor/react-meteor-data';
import SouvenirItemBookBadge from "./items/book/badge.js";
import { getTranslations } from "./../../i18n/index.js";
import SouvenirItemPosterBadge from "./items/poster/badge.js";
import SouvenirItemContactBadge from "./items/contact/badge.js";
import SouvenirItemAlmanachBadge from "./items/almanach/badge.js";
import SouvenirItemDownloadBadge from "./items/download/badge.js";

const Souvenir = ({isConnected}) => {
	const {C} = getTranslations("souvenir");
	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<C>title2</C>
					</h1>
					<h2 className="page__subtitle">
						<C>subtitle</C>
					</h2>
				</div>
				<ul className="souvenir">
					{ isConnected && <SouvenirItemDownloadBadge/> }
					{ isConnected && <SouvenirItemBookBadge/> }
					{false && <SouvenirItemPosterBadge/>}
					{false && <SouvenirItemContactBadge/>}
					{ config.souvenir.almanach && <SouvenirItemAlmanachBadge/> }
				</ul>
			</div>
		</div>
	);
}

export default withTracker(self => {
	return {
		isConnected : Meteor.userId(),
	};
})(Souvenir);
