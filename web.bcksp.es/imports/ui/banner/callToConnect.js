/*----------------------------------------*\
  bcksp.es - callToConnect.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 19:41:50
  @Last Modified time: 2019-04-18 16:56:28
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class CallToConnect extends Component {
	constructor(props){
		super(props);
	}

	hasToDisplayCallToConnect(){
		return !this.props.isConnected && this.props.extensionInstalled;
	}

	render() {
		if(this.hasToDisplayCallToConnect()){
			return (
				<div className="call-to-connect">
					<div className="container--large">
						<p className="call-to-connect__title"><T>extension.call.login</T></p>
						<p className="call-to-connect__content"><T>extension.call.instruction</T></p>
					</div>
				</div>
			);
		}else{
			return " ";
		}
	}
}

export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(CallToConnect);
