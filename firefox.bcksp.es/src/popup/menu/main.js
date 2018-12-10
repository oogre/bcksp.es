/*----------------------------------------*\
  bcksp.es - logedin.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:35:44
  @Last Modified time: 2018-12-10 16:31:51
\*----------------------------------------*/

import React from 'react';

import { config } from './../../shared/config.js';
import Blacklist from './../blacklist.js';
import Utilities from './../../shared/utilities.js';


export default class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'archiveSize' : 0
		};
	}
	componentDidMount() {
		Utilities.sendMessage("getArchiveSize")
		.then(archiveSize=> {
			this.setState({'archiveSize' : archiveSize});
		})
		Utilities.on("archiveSize", (data, resolve) =>{
			this.setState({'archiveSize' : data});
			resolve(true);
		});
	}
	handleLogout(event){
		Utilities.sendMessage("logout")
		.then(isLoggedIn => this.props.onLoginStatusChange(isLoggedIn));
	}
	handleMyFeed(event){
		Utilities.sendMessage("openTab", config.bcksp_url);
	}
	handleMySettings(event){
		Utilities.sendMessage("openTab", config.bcksp_url+"profile");
	}
	render() {
		return (
			<ul>
				<li>
					<Blacklist/>
				</li>
				<li>
					<button 
							className="" 
							onClick={this.handleMySettings.bind(this)}
						>
							other security settings
					</button>
				</li>
				<li>
					<p>{this.state.archiveSize} characters saved</p>
				</li>
				<li>
					<button 
							className="" 
							onClick={this.handleMyFeed.bind(this)}
						>
							access your archive
					</button>
				</li>
				<li>
					<button 
							className="button--secondary logout" 
							onClick={this.handleLogout.bind(this)}
						>
							logout
					</button>
				</li>
			</ul>
		);
	}
}
