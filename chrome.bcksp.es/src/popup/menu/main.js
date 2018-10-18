/*----------------------------------------*\
  bcksp.es - logedin.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:35:44
  @Last Modified time: 2018-10-12 19:02:56
\*----------------------------------------*/

import React from 'react';
import ReactDOM from 'react-dom';

import { config } from './../../shared/config.js';
import Blacklist from './../blacklist.js';
import Utilities from './../../shared/utilities.js';


export default class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'archiveSize' : 0
		};
		Utilities.sendMessage("getArchiveSize").then(archiveSize=> {
			this.setState({'archiveSize' : archiveSize});
		});
	}
	handleLogout(event){
		Utilities.sendMessage("logout")
		.then(isLoggedIn => this.props.onLoginStatusChange(isLoggedIn))
		.catch(error => console.log(error));
	}
	handleMyFeed(event){
		chrome.tabs.create({ 
			url: config.bcksp_url
		});
	}
	render() {
		return (
			<ul>
				<li>
					<Blacklist/>
				</li>
				<li>
					<p>{this.state.archiveSize} characters saved</p>
				</li>
				<li>
					<a  
							className="" 
							href="#"
						>
							settings
					</a>
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
