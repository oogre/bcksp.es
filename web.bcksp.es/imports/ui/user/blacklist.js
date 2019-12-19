/*----------------------------------------*\
  bcksp.es - blacklist.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:12:11
  @Last Modified time: 2019-12-19 20:14:28
\*----------------------------------------*/

import React, { Component } from 'react';
import { SettingsBlacklistRemove } from '../../api/settings/methods.js';
import T from './../../i18n/index.js';
import MyToggleButton from "./../shared/MyToggleButton.js";

export default class Blacklist extends Component {
	constructor(props){
		super(props);
	}
	handleToggleBlacklist(url){
		SettingsBlacklistRemove.call({url});
		return false;
	}
	render(){
		return (
			<div>
				<h2>{
					_.isEmpty(this.props.settings.blacklist) ?
						<T>userprofile.noBlacklist.title</T>
					:
						<T>userprofile.blacklist.title</T>
				}</h2>
				<ul className="toggle-list">
					<li>
						<span className="input-wrapper--inline">
							<T>userprofile.noBlacklist.desc</T>
						</span>
					</li>
					{
						!_.isEmpty(this.props.settings.blacklist) &&
						this.props.settings.blacklist.map((url, k) => (
							<li key={k}>
								<span className="input-wrapper--inline">
									{url}
								</span>
								<span className="input-wrapper--inline">
									<MyToggleButton
										value={ true }
										onToggle={flag=>{this.handleToggleBlacklist(url, flag)}}
										activeLabel={i18n.__("userprofile.whitelisted")}
										inactiveLabel={i18n.__("userprofile.blacklisted")}
									/>
								</span>
							</li>
						))
					}
				</ul>
			</div>
		);
	}
}