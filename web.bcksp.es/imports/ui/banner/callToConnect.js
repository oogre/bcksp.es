/*----------------------------------------*\
  bcksp.es - callToConnect.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 19:41:50
  @Last Modified time: 2020-01-19 19:15:36
\*----------------------------------------*/
import React from 'react';
import T from './../../i18n/index.js';
import { withTracker } from 'meteor/react-meteor-data';

const CallToConnect = ({isConnected, extensionInstalled}) => {

	if(!isConnected && extensionInstalled){
		return (
			<div className="call-to-connect">
				<div className="container--large">
					<p className="call-to-connect__title"><T>extension.call.login</T></p>
					<p className="call-to-connect__content"><T>extension.call.instruction</T></p>
				</div>
			</div>
		);
	}
	return (null);
}

export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(CallToConnect);
