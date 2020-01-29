/*----------------------------------------*\
  bcksp.es - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:00:44
  @Last Modified time: 2020-01-26 22:01:47
\*----------------------------------------*/

import ReactDom from 'react-dom';
import React, { Component } from 'react';
import FixeWait from './../fixe/wait.js';
import MessageError from './../message/error.js';
import { sendMessage } from './../../utilities/com.js';
import { handleError, T } from './../../utilities/tools.js';
import { isEmail, isPwd, isObject } from './../../utilities/validation.js';
import { log, info, warn, error } from './../../utilities/log.js';


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
			this.setState({ 'is-success' : true });
			return isLoggedIn;
		})
		.then(isLoggedIn => this.props.onSuccess(isLoggedIn))
		.catch(error => this.setState({ 'is-success' : false, error : handleError(error)}))
		.finally(() => this.setState({ 'is-loading' : false }));
	}

	render() {
		return (
	    	<form className="login-user" onSubmit={this.handleLogin.bind(this)}>
				<div>
					<div className="field">
						<label className="field__label" htmlFor="email">
							<T.span text={{ key : "forms.login.email" }}/>
						</label>
						<input className="input--text" id="email" type = "email" ref="email"name="email"/>
					</div>
					<div className="field">
						<label className="field__label" htmlFor="password">
							<T.span text={{ key : "forms.login.pwd" }}/>
						</label>
						<input className="input--text" id="password" type="password" ref="password" name="password"/>
					</div>
				</div>
				<div className="field">
					<input 	className="button button--secondary"
							type="submit"
							value={T.translate("forms.login.action")}
					/>
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