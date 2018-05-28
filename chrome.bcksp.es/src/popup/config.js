/*----------------------------------------*\
  bcksp.es - config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-29 01:02:18
  @Last Modified time: 2018-05-29 01:27:23
\*----------------------------------------*/
import React from 'react';
import _ from 'underscore';

export default class Config extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentURL : "",
			currentURLBlacklisted : "blacklisted"
		};
	}

	componentDidMount() {
		chrome.runtime.sendMessage({
			action : "getUrl"
		}, ({url, blackListed}) =>{
			this.setState({
				currentURL: url,
				currentURLBlacklisted: !!blackListed ? "blacklisted" : "whitelisted"
			});
		});
	}

	handleBlacklistChange({target}){
		this.setState({
			currentURLBlacklisted: target.value
		});
		
		chrome.runtime.sendMessage({
			action : "changeBWlist",
			data : {
				url : this.state.currentURL,
				blacklisted : target.value == "blacklisted"
			}
		});
	}

	render() {
		return (
	    	<form class="security">
				<div class="fields-row">
					<div class="fields-column">
						<div class="btn-group" data-toggle="buttons">
							<input type="text" name="currentURL" value={this.state.currentURL} disabled/>
							<label>
								<input 
									readOnly
									name="listed"
									type="radio"
									value="whitelisted" 
									checked={this.state.currentURLBlacklisted === 'whitelisted'} 
									onChange={this.handleBlacklistChange.bind(this)}
								/>
								Whitelisted
							</label>
							<label>
								<input 
									readOnly
									name="listed"
									type="radio" 
									value="blacklisted"
									checked={this.state.currentURLBlacklisted === 'blacklisted'} 
									onChange={this.handleBlacklistChange.bind(this)}
								/>
								Blacklisted
							</label>
						</div>
					</div>
				</div>
			</form>
		);
	}
}