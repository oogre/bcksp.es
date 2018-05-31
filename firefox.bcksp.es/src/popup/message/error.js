/*----------------------------------------*\
  web.bitRepublic - error.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 23:44:23
  @Last Modified time: 2018-05-29 17:27:21
\*----------------------------------------*/
import React from 'react';

export default class MessageError extends React.Component {
	constructor(props){
		super(props);
	}
	renderError(message){

	}
	render() {
		return (
			<div className="message error-message">
				{ this.props.messages }
			</div>
		);
	}
}