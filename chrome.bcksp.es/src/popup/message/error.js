/*----------------------------------------*\
  web.bitRepublic - error.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 23:44:23
  @Last Modified time: 2019-01-04 17:31:43
\*----------------------------------------*/
import React, { Component } from 'react';

export default class MessageError extends Component {
	constructor(props){
		super(props);
	}
	renderError(message){

	}
	render() {
		return (
			<p className="message error-message">
				{ this.props.messages }
			</p>
		);
	}
}