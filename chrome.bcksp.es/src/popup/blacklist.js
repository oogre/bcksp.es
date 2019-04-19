/*----------------------------------------*\
  bcksp.es - blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:02:18
  @Last Modified time: 2019-04-18 17:44:28
\*----------------------------------------*/
import { MDText } from 'i18n-react';
import FixeWait from './fixe/wait.js';
import React, { Component } from 'react';
import MessageError from './message/error.js';
import MyToggleButton from './MyToggleButton.js';
import { sendMessage } from './../utilities/com.js';
import { getMessageFromError } from './../utilities/tools.js';
import { log, info, warn, error } from './../utilities/log.js';

const T = new MDText(JSON.parse(localStorage.getItem("translation")), { MDFlavor: 1 });;

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
		.catch(e => this.setState({ error : getMessageFromError(e), 'has-success' : false }))
		.finally(() => this.setState({ 'is-loading' : false }));
	}

	render() {
		let self = this;
		return (
			<div class="security">
				<span>
					{ this.state.currentURL } is 
				</span>
				<span>
					<MyToggleButton 
						value={ self.state.isBlacklisted } onToggle={self.handleBlacklistChange.bind(self)} 
						activeLabel={ T.translate("userprofile.whitelisted") }
						inactiveLabel={ T.translate("userprofile.blacklisted") }
					/>
				</span>
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