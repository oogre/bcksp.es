/*----------------------------------------*\
  bcksp.es - error.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 16:20:01
  @Last Modified time: 2019-02-23 17:46:10
\*----------------------------------------*/
import React, { Component } from 'react';

export default class FixeError extends Component {
	constructor(props){
		super(props);
	}
	renderError(message){

	}
	render() {
		return (
			<div className="message error-message">
				{
					React.Children.map(this.props.children, child => child)
				}
			</div>
		);
	}
}