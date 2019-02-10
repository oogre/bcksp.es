/*----------------------------------------*\
  bcksp.es - forgotPwd.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-12-26 12:47:44
  @Last Modified time: 2019-01-04 17:32:02
\*----------------------------------------*/

import ReactDom from 'react-dom';
import React, { Component } from 'react';
import FixeWait from './../fixe/wait.js';
import MessageError from './../message/error.js';
import { sendMessage } from './../../utilities/com.js';
import { isEmail } from './../../utilities/validation.js';
import { getMessageFromError } from './../../utilities/tools.js';



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
		.then(data => {
			this.setState({
				'has-success' : data.message,
			});
		})
		.catch(e => {
			this.setState({ 
				error : getMessageFromError(e),
				'has-success' : false,
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
	    	<form className="login-user" onSubmit={this.handleForgotPwd.bind(this)}>
				<div className="fields-row">
					<div className="fields-column">
						<label htmlFor="email">email</label>
						<input id="email" type = "email" ref="email"name="email"/>
					</div>
				</div>
				<div className="fields-row text-right">
					<input className="button--secondary" type="submit" value="reset password"/>
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