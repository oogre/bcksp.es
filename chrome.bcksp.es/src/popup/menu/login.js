/*----------------------------------------*\
  bcksp.es - logout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:30:14
  @Last Modified time: 2019-04-19 14:35:45
\*----------------------------------------*/
import { MDText } from 'i18n-react';
import React, { Component } from 'react';
import LoginForm from './../form/login.js';
import SignupForm from './../form/signup.js';
import { config } from './../../shared/config.js';
import ForgotPwdForm from './../form/forgotPwd.js';
import { sendMessage } from './../../utilities/com.js';
import { log, info, warn, error } from './../../utilities/log.js';

const T = new MDText(JSON.parse(localStorage.getItem("translation")), { MDFlavor: 1 });;

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
				<p>
					<T.span text={{ key : "forms.signup.title" }}/>
					<button onClick={this.handleProcessSwitchTo.bind(this, "signup")}>
						<T.span text={{ key : "forms.signup.button" }}/>
					</button>
				</p>
			</li>
		);
	}

	renderForgotPwdBtn(){
		return(
			<li>
				<p>
					<T.span text={{ key : "forms.resetPassword.title" }}/>
					<button onClick={this.handleProcessSwitchTo.bind(this, "forgotPwd")}>
						<T.span text={{ key : "forms.resetPassword.button" }}/>
					</button>
				</p>
			</li>
		);
	}

	render() {
		return (
			<ul>
				<li>
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
				</li>
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
				<li>
					<button
						className=""
						onClick={this.handleGoBcksp.bind(this)}
					>
						<T.span text={{ key : "extension.links.visit" }}/>
					</button>
				</li>
			</ul>
		);
	}
}