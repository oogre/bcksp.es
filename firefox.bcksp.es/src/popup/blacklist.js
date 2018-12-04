/*----------------------------------------*\
  bcksp.es - blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:02:18
  @Last Modified time: 2018-10-09 11:51:31
\*----------------------------------------*/

import _ from 'underscore';
import React from 'react';

import Utilities from './../shared/utilities.js';
import ToggleButton from 'react-toggle-button'

export default class Blacklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentURL : "",
			currentURLBlacklisted : "whitelisted",
			isBlacklisted : false
		};
	}

	componentDidMount() {
		Utilities.sendMessage("getUrlStatus")
			.then(({url, blackListed}) =>{
				this.setState({
					currentURL: url,
					isBlacklisted : !!blackListed
				});
			})
			.catch(error => console.warn(error));
	}

	handleBlacklistChange(wasBlacklisted){
		this.setState({
			isBlacklisted : !wasBlacklisted
		});
		let methodName = "";
		if(!wasBlacklisted){
			methodName = "Settings.Blacklist.Add";
		}else{
			methodName = "Settings.Blacklist.Remove";
		}
		Utilities.sendMessage(methodName, this.state.currentURL);
	}

	render() {
		let self = this;
		return (
			<div class="security">
				<span>
					{ this.state.currentURL } is 
				</span>
				<span>
					<ToggleButton
					  colors={{
					  	inactive: {
					      base: 'rgb(128, 128, 128)',
					      hover: 'rgb(150,150,150)',
					    },
					    active: {
					      base: 'rgb(0, 0, 0)',
					      hover: 'rgb(50,50,50)',
					    }
					  }}
					  activeLabel="black"
  					  inactiveLabel="white"
					  value={ self.state.isBlacklisted }
					  thumbStyle={{ borderRadius: 2 }}
					  trackStyle={{ borderRadius: 2 }}
					  onToggle={self.handleBlacklistChange.bind(self)} />
				</span>
				<span>
					listed
				</span>
				<div>
					<small>any change will reload the website</small>
				</div>
				
			</div>
		);
	}
}