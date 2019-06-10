/*----------------------------------------*\
  bcksp.es - logout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:30:14
  @Last Modified time: 2019-06-07 15:57:23
\*----------------------------------------*/

import React, { Component } from 'react';
import LoginForm from './../form/login.js';
import SignupForm from './../form/signup.js';
import { T } from './../../utilities/tools.js';
import { config } from './../../shared/config.js';
import ForgotPwdForm from './../form/forgotPwd.js';
import { sendMessage } from './../../utilities/com.js';
import { log, info, warn, error } from './../../utilities/log.js';

export default class LoginMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			availableProcess : ["signup", "login", "forgotPwd"],
			currentProcess : "signup"
		};
	}

	handleProcessSwitchTo(data){
		if(!this.state.availableProcess.includes(data)){
			throw new Error("Unknow process to switch to : "+data);
		}
		this.setState({ currentProcess : data });
		return false;
	}

	handleGoBcksp(event){
		sendMessage("openTab", config.getHomeUrl())
		.then(data => info(data))
		.catch(e => error(e));;
	}

	renderLoginBtn(){
		return(
			<li>
				<div className="bcksp-popup__body-footer">
					<T.p text={{ key : "forms.login.title" }}/>
					<button className="button button--text" onClick={this.handleProcessSwitchTo.bind(this, "login")}>
						<T.span text={{ key : "forms.login.button" }}/>
					</button>
				</div>
			</li>
		);
	}

	renderSignupBtn(){
		return(
			<li>
				<div className="bcksp-popup__body-footer">
					{/*<T.p text={{ key : "forms.signup.title" }}/>*/}
					<button className="button button--text" onClick={this.handleProcessSwitchTo.bind(this, "signup")}>
						<T.span text={{ key : "forms.signup.button" }}/>
					</button>
				</div>
			</li>
		);
	}

	renderForgotPwdBtn(){
		return(
			<li>
				<div className="bcksp-popup__body-footer">
					{/*<T.p text={{ key : "forms.resetPassword.title" }}/>*/}
					<button className="button button--text" onClick={this.handleProcessSwitchTo.bind(this, "forgotPwd")}>
						<T.span text={{ key : "forms.resetPassword.button" }}/>
					</button>
				</div>
			</li>
		);
	}

	render() {
		return (
			<div>
				<div className="bcksp-popup__body">
					{
						this.state.currentProcess == "signup" &&
							<SignupForm onSuccess={ this.props.onLoginStatusChange.bind(this) }/>
					}
					{
						this.state.currentProcess == "login" &&
							<LoginForm onSuccess={ this.props.onLoginStatusChange.bind(this) }/>
					}
					{
						this.state.currentProcess == "forgotPwd" &&
							<ForgotPwdForm/>
					}
				</div>
				<div className="bcksp-popup__footer">
					<ul>
						{
							(	this.state.currentProcess == "signup"
							||  this.state.currentProcess == "forgotPwd")
							&&	this.renderLoginBtn()
						}
						{
							this.state.currentProcess == "login" &&
								this.renderForgotPwdBtn()
						}
						{	(	this.state.currentProcess == "login"
							||  this.state.currentProcess == "forgotPwd")
							&&	this.renderSignupBtn()
						}
					</ul>
				</div>
				<div className="bcksp-popup__extension-link">
					<button
							className="button button--secondary button--extension-link"
							onClick={this.handleGoBcksp.bind(this)}
						>
							<T.span text={{ key : "extension.links.visit" }}/>
					</button>
				</div>
			</div>

		);
	}
}