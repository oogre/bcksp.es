/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:27:09
  @Last Modified time: 2020-02-24 20:00:31
\*----------------------------------------*/

import React, { useEffect } from 'react';
import Progress from "./../../../shared/progress.js";
import { withTracker } from 'meteor/react-meteor-data';
import { config } from './../../../../startup/config.js';
import { Archives } from './../../../../api/archives/archives.js';


// App component - represents the whole app
const SouvenirItemBookBadge = ({isReady, handle, archive}) => {
	const T = i18n.createComponent("souvenir.item.book");

	useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			handle && handle.stop();
		}
	}, []);

	if(!isReady || !archive)return (null);

	return (
		<li className="souvenir__item">
			<a className="souvenir__link" href={FlowRouter.path("bookDescription")}>
				<Progress //souvenir__counter-label
					percent={archive.count / config.book.getMaxChar()}
					colorFg="#fff123"
					colorBg="#000000"
					diameter={250}
					thickness={15}
					thicknessRatio={0.5}
				>
					<img src="/images/souvenirs/book.png"/>
				</Progress>
				<span className="souvenir__link-title"><T>title</T></span>
				<span className="souvenir__link-badge"><T amount={config.souvenir.book.basic.price.amount}>price</T></span>
			</a>
		</li>

	);
}

export default withTracker(self => {
	let handle = Meteor.userId() && Meteor.subscribe('archive.private.counter');
	return {
		handle : handle,
		isReady : handle && handle.ready(),
		archive : Archives.findOne({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId()
		}, {
			fields : {
				count : 1
			}
		})
	};
})(SouvenirItemBookBadge);
