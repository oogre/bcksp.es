/*----------------------------------------*\
  bcksp.es - detail.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-11 16:15:12
  @Last Modified time: 2020-03-02 18:16:54
\*----------------------------------------*/

import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Orders } from "./../../api/souvenirs/souvenirs.js";
import GeneratorPoster from './../generator/poster.js';

const OrderDetail = ({orders, isReady}) => {
	if(!isReady)return (null);
	
	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						Votre commande
					</h1>
				</div>
				<div className="shop">
					<div className="shop__example-illustration">
						<GeneratorPoster className="shop__example-illustration-img" sentence={orders.souvenir.data.sentence} shapes={orders.souvenir.data.shapes} disallowRegenerate={true}/>
					</div>
					<div className="shop__example-detail">
						<p className="shop__example-description">
							status de la commande : {orders.status}
						</p>
						<p className="shop__example-description">
							{orders.delivery.fullname} <br/>
							{orders.delivery.address} <br/>
							{orders.delivery.zip} - {orders.delivery.city} <br/>
							{orders.delivery.country}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}



export default withTracker(self => {
	return {
		isReady : Meteor.userId() && FlowRouter.subsReady("order.get"),
		orders : Orders.find({}).fetch().map(order=>order.populate())[0]
	};
})(OrderDetail);