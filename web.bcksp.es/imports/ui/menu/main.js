/*----------------------------------------*\
  bcksp.es - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 14:03:42
  @Last Modified time: 2018-09-23 23:15:22
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import T from './../../i18n/index.js';
import * as Utilities from "./../../utilities.js";


class MenuMain extends Component {
	constructor(props){
		super(props);
		this.state = {
			mobileMenu: false,
			extensionInstalled : Utilities.isExtensionInstalled()
		}
		window.addEventListener('load', ()=>{
			this.setState({
				extensionInstalled: Utilities.isExtensionInstalled()
			});	
		});
	}

	handleOpenMobileMenu(){
		this.setState({
			mobileMenu: !this.state.mobileMenu
		});
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
				<ul className={"menu menu--header" + " " + (this.state.mobileMenu ? "visible" : "")}>
					<li className="menu__item">
						<a 	className={"menu__item__link " + (FlowRouter.current().route.name == "about" ? "active" : "")} 
							href={FlowRouter.path("about")}
						>
							<T>menus.about</T>
						</a>
					</li>
					<li className="menu__item">
						<a 	className={"menu__item__link " + (FlowRouter.current().route.name == "souvenir" ? "active" : "")} 
							href={FlowRouter.path("souvenir")}
						>
							<T>menus.souvenir</T>
						</a>
					</li>
					<li className="menu__item">
						{ 
							this.state.extensionInstalled ? 
								(
									this.props.userId ? 
										<a 	className="menu__item__link" 
											href={ FlowRouter.path("userProfile", { userId : this.props.userId }) }
										>
											profile
										</a>
									:
										<a  className="menu__item__link " 
											href={FlowRouter.path("signup")}
										>
											<T>menus.signup</T>
										</a>
								)
							:
								<a 	className={"menu__item__link " + (FlowRouter.current().route.name == "download" ? "active" : "")} 
									href={FlowRouter.path("download")}
								>
									<T>menus.download</T>
								</a>
						}
					</li>
				</ul>
			</nav>
		);
	}
}
export default withTracker(() => {
	return {
		userId : Meteor.userId()
	};
})(MenuMain);