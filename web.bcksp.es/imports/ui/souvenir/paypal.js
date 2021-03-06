/*----------------------------------------*\
  bcksp.es - paypal.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-17 23:23:50
  @Last Modified time: 2020-03-04 19:01:09
\*----------------------------------------*/

import React from 'react';



const Paypal = ({amount, onCreateOrder=()=>{}, onApproved=()=>{}, onCancel=()=>{}, onError=()=>{}}) => {
	const onPaypalLoaded = event => {
		if(!paypal)return;
		event?.target?.removeEventListener("load", onPaypalLoaded, false);
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
	}

	const injectPaypalScript = PAYPAL_CLIENT_ID => {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = "https://www.paypal.com/sdk/js?client-id="+PAYPAL_CLIENT_ID+"&currency=EUR&debug=true";
		document.querySelector("head").appendChild(script);
		script.addEventListener("load", onPaypalLoaded, false);
	}

	React.useEffect(() => {//componentDidMount
		if(!document.querySelector("script[src^='https://www.paypal.com/sdk/js?client-id=']")){
			Meteor.call("Souvenir.methods.getPaypalClientID", (error, PAYPAL_CLIENT_ID)=>injectPaypalScript(PAYPAL_CLIENT_ID));
		}else{
			onPaypalLoaded();
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