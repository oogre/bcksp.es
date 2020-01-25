/*----------------------------------------*\
  bcksp.es - footer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:15:55
  @Last Modified time: 2020-01-25 21:20:31
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { useState } from 'react';
import FixeWait from './../fixe/wait.js'
import { withTracker } from 'meteor/react-meteor-data';
import { installExtension } from "./../../utilities/ui.js";
import { HardDisconnect } from "./../../api/users/methods.js";
import { errorHandler, successHandler } from './../../utilities/ui.js';

const MenuFooter = ({isConnected, extensionInstalled}) => {
	const [loading, setLoading] = useState(false);
	
	const handleLogout = () => {
		if(loading)return;
		setLoading(true);
		HardDisconnect.call((error, res)=>{
			setLoading(false);
			if (errorHandler(error))return;
			if(successHandler(res)){
				FlowRouter.go('home');
			}
		});
	}

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
									<a className="menu__item-link" href={FlowRouter.path("about")+"#auteurs"}>
										<T>menus.authors</T>
									</a>
								</li>
								{
									!extensionInstalled &&
										<li className="menu__item">
											<a className="menu__item-link" href="#" onClick={installExtension}>
												<T>menus.download</T>
											</a>
										</li>
								}
								{
									isConnected && extensionInstalled &&
										<li className="menu__item">
											<a 	className="menu__item-link"
												href={ FlowRouter.path("userProfile") }
											>
												profile
											</a>
										</li>
								}
								{
									isConnected && extensionInstalled &&
										<li className="menu__item">
											{ loading && <FixeWait/> }
											{ !loading && 
												<a className="menu__item-link" href="#" onClick={handleLogout}>
													<T>forms.logout.action</T>
												</a>
											}
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
export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(MenuFooter);
