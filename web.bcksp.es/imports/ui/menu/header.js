/*----------------------------------------*\
  bcksp.es - header.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 14:19:59
  @Last Modified time: 2018-12-05 19:15:07
\*----------------------------------------*/
import React, { Component } from 'react';

import MenuMain from './main.js';


export default class MenuHeader extends Component {
	constructor(props){
		super(props);
	}

	render() {
			return (
			<header className="main-header">
				<div className="container">
					<h1 className="logo logo--header">
						<a href={FlowRouter.path("home")}>
							<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#bcksp.es"/>
						</a>
					</h1>
					{
						!this.props.noMain && <MenuMain isConnected={this.props.isConnected}/>
					}
				</div>
			</header>
		);
	}
}
