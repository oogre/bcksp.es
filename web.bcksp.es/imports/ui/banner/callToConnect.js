/*----------------------------------------*\
  bcksp.es - callToConnect.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 19:41:50
  @Last Modified time: 2020-01-31 12:48:48
\*----------------------------------------*/
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

const CallToConnect = ({isConnected, extensionInstalled}) => {
	if(isConnected || !extensionInstalled) return (null);
	
	const T = i18n.createComponent("extension.call");
	
	return (
		<div className="call-to-connect">
			<div className="container--large">
				<p className="call-to-connect__title">
					<T>login</T>
				</p>
				<p className="call-to-connect__content">
					<T>instruction</T>
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
