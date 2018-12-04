/*----------------------------------------*\
  bcksp.es - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:00:44
  @Last Modified time: 2018-10-08 06:13:54
\*----------------------------------------*/
import _ from 'underscore'
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
		this.state = {
			'error' : false,
			'error-email' : false,
			'error-password' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			'success' : false
		};
	}

	componentDidMount() {
		
	}

	handleLogin(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-email' : false,
			'error-password' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});

		Utilities.isEmail(ReactDom.findDOMNode(this.refs.email).value, "email")
			.then(data => Utilities.isPwd(ReactDom.findDOMNode(this.refs.password).value, "password", data))
			.then(data => Utilities.sendMessage("login", data))
			.then(isLoggedIn => {
				if(_.isObject(isLoggedIn) && isLoggedIn.error){
					throw new Error(isLoggedIn.reason);
				}
				this.setState({
					'is-loading' : false
				});
				return isLoggedIn;
			})
			.then(isLoggedIn => this.props.onSuccess(isLoggedIn))
			.catch(error => {
				console.warn(error);
				this.setState({
					'is-loading' : false,
					'has-error' : true
				});
				
				let errors = error.message.split("|");
				if(errors.length>1){
					this.setState({
						["error-"+errors[0]] : errors[1]
					});
				}else{
					this.setState({
						error : errors[0]
					});
				}
			});
	}

	render() {
		return (
	    	<form className="login-user" onSubmit={this.handleLogin.bind(this)}>
				<div className="fields-row">
					<div className="fields-column">
						<label htmlFor="email">email</label>
						<input id="email" type = "email" ref="email"name="email"/>
						{
							this.state["error"] && this.state["error-email"] ?
								<MessageError
									messages={this.state["error-email"]}
								/>
							:
								null
						}
					</div>
					<div className="fields-column">
						<label htmlFor="password">password</label>
						<input id="password" type="password" ref="password" name="password"/>
						{
							this.state["error"] && this.state["error-password"] ?
								<MessageError
									messages={this.state["error-password"]}
								/>
							:
								null
						}
					</div>
				</div>
				<div className="fields-row text-right">
					<input className="button--secondary" type="submit" value="login"/>
				</div>
				{
					this.state["has-error"] && this.state["error"] ?
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