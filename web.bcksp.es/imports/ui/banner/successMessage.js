/*----------------------------------------*\
  bcksp.es - successMessage.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-25 18:07:51
  @Last Modified time: 2020-07-02 18:04:36
\*----------------------------------------*/
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { getTranslations } from "./../../i18n/index.js";

let timeout;
const SuccessMessage = ({message, duration = 15000}) => {
	const {C} = getTranslations("menus");

	React.useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			Meteor.clearTimeout(timeout);
		}
	}, []);
	if(message){
		Meteor.clearTimeout(timeout);
		if(duration){
			timeout = Meteor.setTimeout(() => Session.set("success", false), duration);
		}
		return (
			<div className="call-to-connect success">
				<button className="close-button" onClick={ ()=>Session.set("success", false) }>
					<div className="bar"></div>
					<div className="bar"></div>
					<span className="sr-only">
						<C>close</C>
					</span>
				</button>
				<div className="container--large">
					<p className="call-to-connect__title">{message.title}</p>
					<p className="call-to-connect__content">{message.content}</p>
				</div>
				
			</div>
		);
	}
	return (null);
}

export default withTracker(self => {
	return {
		message : Session.get("success")
	};
})(SuccessMessage);
