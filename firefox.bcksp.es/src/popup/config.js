/*----------------------------------------*\
  runtime-examples - config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-28 01:30:46
  @Last Modified time: 2018-05-28 03:27:32
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
		browser.runtime.sendMessage({
			action : "getUrl"
		}).then(({url, blackListed}) =>{
			this.setState({
				currentURL: url,
				currentURLBlacklisted: !!blackListed ? "blacklisted" : "whitelisted"
			});
		}, error => {
			console.log(error);
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