/*----------------------------------------*\
  bcksp.es - popup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 00:52:06
  @Last Modified time: 2018-12-10 00:04:15
\*----------------------------------------*/
import _ from 'underscore'
import React from 'react';
import ReactDOM from 'react-dom';

import LoginMenu from "./menu/login.js";

import MainMenu from "./menu/main.js";
import { config } from './../shared/config.js';
import Utilities from './../shared/utilities.js';


class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
		};
	}
	componentDidMount() {
		Utilities.sendMessage("isLogin")
		.then(isLoggedIn => {
			this.setState({loggedIn: isLoggedIn})
		});
	}
	handleLoginStatusChange(isLoggedIn){
		if(_.isBoolean(isLoggedIn)){
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
