/*----------------------------------------*\
  bcksp.es - Stat.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 00:31:09
  @Last Modified time: 2020-01-09 16:15:02
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from "./../api/archives/archives.js";
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
							this.props.isReady && this.props.usersCounter
						}
					</h2>
					
					<hr className="field-separator" />
					<h2 className="page__subtitle">Nombre d'utilisateurs connecté : 
						{
							this.props.isReady && this.props.usersConnectedCounter
						}
					</h2>
					
					<hr className="field-separator" />
					<h2 className="page__subtitle">Nombre de caractères archivées : 
						{
							this.props.isReady && this.props.archive[0].count
						}
					</h2>
				</div>
			</div>
		);
	}
}

export default withTracker(self => {
	return {
		isReady : Meteor.userId() && FlowRouter.subsReady("users.counter") && FlowRouter.subsReady("archive.public.counter"),
		usersCounter : Counts.get("users.counter"),
		usersConnectedCounter : Counts.get("users.connected.counter"),
		archive : Archives.find({}).fetch()
	};
})(Stat);
