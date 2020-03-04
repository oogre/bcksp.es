/*----------------------------------------*\
  bcksp.es - callToConnect.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 19:41:50
  @Last Modified time: 2020-03-04 18:59:07
\*----------------------------------------*/
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { getTranslations } from "./../../i18n/index.js";

const CallToConnect = ({isConnected, extensionInstalled}) => {
	if(isConnected || !extensionInstalled) return (null);
	const {C} = getTranslations("extension.call");
	return (
		<div className="call-to-connect">
			<div className="container--large">
				<p className="call-to-connect__title">
					<C>login</C>
				</p>
				<p className="call-to-connect__content">
					<C>instruction</C>
				</p>
			</div>
		</div>
	);

}

export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(CallToConnect);
