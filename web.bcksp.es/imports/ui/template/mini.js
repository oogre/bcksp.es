/*----------------------------------------*\
  bcksp.es - full.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-03 20:46:10
  @Last Modified time: 2019-04-06 13:30:48
\*----------------------------------------*/
import React, { Component } from 'react';


import CallToConnect from './../banner/callToConnect.js';
import HeaderMenu from './../menu/header.js';
import MenuFooter from './../menu/footer.js';
import MutationObserver from 'mutation-observer';

export default class TemplateMini extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="page page--home">
				<CallToConnect /> 
				{
					React.Children.map(this.props.children, child => child)
				}
				<MenuFooter/>
			</div>
		);
	}
}