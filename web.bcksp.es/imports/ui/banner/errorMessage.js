/*----------------------------------------*\
  bcksp.es - errorMessage.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-19 19:16:33
  @Last Modified time: 2020-01-25 19:33:26
\*----------------------------------------*/
import React, {useEffect} from 'react';
import T from './../../i18n/index.js';
import { withTracker } from 'meteor/react-meteor-data';

let timeout;
const ErrorMessage = ({error}) => {

	useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			Meteor.clearTimeout(timeout);
		}
	}, []);
	if(error){
		Meteor.clearTimeout(timeout);
		timeout = Meteor.setTimeout(()=>Session.set("error", false), 3000);
		return (
			<div className="call-to-connect" style={{
				position: "fixed",
				width: "100%",
				zIndex: '1',
				background: "#ff0440"
			}}>
				<div className="container--large">
					<p className="call-to-connect__title">{error?.type}</p>
					<p className="call-to-connect__content">{error?.value}</p>
				</div>
			</div>
		);
	}
	return (null);
}

export default withTracker(self => {
	return {
		error : Session.get("error")
	};
})(ErrorMessage);
