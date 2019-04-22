/*----------------------------------------*\
  bcksp.es - signup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:11:37
  @Last Modified time: 2019-04-19 14:23:00
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
				<div>
					<div className="field">
						<label className="field__label" htmlFor="email">
							<T.span text={{ key : "forms.signup.email" }}/>
						</label>
						<input className="input--text" id="email" type = "email" ref="email"name="email"/>
					</div>
					<div className="field">
						<label className="field__label" htmlFor="password">
							<T.span text={{ key : "forms.signup.pwd" }}/>
						</label>
						<input className="input--text" id="password" type="password" ref="password" name="password"/>
					</div>
					<div className="field">
						<label className="field__label" htmlFor="passwordConfirm">
							<T.span text={{ key : "forms.signup.pwdconf" }}/>
						</label>
						<input className="input--text" id="passwordConfirm" type="password" ref="passwordConfirm" name="passwordConfirm"/>
					</div>
				</div>
				<div className="fields-row text-right">
					<input 	className="button--secondary"
							type="submit"
							value={T.translate("forms.signup.action")}
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