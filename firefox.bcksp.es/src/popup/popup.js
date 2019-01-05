/*----------------------------------------*\
  bcksp.es - popup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 00:52:06
  @Last Modified time: 2019-01-04 22:48:12
\*----------------------------------------*/

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import MainMenu from "./menu/main.js";
import LoginMenu from "./menu/login.js";
import { sendMessage } from './../utilities/com.js';
import { isBoolean } from './../utilities/validation.js';

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
		};
	}
	componentDidMount() {
		sendMessage("isLogin")
		.then(isLoggedIn => {
			this.setState({loggedIn: isLoggedIn})
		})
		.catch(e => info(e.message));
	}
	handleLoginStatusChange(isLoggedIn){
		if(isBoolean(isLoggedIn)){
			this.setState({loggedIn: isLoggedIn})
		}
	}
	render() {
		return (
			<div>
				{
					!this.state.loggedIn ? 
						<LoginMenu onLoginStatusChange={this.handleLoginStatusChange.bind(this)}/>
					:
						<MainMenu onLoginStatusChange={this.handleLoginStatusChange.bind(this)}/>
				}
			</div>
		);
	}
}

ReactDOM.render(<Popup/>, document.getElementById('app'));
