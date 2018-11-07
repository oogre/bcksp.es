/*----------------------------------------*\
  bcksp.es - full.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-03 20:46:10
  @Last Modified time: 2018-11-03 21:02:44
\*----------------------------------------*/
import React, { Component } from 'react';

import HeaderMenu from './../menu/header.js';
import MenuFooter from './../menu/footer.js';


export default class TemplateFull extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="page page--home">
				<HeaderMenu />
				{
					React.Children.map(this.props.children, child => child)
				}
				<MenuFooter/>
			</div>
		);
	}
}