/*----------------------------------------*\
  bcksp.es - successMessage.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-25 18:07:51
  @Last Modified time: 2020-01-28 21:17:49
\*----------------------------------------*/
/*----------------------------------------*\
  bcksp.es - errorMessage.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-19 19:16:33
  @Last Modified time: 2020-01-19 21:56:55
\*----------------------------------------*/
import React, {useEffect} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

let timeout;
const SuccessMessage = ({message}) => {
	useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			Meteor.clearTimeout(timeout);
		}
	}, []);
	if(message){
		Meteor.clearTimeout(timeout);
		timeout = Meteor.setTimeout(()=>Session.set("success", false), 5000);
		return (
			<div className="call-to-connect" style={{
				position: "fixed",
				width: "100%",
				zIndex: '1',
				background: "#6bc97d"
			}}>
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
