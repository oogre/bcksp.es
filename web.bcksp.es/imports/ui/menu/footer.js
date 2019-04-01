/*----------------------------------------*\
  bcksp.es - footer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:15:55
  @Last Modified time: 2019-01-15 10:24:44
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { installExtension } from "./../../utilities/ui.js";
//import { FacebookIcon, TwitterIcon } from 'react-share';

class MenuFooter extends Component {
	constructor(props){
		super(props);
	}
	handleLogout(){
		alert("HELLO");
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
					<img className="main-footer__logo" src="/images/logo-glyph.svg" width="140" height="60" alt="Bcksp.es"/>
					<nav className="main-footer__nav" role="navigation">
						<div className="column">
							<div className="column__content">
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item-link" href={FlowRouter.path("about")}>
											<T>menus.about</T>
										</a>
									</li>
									<li className="menu__item">
										<a className="menu__item-link" href={FlowRouter.path("contact")}>
											<T>menus.contact</T>
										</a>
									</li>
									<li className="menu__item">
										<a className="menu__item-link" href={FlowRouter.path("authors")}>
											<T>menus.authors</T>
										</a>
									</li>
									{
										this.hasToDisplayDownloadBtn() &&
											<li className="menu__item">
												<a className="menu__item-link" href="#" onClick={installExtension}>
													<T>menus.download</T>
												</a>
											</li>
									}
									{
										this.hasToDisplayProfileBtn() &&
											<li className="menu__item">
												<a 	className="menu__item-link"
													href={ FlowRouter.path("userProfile") }
												>
													profile
												</a>
											</li>
									}
									{
										this.hasToDisplayLogoutBtn() &&
											<li className="menu__item">
												<button className="button--unstyled menu__item-link" onClick={this.handleLogout.bind(this)}>
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
										<a className="menu__item-link" href={FlowRouter.path("about")}>github</a>
									</li>
									<li className="menu__item">
										<a className="menu__item-link" href={FlowRouter.path("about")}>facebook</a>
									</li>
									<li className="menu__item">
										<a className="menu__item-link" href={FlowRouter.path("contact")}>twitter</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="column">
							<div className="column__content">
								<p className="menu--footer__title">
									<T>menus.supportedBy</T>
								</p>
								<ul className="menu menu--footer">
									<li className="menu__item ">
										<a className="menu__item-link" target="_blank" href="http://www.kunstenenerfgoed.be/">
											fwb
										</a>
									</li>
									<li className="menu__item">
										<a className="menu__item-link " target="_blank" href="http://www.vgc.be/ondersteuning/subsidies/cultuur/subsidies-kunsten">
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
export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(MenuFooter);
