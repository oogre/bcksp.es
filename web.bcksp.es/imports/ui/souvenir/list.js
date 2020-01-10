/*----------------------------------------*\
  bcksp.es - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-17 08:17:22
  @Last Modified time: 2020-01-09 23:43:20
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { config } from './../../startup/config.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import Progress from "./../shared/progress.js";
import SouvenirItemDownloadBadge from "./items/download/badge.js";
import SouvenirItemBookBadge from "./items/book/badge.js";
import SouvenirItemPosterBadge from "./items/poster/badge.js";
import SouvenirItemContactBadge from "./items/contact/badge.js";
import SouvenirItemAlmanachBadge from "./items/almanach/badge.js";

// App component - represents the whole app
class Souvenir extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title"><T>souvenir.title2</T></h1>
						<h2 className="page__subtitle"><T>souvenir.subtitle</T></h2>
					</div>
					<ul className="souvenir">
						{ this.props.isConnected && <SouvenirItemDownloadBadge/> }
						{ this.props.isConnected && <SouvenirItemBookBadge/> }
						<SouvenirItemPosterBadge/>
						<SouvenirItemContactBadge/>
						{ config.souvenir.almanach && <SouvenirItemAlmanachBadge/> }
					</ul>
				</div>
			</div>
		);
	}
}
export default withTracker(self => {
	let handle = Meteor.userId();
	return {
		isConnected : Meteor.userId(),
	};
})(Souvenir);
