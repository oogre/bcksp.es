/*----------------------------------------*\
  bcksp.es - logout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:30:14
  @Last Modified time: 2019-01-04 22:47:13
\*----------------------------------------*/
import React, { Component } from 'react';
import LoginForm from './../form/login.js';
import SignupForm from './../form/signup.js';
import { config } from './../../shared/config.js';
import ForgotPwdForm from './../form/forgotPwd.js';
import { sendMessage } from './../../utilities/com.js';


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
		this.setState({currentProcess: data});
		return false;
	}
	handleGoBcksp(event){
		sendMessage("openTab", config.getHomeUrl())
		.then(data => info(data))
		.catch(e => info(e.message));;
	}
	renderLoginBtn(){
		return(
			<li>
				<p>
					Already have an account?
					<button onClick={this.handleProcessSwitchTo.bind(this, "login")}>
						log in now
					</button>
				</p>	
			</li>
		);
	}
	
	renderSignupBtn(){
		return(
			<li>
				<p>
					Don't have an account?
					<button onClick={this.handleProcessSwitchTo.bind(this, "signup")}>
						sign up now
					</button>
				</p>	
			</li>
		);
	}
	
	renderForgotPwdBtn(){
		return(
			<li>
				<p>
					Have you forgot your password?
					<button onClick={this.handleProcessSwitchTo.bind(this, "forgotPwd")}>
						If so click here
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
				{	(	this.state.currentProcess == "login" 
					||  this.state.currentProcess == "forgotPwd")
					&&	this.renderSignupBtn()
				}
				{
					this.state.currentProcess == "login" && 
						this.renderForgotPwdBtn()
				}
				<li>
					<button 
						className="" 
						onClick={this.handleGoBcksp.bind(this)}
					>
							visit {config.bcksp_url}
					</button>
				</li>
			</ul>
		);
	}
}
