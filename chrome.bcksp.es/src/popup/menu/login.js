/*----------------------------------------*\
  bcksp.es - logout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:30:14
  @Last Modified time: 2018-12-06 18:27:27
\*----------------------------------------*/
import React from 'react';

import { config } from './../../shared/config.js';
import LoginForm from './../form/login.js';
import SignupForm from './../form/signup.js';
import Utilities from './../../shared/utilities.js';


export default class LoginMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			availableProcess : ["signup", "login"],
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
		Utilities.sendMessage("openTab", config.bcksp_url);
	}
	render() {
		return (
			<ul>
				<li>
					{ 
						this.state.currentProcess == "signup" ? 
							<div>
								<SignupForm onSuccess={ this.props.onLoginStatusChange.bind(this) }/>
								<div>
									<p>
										Already have an account?
										<button onClick={this.handleProcessSwitchTo.bind(this, "login")}>
											log in now
										</button>
									</p>	
								</div>
							</div>
						:
							null
					}
					{ 
						this.state.currentProcess == "login" ? 
							<div>
								<LoginForm onSuccess={ this.props.onLoginStatusChange.bind(this) }/>
								<div>
									<p>
										Don't have an account?
										<button onClick={this.handleProcessSwitchTo.bind(this, "signup")}>
											sign up now
										</button>
									</p>	
								</div>
							</div>
						:
							null
					}
				</li>
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
