/*----------------------------------------*\
  bcksp.es - signup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:11:37
  @Last Modified time: 2018-10-08 06:13:38
\*----------------------------------------*/
import React from 'react';
import ReactDom from 'react-dom';
import Utilities from './../../shared/utilities.js';
import MessageError from './../message/error.js';

export default class LoginForm extends React.Component {
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

		Utilities.isEmail(ReactDom.findDOMNode(this.refs.email).value, "email")
			.then(data => Utilities.isPwd(ReactDom.findDOMNode(this.refs.password).value, "password", data))
			.then(data => Utilities.sendMessage("signup", data))
			.then(isLoggedIn => this.props.onSuccess(isLoggedIn))
			.catch(error => this.setState({error : error.message}));
	}

	render() {
		return (
	    	<form className="login-user" onSubmit={this.handleLogin.bind(this)}>
				<div className="fields-row">
					<div className="fields-column">
						<label htmlFor="email">email</label>
						<input id="email" type = "email" ref="email"name="email"/>
						{
							this.state["error-email"] ?
								<MessageError
									messages={errors("email", this.state["error-email"])}
								/>
							:
								null
						}
					</div>
					<div className="fields-column">
						<label htmlFor="password">password</label>
						<input id="password" type="password" ref="password" name="password"/>
						{
							this.state["error-password"] ?
								<MessageError
									messages={errors("password", this.state["error-password"])}
								/>
							:
								null
						}
					</div>
					<div className="fields-column">
						<label htmlFor="passwordConfirm">password confirmation</label>
						<input id="passwordConfirm" type="password" ref="passwordConfirm" name="passwordConfirm"/>
						{
							this.state["error-passwordConfirm"] ?
								<MessageError
									messages={errors("passwordConfirm", this.state["error-passwordConfirm"])}
								/>
							:
								null
						}
					</div>
				</div>
				<div className="fields-row text-right">
					<input className="button--secondary" type="submit" value="singup"/>
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