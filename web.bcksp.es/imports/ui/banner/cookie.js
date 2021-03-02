/*----------------------------------------*\
  bcksp.es - cookie.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-07-02 23:14:06
  @Last Modified time: 2020-07-03 00:02:57
\*----------------------------------------*/
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { getTranslations } from "./../../i18n/index.js";

const Cookie = ({isConnected, isAccepted}) => {
	if(isConnected || isAccepted) return (null);
	const {C} = getTranslations("termesOfUse.cookie.call");
	return (
		<div className="call-to-connect cookie">
			
				<button className="close-button" onClick={ ()=>Session.set("cookieAccepted", true) }>
					<div className="bar"></div>
					<div className="bar"></div>
					<span className="sr-only">
						<C>close</C>
					</span>
				</button>
				<div className="container--large">
					<p className="call-to-connect__title">
						<C>title</C>
					</p>
					<p className="call-to-connect__content">
						<C>message</C>
					</p>
				</div>
		</div>
		
	);

}

export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		isAccepted : Session.get("cookieAccepted")
	};
})(Cookie);
