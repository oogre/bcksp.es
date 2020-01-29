/*----------------------------------------*\
  bcksp.es - forgotPwd.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-12-26 12:47:44
  @Last Modified time: 2020-01-26 21:43:40
\*----------------------------------------*/

import ReactDom from 'react-dom';
import React, { Component } from 'react';
import FixeWait from './../fixe/wait.js';
import MessageError from './../message/error.js';
import { sendMessage } from './../../utilities/com.js';
import { isEmail } from './../../utilities/validation.js';
import { handleError, T } from './../../utilities/tools.js';

export default class ForgotPwdForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'error' : false,
			'is-loading' : false,
			'has-success' : false
		};
	}
	handleForgotPwd(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'is-loading' : true,
			'has-success' : false
		});
		isEmail(ReactDom.findDOMNode(this.refs.email).value)
		.then(data => sendMessage("forgotPwd", data))
		.then(data => this.setState({'has-success' : data.message}))
		.catch(e => this.setState({ error : handleError(e), 'has-success' : false }))
		.finally(()=> this.setState({ 'is-loading' : false}));
	}

	render() {
		return (
	    	<form className="login-user" onSubmit={this.handleForgotPwd.bind(this)}>
				<div>
					<div className="field">
						<label className="field__label" htmlFor="email">
							<T.span text={{ key : "forms.resetPassword.email" }}/>
						</label>
						<input className="input--text" id="email" type = "email" ref="email" name="email"/>
					</div>
				</div>
				<div className="field">
					<input 	className="button button--secondary"
						type="submit"
						value={T.translate("forms.resetPassword.action")}
					/>
				</div>
				{
					this.state.error &&
					<MessageError
						messages={this.state.error}
					/>
				}
				{
					this.state['has-success'] &&
					<div>
						{ this.state['has-success'] }
					</div>
				}
				{
					this.state['is-loading'] &&
					<FixeWait/>
				}
			</form>
		);
	}
}