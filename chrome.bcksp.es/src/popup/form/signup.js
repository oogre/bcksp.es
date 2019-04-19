/*----------------------------------------*\
  bcksp.es - signup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:11:37
  @Last Modified time: 2019-04-18 16:05:25
\*----------------------------------------*/

import ReactDom from 'react-dom';
import { MDText } from 'i18n-react';
import React, { Component } from 'react';
import FixeWait from './../fixe/wait.js';
import MessageError from './../message/error.js';
import { sendMessage } from './../../utilities/com.js';
import { getMessageFromError } from './../../utilities/tools.js';
import { isEmail, isPwd, isPwdConf } from './../../utilities/validation.js';

const T = new MDText(JSON.parse(localStorage.getItem("translation")), { MDFlavor: 1 });;

export default class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'error' : false,
			'is-loading' : false,
			'has-success' : false
		};
	}
	handleSignup(event){
		event.preventDefault();

		this.state = {
			'error' : false,
			'is-loading' : false,
			'has-success' : false
		};

		isEmail(ReactDom.findDOMNode(this.refs.email).value)
		.then(data => isPwd(ReactDom.findDOMNode(this.refs.password).value, data))
		.then(data => isPwdConf(ReactDom.findDOMNode(this.refs.passwordConfirm).value, data))
		.then(data => sendMessage("signup", data))
		.then(isLoggedIn => {
			this.setState({ 'is-success' : true });
			this.props.onSuccess(isLoggedIn)
		})
		.catch(error => this.setState({ 
			'is-success' : false, 
			error : getMessageFromError(error) 
		}))
		.finally(() => this.setState({ 'is-loading' : false }));
	}

	render() {
		return (
	    	<form className="signup-user" onSubmit={this.handleSignup.bind(this)}>
				<div className="fields-row">
					<div className="fields-column">
						<label htmlFor="email">
							<T.span text={{ key : "extension.signup.email" }}/>
						</label>
						<input id="email" type = "email" ref="email"name="email"/>
					</div>
					<div className="fields-column">
						<label htmlFor="password">
							<T.span text={{ key : "extension.signup.pwd" }}/>
						</label>
						<input id="password" type="password" ref="password" name="password"/>
					</div>
					<div className="fields-column">
						<label htmlFor="passwordConfirm">
							<T.span text={{ key : "extension.signup.pwdconf" }}/>
						</label>
						<input id="passwordConfirm" type="password" ref="passwordConfirm" name="passwordConfirm"/>
					</div>
				</div>
				<div className="fields-row text-right">
					<input 	className="button--secondary" 
							type="submit" 
							value={T.translate("extension.signup.button")}
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