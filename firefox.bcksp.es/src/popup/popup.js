/*----------------------------------------*\
  bcksp.es - popup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 00:52:06
  @Last Modified time: 2020-02-22 15:03:59
\*----------------------------------------*/

import React from 'react';
import ReactDOM from 'react-dom';
import MainMenu from "./menu/main.js";
import LoginMenu from "./menu/login.js";
import OfflineMenu from "./menu/offline.js";
import { config } from './../shared/config.js';
import { sendMessage } from './../utilities/com.js';
import { isBoolean } from './../utilities/validation.js';
import { log, info, warn, error } from './../utilities/log.js';
import { T } from './../utilities/tools.js';

//T.setTexts(JSON.parse(localStorage.getItem("translation")), { MDFlavor: 1 });

const Popup = ({connected, loggedIn}) => {
	React.useEffect(() => {//componentDidMount
		document.querySelector(".bcksp-popup").addEventListener("mouseleave", mouseLeavePopupHandler);
		return () => {//componentWillUnmount
			document.querySelector(".bcksp-popup").removeEventListener("mouseleave", mouseLeavePopupHandler);
		}
	}, []); 
	
	const mouseLeavePopupHandler = event => {
		sendMessage("closePopup")
		.then(() => { })
		.catch(e => error(e));
	}

	const handleLoginStatusChange = isLoggedIn => {
		if(isBoolean(isLoggedIn)){
			setLoggedIn(isLoggedIn);
		}
	}

	return (
		<div className="bcksp-popup">
			<div className="bcksp-popup__container">
				<header className="bcksp-popup__header">
					<img src="theme/images/bcksp-ext-logo.svg" alt="Bcksp.es" />
				</header>

				{
					config.isDevMode() &&
						<T.span text={{ key: "extension.devmode" }}/>
				}
				{
					!connected && <OfflineMenu/>
				}
				{
					connected && !loggedIn &&
						<LoginMenu onLoginStatusChange={handleLoginStatusChange}/>
				}
				{
					connected && loggedIn &&
						<MainMenu onLoginStatusChange={handleLoginStatusChange}/>
				}
			</div>

			<div className="bcksp-popup__border-decoration-container">
				<div className="bcksp-popup__border-decoration"></div>
				<div className="bcksp-popup__border-decoration"></div>
			</div>

		</div>
	);
}

Promise.all([sendMessage("isConnected"), sendMessage("isLogin")])
.then(([connected, loggedIn]) => 
	ReactDOM.render(<Popup connected={connected} loggedIn={loggedIn}/>, document.getElementById('app'))	
);
