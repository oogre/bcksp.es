/*----------------------------------------*\
  bcksp.es - success.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 21:22:35
  @Last Modified time: 2019-12-19 21:22:50
\*----------------------------------------*/
import React, { Component } from 'react';

export default class MessageSuccess extends Component {
	constructor(props){
		super(props);
	}
	renderError(message){

	}
	render() {
		return (
			<div className="message success-message">
				{ this.props.messages }
			</div>
		);
	}
}