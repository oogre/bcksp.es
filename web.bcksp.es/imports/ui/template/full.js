/*----------------------------------------*\
  bcksp.es - full.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-03 20:46:10
  @Last Modified time: 2018-12-07 22:00:52
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Utilities from './../../utilities.js';


import CallToConnect from './../banner/callToConnect.js';
import HeaderMenu from './../menu/header.js';
import MenuFooter from './../menu/footer.js';
import MutationObserver from 'mutation-observer';

class TemplateFull extends Component {
	constructor(props){
		super(props);
	}
	
	hasToDisplayCallToConnect(){
		return !this.props.isConnected && this.props.extensionInstalled;
	}
	render() {
		return (
			<div className="page page--home">
				{ 
					this.hasToDisplayCallToConnect() && 
						<CallToConnect /> 
				}
				<HeaderMenu isConnected={this.props.isConnected} extensionInstalled={this.props.extensionInstalled}/>
				{
					React.Children.map(this.props.children, child => child)
				}
				<MenuFooter isConnected={this.props.isConnected} extensionInstalled={this.props.extensionInstalled}/>
			</div>
		);
	}
}
export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(TemplateFull);
