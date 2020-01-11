/*----------------------------------------*\
  bcksp.es - Stat.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 00:31:09
  @Last Modified time: 2020-01-11 16:18:26
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from "./../api/archives/archives.js";
import { Souvenirs, Orders , OrderState} from "./../api/souvenirs/souvenirs.js";
// App component - represents the whole app

class Stat extends Component {
	constructor(props){
		super(props);
	}
	render() {
		if(!this.props.isReady)return (null);
		
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title">STAT</h1>
					</div>
					<h2 className="page__subtitle">Nombre d'utilisateurs : 
						{
							this.props.usersCounter
						}
					</h2>
					
					<hr className="field-separator" />
					<h2 className="page__subtitle">Nombre d'utilisateurs connecté : 
						{
							this.props.usersConnectedCounter
						}
					</h2>
					
					<hr className="field-separator" />
					<h2 className="page__subtitle">Nombre de caractères archivées : 
						{
							this.props.archive[0].count
						}
					</h2>
					
					<hr className="field-separator" />
					<h2 className="page__subtitle">Commandes : 
						{
							this.props.orders.length
						}
					</h2>
					<table style={{width:"100%"}}>
  						<thead>
  							<tr>
	    						<th>Order._id</th>
	    						<th>Souvenir._id</th>
	    						<th>Souvenir.type</th>
	    						<th>Order.status</th>
    						</tr>
  						</thead>
  						<tbody>
  						{
							this.props.orders.map((order, k) => (
								<tr key={k}>
									<td><a href={FlowRouter.path("orderDetail", {id : order._id})}>{ order._id }</a></td>
									<td>{ order.souvenir?._id || "undefined" }</td>
									<td>{ order.souvenir?.type || "undefined" }</td>
									<td>{ OrderState.properties[order.status].name }</td>
								</tr>
							))
						}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default withTracker(self => {
	return {
		isReady : Meteor.userId() && FlowRouter.subsReady("users.counter") && FlowRouter.subsReady("archive.public.counter") && FlowRouter.subsReady("order.all"),
		usersCounter : Counts.get("users.counter"),
		usersConnectedCounter : Counts.get("users.connected.counter"),
		orders : Orders.find({}).fetch().map(order=>order.populate()),
		archive : Archives.find({}).fetch()
	};
})(Stat);
