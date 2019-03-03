/*----------------------------------------*\
  bcksp.es - success.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 16:20:09
  @Last Modified time: 2019-02-23 16:43:29
\*----------------------------------------*/
import React, { Component } from 'react';

export default class FixeSuccess extends Component {
	constructor(props){
		super(props);
	}
	renderError(message){

	}
	render() {
		return (
			<div className="message success-message">
				{
					React.Children.map(this.props.children, child => child)
				}
			</div>
		);
	}
}