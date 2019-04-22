/*----------------------------------------*\
  bcksp.es - popup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 00:52:06
  @Last Modified time: 2019-04-18 15:30:35
\*----------------------------------------*/

import ReactDOM from 'react-dom';
import { MDText } from 'i18n-react';
import MainMenu from "./menu/main.js";
import LoginMenu from "./menu/login.js";
import React, { Component } from 'react';
import { config } from './../shared/config.js';
import { sendMessage } from './../utilities/com.js';
import { isBoolean } from './../utilities/validation.js';
import { log, info, warn, error } from './../utilities/log.js';

const T = new MDText(JSON.parse(localStorage.getItem("translation")), { MDFlavor: 1 });;

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn : false
		};
	}

	componentDidMount() {
		sendMessage("isLogin")
		.then(isLoggedIn => this.setState({ loggedIn : isLoggedIn }))
		.catch(e => error(e));
		window.addEventListener("blur", event =>{
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
				<header className="bcksp-popup__header">
					<img src="theme/images/bcksp-ext-logo.svg" alt="Bcksp.es" />
				</header>

				{
					config.isDevMode() &&
						<T.span text={{ key: "extension.devmode" }}/>
				}

				<div className="bcksp-popup__body">
					{
						!this.state.loggedIn ?
							<LoginMenu onLoginStatusChange={this.handleLoginStatusChange.bind(this)}/>
						:
							<MainMenu onLoginStatusChange={this.handleLoginStatusChange.bind(this)}/>
					}
				</div>

			</div>
		);
	}
}

ReactDOM.render(<Popup/>, document.getElementById('app'));