/*----------------------------------------*\
  bcksp.es - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:00:44
  @Last Modified time: 2018-05-29 01:27:56
\*----------------------------------------*/
import React from 'react';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	handleLogin(event){
		event.preventDefault();
		chrome.runtime.sendMessage({
			action : "login",
			data : {
				email : event.target[0].value,
				pwd : event.target[1].value
			}
		}, message => {
			this.props.onSuccess(message);
		});
	}

	render() {
		return (
	    	<form className="login-user" onSubmit={this.handleLogin.bind(this)}>
				<div className="fields-row">
					<div className="fields-column">
						<input 
							type = "email"
							ref = "email"
							name = "email" 
							placeholder ="type your email"
						/>
					</div>
					<div className="fields-column">
						<input 
							type="password" 
							ref="password" 
							name="password" 
							placeholder="type your password"
						/>
					</div>
				</div>
				<div className="fields-row text-right">
					<input className="button--secondary" type="submit" value="login"/>
				</div>
			</form>
		);
	}
}