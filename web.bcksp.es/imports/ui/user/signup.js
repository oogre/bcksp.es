/*----------------------------------------*\
  bcksp.es - signup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 19:28:56
  @Last Modified time: 2018-09-29 13:51:38
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

import HeaderMenu from './../menu/header.js';
import { SignupUser } from '../../api/users/methods.js';
import * as Utilities from "./../../utilities.js";

import MessageError from '../message/error.js';
import T from './../../i18n/index.js';

export default class UserSignup extends Component {
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
	handleSignup(event){
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
			password : ReactDom.findDOMNode(this.refs.password).value,
			passwordConfirm : ReactDom.findDOMNode(this.refs.passwordConfirm).value
		};
		console.log(data);
		SignupUser.call(data, (err, res) => {
			console.log(err);
			console.log(res);
			this.setState({
				'is-loading' : false
			});
			if (err && err.error === 'validation-error') {
				this.setState({
					'has-error' : true
				});
				err.details.forEach((fieldError) => {
					this.setState({
						["error-"+fieldError.name] : fieldError.type
					});
					console.log({
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
					this.setState({
						'has-error' : true,
						error : err.reason
					});
					return;
				}
				this.setState({
					'has-success' : true
				});
				Utilities.transfertLoginDataToExtension();
				FlowRouter.go('home');
			});
		})
	}

	render() {
		let errors = i18n.createTranslator("errors");
		let forms = i18n.createTranslator("forms");
		return (
			<div className="page page--signup">
				<HeaderMenu noMain={true}/>
				<div className="page__content">
					<h2><T>forms.signup</T></h2>
					<form className="login-user" onSubmit={this.handleSignup.bind(this)}>
						<div className="fields-row">
							<div className="fields-column">
								<label htmlFor="email"><T>forms.email</T></label>
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
								<label htmlFor="password"><T>forms.password</T></label>
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
								<label htmlFor="passwordConfirm"><T>forms.passwordConfirm</T></label>
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
							<input
								className={
									"button--secondary " +
									(this.state['is-loading'] ? "loading " : "") +
									(this.state['has-success'] ? "success " : "") +
									(this.state['has-error'] ? "error " : "")
								}
								type="submit"
								value={forms("submit", "signup")}
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
					<div>
						<p>
							<T>forms.alreadyMember</T>
							<a href={FlowRouter.path("login")}>
								<T>forms.loginNow</T>
							</a>
						</p>	
					</div>
				</div>
			</div>
		);
	}

}