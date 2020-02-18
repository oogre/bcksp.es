/*----------------------------------------*\
  bcksp.es - logout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:30:14
  @Last Modified time: 2020-02-18 17:00:24
\*----------------------------------------*/

import React from 'react';
import LoginForm from './../form/login.js';
import SignupForm from './../form/signup.js';
import { T } from './../../utilities/tools.js';
import { config } from './../../shared/config.js';
import ForgotPwdForm from './../form/forgotPwd.js';
import { sendMessage } from './../../utilities/com.js';
import { log, info, warn, error } from './../../utilities/log.js';


const LoginMenu = ({onLoginStatusChange}) => {
	const [currentProcess, setCurrentProcess] = React.useState("signup");
	
	const handleGoBcksp = event => {
		sendMessage("openTab", config.getHomeUrl())
		.then(data => info(data))
		.catch(e => error(e));;
	}

	const onFormSuccess = (message) => {
		console.log(message);
		//onLoginStatusChange();
	}

	const renderLoginBtn = () => {
		return(
			<li>
				<div className="bcksp-popup__body-footer">
					<T.p text={{ key : "forms.login.title" }}/>
					<button className="button button--text" onClick={() => setCurrentProcess("login")}>
						<T.span text={{ key : "forms.login.button" }}/>
					</button>
				</div>
			</li>
		);
	}

	const renderSignupBtn = () => {
		return(
			<li>
				<div className="bcksp-popup__body-footer">
					{<T.p text={{ key : "forms.signup.title" }}/>}
					<button className="button button--text" onClick={() => setCurrentProcess("signup")}>
						<T.span text={{ key : "forms.signup.button" }}/>
					</button>
				</div>
			</li>
		);
	}

	const renderForgotPwdBtn = () => {
		return(
			<li>
				<div className="bcksp-popup__body-footer">
					{<T.p text={{ key : "forms.resetPassword.title" }}/>}
					<button className="button button--text" onClick={() => setCurrentProcess("forgotPwd")}>
						<T.span text={{ key : "forms.resetPassword.button" }}/>
					</button>
				</div>
			</li>
		);
	}
	return (
		<div className="bcksp-popup__content">
			<div className="bcksp-popup__body">
				{
					currentProcess == "signup" &&
						<SignupForm onSuccess={ onFormSuccess }/>
				}
				{
					currentProcess == "login" &&
						<LoginForm onSuccess={ onFormSuccess }/>
				}
				{
					currentProcess == "forgotPwd" &&
						<ForgotPwdForm onSuccess={ onFormSuccess }/>
				}
			</div>
			<div className="bcksp-popup__footer">
				<ul>
					{	
						currentProcess != "login" && renderLoginBtn()
					}
					{
						currentProcess == "login" && renderForgotPwdBtn()
					}
					{	
						currentProcess != "signup" && renderSignupBtn()
					}
				</ul>
			</div>
			<div className="bcksp-popup__extension-link">
				<button className="button button--secondary button--extension-link"
						onClick={handleGoBcksp}
				>
						<T.span text={{ key : "extension.links.visit" }}/>
				</button>
			</div>
		</div>
	);
}

export default LoginMenu;