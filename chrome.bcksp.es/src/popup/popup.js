/*----------------------------------------*\
  bcksp.es - popup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 00:52:06
  @Last Modified time: 2020-02-11 19:02:37
\*----------------------------------------*/

import ReactDOM from 'react-dom';
import MainMenu from "./menu/main.js";
import LoginMenu from "./menu/login.js";
import React, { Component } from 'react';
import OfflineMenu from "./menu/offline.js";
import { config } from './../shared/config.js';
import { sendMessage } from './../utilities/com.js';
import { isBoolean } from './../utilities/validation.js';
import { log, info, warn, error } from './../utilities/log.js';
import { T } from './../utilities/tools.js';

//T.setTexts(JSON.parse(localStorage.getItem("translation")), { MDFlavor: 1 });

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn : false,
			connected : false
		};
	}

	componentDidMount() {
		sendMessage("isConnected")
		.then(isConnected=>{
			this.setState({ connected : isConnected });
			if(!isConnected)throw new Error(T.translate("errors.server.offline"));
			return sendMessage("isLogin")
		})
		.then(isLoggedIn => this.setState({ loggedIn : isLoggedIn }))
		.catch(e => error(e));

		document.querySelector(".bcksp-popup")
		.addEventListener("mouseleave", event => {
			sendMessage("closePopup")
			.then(() => { })
			.catch(e => error(e));
		});
	}

	handleLoginStatusChange(isLoggedIn){
		if(isBoolean(isLoggedIn)){
			this.setState({ loggedIn : isLoggedIn })
		}
	}

	render() {
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

					<div className="bcksp-popup__content">
						{
							!this.state.connected &&
								<OfflineMenu/>
						}
						{
							this.state.connected && !this.state.loggedIn &&
								<LoginMenu onLoginStatusChange={this.handleLoginStatusChange.bind(this)}/>
						}
						{
							this.state.connected && this.state.loggedIn &&
								<MainMenu onLoginStatusChange={this.handleLoginStatusChange.bind(this)}/>
						}
					</div>
				</div>

				<div className="bcksp-popup__border-decoration-container">
					<div className="bcksp-popup__border-decoration"></div>
					<div className="bcksp-popup__border-decoration"></div>
				</div>

			</div>
		);
	}
}

ReactDOM.render(<Popup/>, document.getElementById('app'));