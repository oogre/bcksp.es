/*----------------------------------------*\
  bcksp.es - footer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:15:55
  @Last Modified time: 2020-03-04 18:45:57
\*----------------------------------------*/

import React from 'react';
import FixeWait from './../fixe/wait.js'
import { getTranslations } from "./../../i18n/index.js";
import { withTracker } from 'meteor/react-meteor-data';
import { installExtension } from "./../../utilities/ui.js";
import { HardDisconnect } from "./../../api/users/methods.js";
import { errorHandler, successHandler } from './../../utilities/ui.js';

const MenuFooter = ({isConnected, extensionInstalled}) => {
	const [loading, setLoading] = React.useState(false);
	const {C, C1} = getTranslations("menus", "forms");
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
										<C>about</C>
									</a>
								</li>
								<li className="menu__item">
									<a className="menu__item-link" href={FlowRouter.path("contact", {type : "salut"})}>
										<C>contact</C>
									</a>
								</li>
								<li className="menu__item">
									<a className="menu__item-link" href={FlowRouter.path("about")+"#auteurs"}>
										<C>authors</C>
									</a>
								</li>
								<li className="menu__item">
									<a className="menu__item-link" href="#" onClick={installExtension}>
										<C>download</C>
									</a>
								</li>
								{
									isConnected &&
										<li className="menu__item">
											<a 	className="menu__item-link"
												href={ FlowRouter.path("userProfile") }
											>
												<C>profile</C>
											</a>
										</li>
								}
								{
									isConnected &&
										<li className="menu__item">
											{ loading && <FixeWait/> }
											{ !loading && 
												<a className="menu__item-link" href="#" onClick={handleLogout}>
													<C1>logout.action</C1>
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
									<a className="menu__item-link" target="_blank" href="https://github.com/oogre/bcksp.es">github</a>
								</li>
								<li className="menu__item">
									<a className="menu__item-link" target="_blank" href="https://www.facebook.com/bcksp.es/">facebook</a>
								</li>
								<li className="menu__item">
									<a className="menu__item-link" target="_blank" href="https://twitter.com/bckspes">twitter</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="column">
						<div className="column__content">
							<ul className="menu menu--footer">
								<li className="menu__item ">
									<C>supportedBy</C>
								</li>
								<li className="menu__item ">
									<a className="menu__item-link" target="_blank" href="http://www.arts-numeriques.culture.be/">
										fwb
									</a>
								</li>
								<li className="menu__item">
									<a className="menu__item-link " target="_blank" href="https://www.patreon.com/bckspes">
										<C>helpUs</C>
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
