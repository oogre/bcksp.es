/*----------------------------------------*\
  bcksp.es - Stat.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 00:31:09
  @Last Modified time: 2019-12-21 01:16:04
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Info } from "./../api/infos/infos.js";
// App component - represents the whole app

class Stat extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title">STAT</h1>
					</div>
					<h2 className="page__subtitle">Nombre d'utilisateurs : 
						{
							this.props.isReady && this.props.info.userCounter
						}
					</h2>
					
					<hr className="field-separator" />
					<h2 className="page__subtitle">Nombre de caractères archivées : 
						{
							this.props.isReady && this.props.info.charCounter
						}
					</h2>
				</div>
			</div>
		);
	}
}

export default withTracker(self => {
	return {
		isReady : Meteor.userId() && FlowRouter.subsReady("getInfo"),
		info : Info.findOne({})
	};
})(Stat);
