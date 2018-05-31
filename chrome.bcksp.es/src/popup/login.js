/*----------------------------------------*\
  bcksp.es - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:00:44
  @Last Modified time: 2018-05-30 21:30:09
\*----------------------------------------*/
import React from 'react';
import Utilities from './../shared/utilities.js';
import MessageError from './message/error.js';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false
		};
	}

	componentDidMount() {
		
	}

	handleLogin(event){
		event.preventDefault();

		this.setState({
			error : false
		});

		let email = event && event.target && event.target[0] ? event.target[0].value : "";
		let pwd = event && event.target && event.target[1] ? event.target[1].value : "";

		Utilities.isEmail(email)
			.then(data => Utilities.isPwd(pwd, data))
			.then(data => Utilities.sendMessage("login", data))
			.then(isLoggedIn => this.props.onSuccess(isLoggedIn))
			.catch(error => this.setState({error : error.message}));
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
				{
					this.state["error"] ?
						<MessageError
							messages={this.state["error"]}
						/>
					:
						null
				}
			</form>
		);
	}
}