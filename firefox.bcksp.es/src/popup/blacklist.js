/*----------------------------------------*\
  bcksp.es - blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:02:18
  @Last Modified time: 2020-02-05 16:05:54
\*----------------------------------------*/
import FixeWait from './fixe/wait.js';
import React, { Component } from 'react';
import MessageError from './message/error.js';
import MyToggleButton from './MyToggleButton.js';
import { sendMessage } from './../utilities/com.js';
import { log, info, warn, error } from './../utilities/log.js';
import { T } from './../utilities/tools.js';

export default class Blacklist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentURL : "",
			currentURLBlacklisted : "whitelisted",
			isBlacklisted : false,
			'error' : false,
			'is-loading' : false,
			'has-success' : false
		};
	}

	componentDidMount() {
		sendMessage("getUrlStatus")
		.then(({url, blackListed}) => this.setState({ currentURL : url, isBlacklisted : !!blackListed }))
		.catch(e => error(e));
	}

	handleBlacklistChange(wasBlacklisted){
		this.setState({
			'error' : false,
			'is-loading' : true,
			'has-success' : false
		});
		let methodName = "";
		if(!wasBlacklisted){
			methodName = "blacklistAdd";
		}else{
			methodName = "blacklistRemove";
		}
		sendMessage(methodName, this.state.currentURL)
		.then(data => this.setState({ isBlacklisted : !wasBlacklisted, 'has-success' : data.message }))
		.catch(e => this.setState({ error : handleError(e), 'has-success' : false }))
		.finally(() => this.setState({ 'is-loading' : false }));
	}

	render() {
		let self = this;
		return (
			<div className="security">
				<div className="field">
					{
						self.state.isBlacklisted && 
							<T.span  className="field__label" text={{ key: "userprofile.settings.blacklist.label.inactiveLabel", url :  this.state.currentURL}}/>
					}

					{
						!self.state.isBlacklisted && 
							<T.span  className="field__label" text={{ key: "userprofile.settings.blacklist.label.activeLabel", url :  this.state.currentURL}}/>
					}
					<MyToggleButton
						value={ self.state.isBlacklisted } onToggle={self.handleBlacklistChange.bind(self)}
						activeLabel={ T.translate("userprofile.settings.blacklist.activeLabel") }
						inactiveLabel={ T.translate("userprofile.settings.blacklist.inactiveLabel") }
					/>
				</div>
				{
					this.state["error"] &&
					<MessageError
						messages={this.state["error"]}
					/>
				}
				{
					this.state['is-loading'] &&
					<FixeWait/>
				}
			</div>
		);
	}
}