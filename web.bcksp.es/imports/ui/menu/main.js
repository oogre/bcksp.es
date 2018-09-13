/*----------------------------------------*\
  bcksp.es - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 14:03:42
  @Last Modified time: 2018-09-13 15:23:55
\*----------------------------------------*/
import React, { Component } from 'react';

export default class MenuMain extends Component {
	constructor(props){
		super(props);
		this.state = {
			mobileMenu: false,
			extensionInstalled : false
		}
	}
	handleOpenMobileMenu(){
		this.setState({
			mobileMenu: !this.state.mobileMenu
		});
	}

	render() {
		let currentUser = Meteor.user();
		let userConnected = (!_.isEmpty(currentUser)) && currentUser._id;
		let extensionInstalled = this.state.extensionInstalled;
		return (
			<nav>
				<button type="button" className="menu--header__mobile-trigger" onClick={this.handleOpenMobileMenu.bind(this)}>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
					<span className="sr-only">Open Menu</span>
				</button>
				<ul className={"menu menu--header" + " " + (this.state.mobileMenu ? "visible" : "")}>
					<li className="menu__item">
						<a className={"menu__item__link " + (FlowRouter.current().route.name == "about" ? "active" : "")} href={FlowRouter.path("about")}>About</a>
					</li>
					<li className="menu__item">
						<a className={"menu__item__link " + (FlowRouter.current().route.name == "souvenir" ? "active" : "")} href={FlowRouter.path("souvenir")}>Souvenir</a>
					</li>
					<li className="menu__item">
						{ 
							extensionInstalled ? 
								(
									userConnected ? 
										<a 	className="menu__item__link" href={ FlowRouter.path("userProfile", { userId : userConnected }) }>profile</a>
									:
										<a className="menu__item__link " href={FlowRouter.path("login")}>login</a>
								)
							:
								<a className={"menu__item__link " + (FlowRouter.current().route.name == "download" ? "active" : "")} href={FlowRouter.path("download")} >Download</a>
						}
					</li>
				</ul>
			</nav>
		);
	}
}