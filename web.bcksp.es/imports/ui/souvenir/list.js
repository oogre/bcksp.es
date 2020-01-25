/*----------------------------------------*\
  bcksp.es - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-17 08:17:22
  @Last Modified time: 2020-01-25 19:55:25
\*----------------------------------------*/

import React from 'react';
import T from './../../i18n/index.js';
import { config } from './../../startup/config.js';
import { withTracker } from 'meteor/react-meteor-data';
import SouvenirItemBookBadge from "./items/book/badge.js";
import SouvenirItemPosterBadge from "./items/poster/badge.js";
import SouvenirItemContactBadge from "./items/contact/badge.js";
import SouvenirItemAlmanachBadge from "./items/almanach/badge.js";
import SouvenirItemDownloadBadge from "./items/download/badge.js";

const Souvenir = ({isConnected}) => {
	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title"><T>souvenir.title2</T></h1>
					<h2 className="page__subtitle"><T>souvenir.subtitle</T></h2>
				</div>
				<ul className="souvenir">
					{ isConnected && <SouvenirItemDownloadBadge/> }
					{ isConnected && <SouvenirItemBookBadge/> }
					<SouvenirItemPosterBadge/>
					<SouvenirItemContactBadge/>
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
