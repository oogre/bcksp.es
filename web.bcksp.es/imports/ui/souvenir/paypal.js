/*----------------------------------------*\
  bcksp.es - paypal.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-17 23:23:50
  @Last Modified time: 2020-02-24 23:34:14
\*----------------------------------------*/

import React from 'react';

const Paypal = ({amount, onCreateOrder=()=>{}, onApproved=()=>{}, onCancel=()=>{}, onError=()=>{}}) => {
	React.useEffect(() => {//componentDidMount
		paypal.Buttons({
			createOrder: (data, actions) => {
				onCreateOrder();
				return actions.order.create({
					purchase_units: [{
						amount: {
							value: amount
						}
					}]
				});
			},
			onError: err => {
				onError(err);
			},
			onCancel: data => {
				onCancel(data);
			},
			onApprove: (data, actions) => {
				onApproved({
					order : {
						id : data.orderID
					}
				})
			}
		}).render('#paypal-button-container');
		return () => {//componentWillUnmount
			
		}
	}, []); 

	return (
		<div>
			{amount}
			<div id="paypal-button-container"></div>
		</div>
	)
}

export default Paypal;