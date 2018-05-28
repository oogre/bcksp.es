/*----------------------------------------*\
  runtime-examples - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-27 23:31:36
  @Last Modified time: 2018-05-28 01:39:10
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
		browser.runtime.sendMessage({
			action : "login",
			data : {
				email : event.target[0].value,
				pwd : event.target[1].value
			}
		}).then(message =>{
			this.props.onSuccess(message);
		}, error => {
			console.log(error);
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