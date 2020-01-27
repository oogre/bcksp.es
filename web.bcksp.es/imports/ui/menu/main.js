/*----------------------------------------*\
  bcksp.es - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 14:03:42
  @Last Modified time: 2020-01-26 23:27:18
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { installExtension } from "./../../utilities/ui.js";

const MenuMain = ( {extensionInstalled, isConnected} ) => {

	const [mobileMenu, setMobileMenu] = useState(false);
	const [langMenu, setLangMenu] = useState(false);
	
	const handleOpenMobileMenu = () => {
		setMobileMenu(!this.state.mobileMenu);
	}

	const hasToDisplayDownloadBtn = () => {
		return !extensionInstalled;
	}

	const hasToDisplayProfileBtn = ()=>{
		return isConnected && extensionInstalled;
	}

	const isActive = route => {
		if(FlowRouter.current().route.name == route)return " active";
		return "";
	}

	const isMobile = () => {
		if(mobileMenu)return " visible";
		return "";
	}

	const toggleLangMenu = () =>{
		setLangMenu(!langMenu);
	}

	const setLang = lang => {
		i18n.setLocale(lang);
		Session.set("locale", lang);
		toggleLangMenu();
	}

	return (
		<nav className="main-navigation">
			<button type="button" className="menu--header__mobile-trigger" onClick={handleOpenMobileMenu}>
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
				<span className="sr-only">
					<T>menus.open</T>
				</span>
			</button>
			<ul className={"menu menu--header" + isMobile()}>
				<li className="menu__item">
					<a 	className={"menu__item-link " + isActive("about")}
						href={FlowRouter.path("about")}
					>
						<T>menus.about</T>
					</a>
				</li>
				<li className="menu__item">
					<a 	className={"menu__item-link" + isActive("souvenir")}
						href={FlowRouter.path("souvenir")}
					>
						<T>menus.souvenir</T>
					</a>
				</li>
				{
					hasToDisplayDownloadBtn() &&
						<li className="menu__item">
							<a 	className={"button button--primary" + isActive("download")}
								onClick={installExtension}
							>
								<T>menus.download</T>
							</a>
						</li>
				}
				{
					hasToDisplayProfileBtn() &&
						<li className="menu__item">
							<a 	className={"menu__item-link" + isActive("userProfile")}
								href={ FlowRouter.path("userProfile") }
							>
								<T>menus.profile</T>
							</a>
						</li>
				}
				<li className="menu__item">
					<a 	className={"menu__item-link" + isActive("souvenir")}
						href="#"
						onClick={toggleLangMenu}
					>
						<T>menus.langue</T>
					</a>
					{ 
						langMenu && 
							<ul style={{position:"absolute"}}>
								<li>
									<a 	className={"menu__item-link" + isActive("souvenir")} href="#" onClick={()=>setLang("fr")}>
										français
									</a>
								</li>
								<li>
									<a 	className={"menu__item-link" + isActive("souvenir")} href="#" onClick={()=>setLang("en")}>
											english
									</a>
								</li>
							</ul>
					}
				</li>
			</ul>
		</nav>
	);
}
export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(MenuMain);
