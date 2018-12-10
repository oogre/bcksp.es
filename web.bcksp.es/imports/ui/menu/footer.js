/*----------------------------------------*\
  bcksp.es - footer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:15:55
  @Last Modified time: 2018-12-07 22:01:43
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';
import * as Utilities from "./../../utilities.js";
//import { FacebookIcon, TwitterIcon } from 'react-share';

export default class MenuFooter extends Component {
	constructor(props){
		super(props);
	}
	handleLogout(){
		window.postMessage({
			type : "logout"
		}, "*");
		Meteor.logout();
	}

	hasToDisplayDownloadBtn(){
		return !this.props.extensionInstalled;
	}
	
	hasToDisplayProfileBtn(){
		return this.props.isConnected && this.props.extensionInstalled;
	}
	
	hasToDisplayLogoutBtn(){
		return this.props.isConnected && this.props.extensionInstalled;
	}
	
	render() {
			return (
			<footer className="main-footer">
				<div className="container">
					<nav className="main-footer__nav">
						<div className="column">
							<div className="column__content">
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("about")}>
											<T>menus.about</T>
										</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("contact")}>
											<T>menus.contact</T>
										</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("authors")}>
											<T>menus.authors</T>
										</a>
									</li>
									{	
										this.hasToDisplayDownloadBtn() &&
											<li className="menu__item">
												<a className="menu__item__link" href={FlowRouter.path("download")}>
													<T>menus.download</T>
												</a>
											</li>
									}
									{
										this.hasToDisplayProfileBtn() &&
											<li className="menu__item">
												<a 	className="menu__item__link" 
													href={ FlowRouter.path("userProfile") }
												>
													profile
												</a>
											</li>
									}
									{
										this.hasToDisplayLogoutBtn() &&
											<li className="menu__item">
												<button className="menu__item__link" onClick={this.handleLogout.bind(this)}>
													<T>forms.logout</T>
												</button>
											</li>
									}
								</ul>
							</div>
						</div>
						<div className="column">
							<div className="column__content">
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("about")}>github</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("about")}>facebook</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("contact")}>twitter</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="column">
							<div className="column__content">
								<p className="menu--footer__title">
									<T>menus.supportedBy</T>
								</p>
								<ul className="buttons-list buttons-list--footer">
									<li className="buttons-list__item buttons-list__item--fsoa">
										<a className="buttons-list__link--fsoa" target="_blank" href="http://www.kunstenenerfgoed.be/">
											fwb
										</a>
									</li>
									<li className="buttons-list__item">
										<a className="buttons-list__link buttons-list__link" target="_blank" href="http://www.vgc.be/ondersteuning/subsidies/cultuur/subsidies-kunsten">
											<T>menus.helpUs</T>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</footer>
		);
	}
}