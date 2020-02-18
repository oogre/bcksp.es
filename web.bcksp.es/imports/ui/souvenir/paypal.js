/*----------------------------------------*\
  bcksp.es - paypal.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-17 23:23:50
  @Last Modified time: 2020-02-17 23:33:25
\*----------------------------------------*/

import React from 'react';

const Paypal = ({amount}) => {
	React.useEffect(() => {//componentDidMount
		paypal.Buttons({
			createOrder: (data, actions) => {
				// This function sets up the details of the transaction, including the amount and line item details.
				return actions.order.create({
					purchase_units: [{
						amount: {
							value: amount
						}
					}]
				});
			},
			onApprove: (data, actions) => {
				// This function captures the funds from the transaction.
				return actions.order.capture().then( details => {
					// This function shows a transaction success message to your buyer.
					alert('Transaction completed by ' + details.payer.name.given_name);
				});
			}
		}).render('#paypal-button-container');
		return () => {//componentWillUnmount
			
		}
	}, []); 

	return (
		<div id="paypal-button-container"></div>
	)
}