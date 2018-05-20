/*----------------------------------------*\
  web.bitRepublic - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 23:35:48
  @Last Modified time: 2018-05-21 00:20:36
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { config } from '../../startup/config.js'
import { LoginUser } from '../../api/users/methods.js';

import MessageError from '../message/error.js';
import T from './../../i18n/index.js';

export default class UserLogIn extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'error-email' : false,
			'error-password' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			success : false
		};
		
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
		const data = {
			email : ReactDom.findDOMNode(this.refs.email).value,
			password : ReactDom.findDOMNode(this.refs.password).value
		};

		LoginUser.call(data, (err, res) => {
			this.setState({
				'is-loading' : false
			});
			if (err && err.error === 'validation-error') {
				this.setState({
					'has-error' : true
				});
				console.log(err);
				err.details.forEach((fieldError) => {

					this.setState({
						["error-"+fieldError.name] : fieldError.type
					});
				});
				return;
			}
			this.setState({
				'is-loading' : true
			});
			Meteor.loginWithPassword(data.email, data.password, (err) => {
				this.setState({
					'is-loading' : false
				});
				if(err){
					console.log(err);
					this.setState({
						'has-error' : true,
						error : err.reason
					});
					return;
				}
				this.setState({
					'has-success' : true
				});
			});
		});
	}

	render() {
		let errors = i18n.createTranslator("error");
		return (
			<div>
				<form className="login-user" onSubmit={this.handleLogin.bind(this)}>
					<div className="fields-row">
						<div className="fields-column">
							<input
								type="email"
								ref="email"
								name="email"
								placeholder="Type your email"
							/>
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
							<input
								type="password"
								ref="password"
								name="password"
								placeholder="Type your password"
							/>
							{
								this.state["error-password"] ?
									<MessageError
										messages={errors("password", this.state["error-password"])}
									/>
								:
									null
							}
						</div>
					</div>
					<div className="fields-row text-right">
						<input
							className={
								"button--secondary " +
								(this.state['is-loading'] ? "loading " : "") +
								(this.state['has-success'] ? "success " : "") +
								(this.state['has-error'] ? "error " : "")
							}
							type="submit"
							value="Log in"
						/>
						{ 
							this.state["error"] ? 
								<MessageError 
									messages={this.state["error"]} 
								/> 
							: 
								null 
						}
					</div>
				</form>
			</div>
		);
	}
}