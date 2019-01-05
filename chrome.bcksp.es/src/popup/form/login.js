/*----------------------------------------*\
  bcksp.es - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:00:44
  @Last Modified time: 2019-01-04 17:31:59
\*----------------------------------------*/

import ReactDom from 'react-dom';
import React, { Component } from 'react';
import FixeWait from './../fixe/wait.js';
import MessageError from './../message/error.js';
import { sendMessage } from './../../utilities/com.js';
import { getMessageFromError } from './../../utilities/tools.js';
import { isEmail, isPwd, isObject } from './../../utilities/validation.js';


export default class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'error' : false,
			'is-loading' : false,
			'has-success' : false
		};
	}
	handleLogin(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'is-loading' : true,
			'has-success' : false
		});

		isEmail(ReactDom.findDOMNode(this.refs.email).value)
			.then(data => isPwd(ReactDom.findDOMNode(this.refs.password).value, data))
			.then(data => sendMessage("login", data))
			.then(isLoggedIn => {
				if(isObject(isLoggedIn) && isLoggedIn.error){
					throw new Error(isLoggedIn.reason);
				}
				this.setState({
					'is-success' : true
				});
				return isLoggedIn;
			})
			.then(isLoggedIn => this.props.onSuccess(isLoggedIn))
			.catch(error => {
				this.setState({
					'is-success' : false,
					error : getMessageFromError(error)
				});
			})
			.finally(()=>{
				this.setState({ 
					'is-loading' : false,
				});
			});
	}

	render() {
		return (
	    	<form className="login-user" onSubmit={this.handleLogin.bind(this)}>
				<div className="fields-row">
					<div className="fields-column">
						<label htmlFor="email">email</label>
						<input id="email" type = "email" ref="email"name="email"/>
					</div>
					<div className="fields-column">
						<label htmlFor="password">password</label>
						<input id="password" type="password" ref="password" name="password"/>
					</div>
				</div>
				<div className="fields-row text-right">
					<input className="button--secondary" type="submit" value="login"/>
				</div>
				{
					this.state["error"] &&
					<MessageError
						messages={this.state["error"]}
					/>
				}
				{
					this.state['is-loading'] &&
					<FixeWait/>
				}
			</form>
		);
	}
}