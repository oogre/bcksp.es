import React from 'react';
import ReactDOM from 'react-dom';

import Login from './login';
import Config from './config';
import Utilities from './../shared/utilities.js';

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
		Utilities.sendMessage("isLogin", "true")
			.then(isLoggedIn => this.setState({loggedIn: isLoggedIn}))
			.catch(error => console.log(error));
	}
	handleLogin(isLoggedIn){
		this.setState({loggedIn: isLoggedIn});
	}
	handleLogout(event){
		Utilities.sendMessage("logout", "true")
			.then(isLoggedIn => this.setState({loggedIn: isLoggedIn}))
			.catch(error => console.log(error));
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
