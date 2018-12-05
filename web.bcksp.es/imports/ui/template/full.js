/*----------------------------------------*\
  bcksp.es - full.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-03 20:46:10
  @Last Modified time: 2018-12-05 19:57:28
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
		return !this.props.isConnected && Session.get("extensionInstalled");
	}
	render() {
		return (
			<div className="page page--home">
				{ 
					this.hasToDisplayCallToConnect() && 
						<CallToConnect /> 
				}
				<HeaderMenu isConnected={this.props.isConnected}/>
				{
					React.Children.map(this.props.children, child => child)
				}
				<MenuFooter isConnected={this.props.isConnected} />
			</div>
		);
	}
}

export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId()
	};
})(TemplateFull);
