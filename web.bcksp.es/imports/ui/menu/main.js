/*----------------------------------------*\
  bcksp.es - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 14:03:42
  @Last Modified time: 2019-01-09 20:05:50
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { installExtension } from "./../../utilities/ui.js";

class MenuMain extends Component {
	constructor(props){
		super(props);
		this.state = {
			mobileMenu: false
		}
	}

	handleOpenMobileMenu(){
		this.setState({
			mobileMenu: !this.state.mobileMenu
		});
	}

	hasToDisplayDownloadBtn(){
		return !this.props.extensionInstalled;
	}

	hasToDisplayProfileBtn(){
		return this.props.isConnected && this.props.extensionInstalled;
	}

	isActive(route){
		if(FlowRouter.current().route.name == route)return " active";
		return "";
	}

	isMobile(){
		if(this.state.mobileMenu)return " visible";
		return "";
	}

	render() {
		return (
			<nav>
				<button type="button" className="menu--header__mobile-trigger" onClick={this.handleOpenMobileMenu.bind(this)}>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
					<span className="sr-only">
						<T>menus.open</T>
					</span>
				</button>
				<ul className={"menu menu--header" + this.isMobile()}>
					<li className="menu__item">
						<a 	className={"menu__item-link " + this.isActive("about")}
							href={FlowRouter.path("about")}
						>
							<T>menus.about</T>
						</a>
					</li>
					<li className="menu__item">
						<a 	className={"menu__item-link" + this.isActive("souvenir")}
							href={FlowRouter.path("souvenir")}
						>
							<T>menus.souvenir</T>
						</a>
					</li>
					{
						this.hasToDisplayDownloadBtn() &&
							<li className="menu__item">
								<a 	className={"button button--primary" + this.isActive("download")}
									onClick={installExtension}
								>
									<T>menus.download</T>
								</a>
							</li>
					}
					{
						this.hasToDisplayProfileBtn() &&
							<li className="menu__item">
								<a 	className={"menu__item-link" + this.isActive("userProfile")}
									href={ FlowRouter.path("userProfile") }
								>
									profile
								</a>
							</li>
					}
				</ul>
			</nav>
		);
	}
}
export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(MenuMain);
