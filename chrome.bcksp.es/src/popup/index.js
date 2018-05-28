/*----------------------------------------*\
  bcksp.es - popup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 00:52:06
  @Last Modified time: 2018-05-29 01:27:50
\*----------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';

import Login from './login';
import Config from './config';

class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		};
	}

	componentDidMount() {
		// Get the active tab and store it in component state.
		//browser.tabs.query({active: true}).then(tabs => {
		//	this.setState({activeTab: tabs[0]});
		//});
		chrome.runtime.sendMessage({
			action : "isLogin",
		}, isLoggedIn => this.setState({loggedIn: isLoggedIn}));

		
	}
	handleLogin(isLoggedIn){
		this.setState({loggedIn: isLoggedIn});
	}
	handleLogout(event){
		chrome.runtime.sendMessage({
			action : "logout",
			data : true
		}, isLoggedIn =>{
			this.setState({loggedIn: isLoggedIn});
		});
	}
	render() {
		return (
			<div>
				{
					this.state.loggedIn ? 
						<div>
							<Config />
							<button 
								className="button--secondary logout" 
								onClick={this.handleLogout.bind(this)}
							>
								logout
							</button>
						</div>
					:
						<Login onSuccess={this.handleLogin.bind(this)}/>
				}
			</div>
		);
	}
}

ReactDOM.render(<Popup/>, document.getElementById('app'));
