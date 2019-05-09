/*----------------------------------------*\
  bcksp.es - tooltip.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-05-05 13:07:57
  @Last Modified time: 2019-05-05 16:27:06
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

export default class Tooltip extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<ReactTooltip id={this.props.id} className="tooltip" type="dark" delayShow={1500} effect="solid">
				{ this.props.children }
			</ReactTooltip>
		);
	}
}