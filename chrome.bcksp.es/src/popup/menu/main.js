/*----------------------------------------*\
  bcksp.es - logedin.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:35:44
  @Last Modified time: 2019-04-19 14:19:06
\*----------------------------------------*/

import { MDText } from 'i18n-react';
import React, { Component } from 'react';
import Blacklist from './../blacklist.js';
import { config } from './../../shared/config.js';
import { sendMessage, on } from './../../utilities/com.js';
import { log, info, warn, error } from './../../utilities/log.js';

const T = new MDText(JSON.parse(localStorage.getItem("translation")), { MDFlavor: 1 });;

export default class MainMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			archiveSize : 0,
			archiveRatio : 0
		};
	}

	componentDidMount() {
		sendMessage("getArchiveSize")
		.then(archiveSize => this.setState({ archiveSize : archiveSize}))
		.catch(e => error(e));

		sendMessage("getArchiveRatio")
		.then(archiveRatio => this.setState({ archiveRatio : archiveRatio }))
		.catch(e => error(e));

		on("archiveSize", (data, resolve, reject) => {
			this.setState({ archiveSize : data });
			resolve(true);
		});

		on("archiveRatio", (data, resolve, reject) => {
			this.setState({ archiveRatio : data });
			resolve(true);
		});
	}

	handleLogout(event){
		sendMessage("logout")
		.then(isLoggedIn => this.props.onLoginStatusChange(isLoggedIn))
		.catch(e => error(e));
	}

	handleMyFeed(event){
		sendMessage("openTab", config.getHomeUrl())
		.then(data => info(data))
		.catch(e => error(e));
	}

	handleMySettings(event){
		sendMessage("openTab", config.getProfileUrl())
		.then(data => info(data))
		.catch(e => error(e));
	}

	render() {
		return (
			<div>
					<div className="bcksp-popup__body">
						<Blacklist/>
						<div>
							<div className="bcksp-popup__goal">
								<T.p text={{ key : "extension.archive.length", value : this.state.archiveSize }} />
							</div>
							<a href="#">
								<T.span text={{ key: "extension.book.learnmore" }}/>
							</a>
						</div>
					</div>
					<div className="bcksp-popup__counter">
						<div className="bcksp-popup__counter-foreground" style={{
							width: (this.state.archiveRatio * 100).toFixed(2) + "%",
						}}></div>
						<T.p className="sr-only" text={{ key : "extension.archive.ratio", value : (this.state.archiveRatio * 100).toFixed(2) }} />
					</div>
					<ul className="bcksp-popup__user-menu">
						<li className="bcksp-popup__user-menu-item">
							<button className="button button--secondary bcksp-popup__user-menu-button"
									onClick={this.handleMySettings.bind(this)}
							>
									<T.span text={{ key : "extension.links.security" }}/>
							</button>
						</li>
						<li className="bcksp-popup__user-menu-item">
							<button className="button button--secondary bcksp-popup__user-menu-button"
									onClick={this.handleMyFeed.bind(this)}
							>
									<T.span text={{ key: "extension.links.archive" }}/>
							</button>
						</li>
						<li className="bcksp-popup__user-menu-item">
							<button className="button button--secondary bcksp-popup__user-menu-button logout"
									onClick={this.handleLogout.bind(this)}
							>
									<T.span text={{ key: "forms.logout.action" }}/>
							</button>
						</li>
					</ul>
			</div>
		);
	}
}