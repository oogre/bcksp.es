/*----------------------------------------*\
  bcksp.es - blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:02:18
  @Last Modified time: 2019-03-05 12:53:11
\*----------------------------------------*/

import React, { Component } from 'react';
import FixeWait from './fixe/wait.js';
import MyToggleButton from './MyToggleButton.js';
import MessageError from './message/error.js';
import { sendMessage } from './../utilities/com.js';
import { getMessageFromError } from './../utilities/tools.js';

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
		.then(({url, blackListed}) =>{
			this.setState({
				currentURL: url,
				isBlacklisted : !!blackListed
			});
		})
		.catch(e => info(e.message));;
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
		.then(data => {
			this.setState({
				isBlacklisted : !wasBlacklisted,
				'has-success' : data.message,
			});
		})
		.catch(e => {
			this.setState({ 
				error : getMessageFromError(e),
				'has-success' : false,
			});
		})
		.finally(()=>{
			this.setState({ 
				'is-loading' : false,
			});
		});
	}

	render() {
		let self = this;
		return (
			<div class="security">
				<span>
					{ this.state.currentURL } is 
				</span>
				<span>
					<MyToggleButton value={ self.state.isBlacklisted } onToggle={self.handleBlacklistChange.bind(self)} />
				</span>
				<span>
					listed
				</span>
				<div>
					<small>any change will reload the website</small>
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