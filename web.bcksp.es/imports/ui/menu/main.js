/*----------------------------------------*\
  bcksp.es - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 14:03:42
  @Last Modified time: 2020-02-02 23:20:24
\*----------------------------------------*/
import React, { useState, useEffect } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { installExtension } from "./../../utilities/ui.js";
import { SetUserLang } from "./../../api/users/methods.js";
import { successHandler, errorHandler } from './../../utilities/ui.js';

const MenuMain = ( {extensionInstalled, isConnected, handle} ) => {
	const [loading, setLoading] = useState(false);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [langMenu, setLangMenu] = useState(false);
	const T = i18n.createComponent("menus");

	useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			handle.stop();
		}
	}, []); 

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
			<button type="button" className="menu--header__mobile-trigger" onClick={handleOpenMobileMenu}>
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
				<span className="sr-only">
					<T>open</T>
				</span>
			</button>
			<ul className={"menu menu--header" + isMobile()}>
				<li className="menu__item">
					<a 	className={"menu__item-link " + isActive("about")}
						href={FlowRouter.path("about")}
					>
						<T>about</T>
					</a>
				</li>
				<li className="menu__item">
					<a 	className={"menu__item-link" + isActive("souvenir")}
						href={FlowRouter.path("souvenir")}
					>
						<T>souvenir</T>
					</a>
				</li>
				{
					hasToDisplayDownloadBtn() &&
						<li className="menu__item">
							<a 	className={"button button--primary" + isActive("download")}
								onClick={installExtension}
							>
								<T>download</T>
							</a>
						</li>
				}
				{
					hasToDisplayProfileBtn() &&
						<li className="menu__item">
							<a 	className={"menu__item-link" + isActive("userProfile")}
								href={ FlowRouter.path("userProfile") }
							>
								<T>profile</T>
							</a>
						</li>
				}
				<li className="menu__item" onMouseLeave={closeLangMenu}>
					<a 	className="menu__item-link"
						href="#"
						onClick={toggleLangMenu}
					>
						<T>language</T>
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
	let handle = Meteor.subscribe('user.language');
	if(handle.ready()) i18n.setLocale(Meteor.user().lang);
	return {
		handle : handle,
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(MenuMain);
