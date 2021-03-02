/*----------------------------------------*\
  bcksp.es - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 14:03:42
  @Last Modified time: 2020-07-02 17:36:12
\*----------------------------------------*/
import React from 'react';

import { getTranslations } from "./../../i18n/index.js";
import { withTracker } from 'meteor/react-meteor-data';
import { installExtension } from "./../../utilities/ui.js";
import { SetUserLang } from "./../../api/users/methods.js";
import { successHandler, errorHandler } from './../../utilities/ui.js';

const MenuMain = ( {extensionInstalled, isConnected} ) => {
	const [loading, setLoading] = React.useState(false);
	const [mobileMenu, setMobileMenu] = React.useState(false);
	const [langMenu, setLangMenu] = React.useState(false);
	const {C} = getTranslations("menus");
	const handleOpenMobileMenu = () => {
		setMobileMenu(!mobileMenu);
	}
	const handleCloseMobileMenu = () => {
		setMobileMenu(false);
	}
	const handleInstallExtension = () => {
		handleCloseMobileMenu();
		installExtension();
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
	const toggleLangMenu = event => {
		event.preventDefault();
		setLangMenu(!langMenu);
		return false;
	}
	const closeLangMenu = () =>{
		setLangMenu(false);
	}
	const setLangHandler = event => {
		event.preventDefault();
		const lang = event.target.getAttribute("data-lang");
		i18n.setLocale(lang);
		closeLangMenu();
		handleCloseMobileMenu();
		if(Meteor.userId()){
			SetUserLang.call({lang}, (error, res) =>{
				if(errorHandler(error))return;
				successHandler(res);
			});
		}
		return false;
	}

	return (
		<nav className="main-navigation">
			<button type="button" className={"menu--header__mobile-trigger" + isMobile()} onClick={handleOpenMobileMenu}>
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
				<span className="sr-only">
					<C>open</C>
				</span>
			</button>
			<ul className={"menu menu--header" + isMobile()} onMouseLeave={handleCloseMobileMenu}>
				<li className="menu__item">
					<a 	className={"menu__item-link " + isActive("about")}
						href={FlowRouter.path("about")}
						onClick={handleCloseMobileMenu}
					>
						<C>about</C>
					</a>
				</li>
				<li className="menu__item">
					<a 	className={"menu__item-link" + isActive("souvenir")}
						href={FlowRouter.path("souvenir")}
						onClick={handleCloseMobileMenu}
					>
						<C>souvenir</C>
					</a>
				</li>
				{
					hasToDisplayDownloadBtn() &&
						<li className="menu__item">
							<a 	className={"button button--primary" + isActive("download")}
								onClick={handleInstallExtension}
							>
								<C>download</C>
							</a>
						</li>
				}
				{
					hasToDisplayProfileBtn() &&
						<li className="menu__item">
							<a 	className={"menu__item-link" + isActive("userProfile")}
								href={ FlowRouter.path("userProfile") }
								onClick={handleCloseMobileMenu}
							>
								<C>profile</C>
							</a>
						</li>
				}
				<li className="menu__item" onMouseLeave={closeLangMenu}>
					<a 	className="menu__item-link"
						href="#"
						onClick={toggleLangMenu}
					>
						<C>language</C>
					</a>
					{
						langMenu &&
							<ul style={{
								position:"absolute",
								listStyleType: "none",
								margin: "0",
								padding: "0",
							}}>
								{
									i18n.getLanguages().map((code, k) => (
										<li key={k}>
											<a 	className="menu__item-link" href="#" data-lang={code} onClick={setLangHandler}>
												{i18n.getLanguageNativeName(code)}
											</a>
										</li>
									))
								}
							</ul>
					}
				</li>
			</ul>
		</nav>
	);
}
export default withTracker(self => {
	Meteor.user()?.lang && i18n.setLocale(Meteor.user().lang);
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(MenuMain);
