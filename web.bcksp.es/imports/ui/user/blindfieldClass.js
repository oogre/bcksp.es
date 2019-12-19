/*----------------------------------------*\
  bcksp.es - blindfieldClass.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:16:39
  @Last Modified time: 2019-12-19 20:19:41
\*----------------------------------------*/
import React, { Component } from 'react';
import {
	SettingsBlindFieldAdd,
	SettingsBlindFieldRemove
} from '../../api/settings/methods.js';
import T from './../../i18n/index.js';
import { config } from '../../startup/config.js'
import MyToggleButton from "./../shared/MyToggleButton.js";

export default class BlindfieldClass extends Component {
	constructor(props){
		super(props);
	}
	handleToggleBlindfield(type, classFlag, toggle){
		if(toggle){
			SettingsBlindFieldRemove.call({type, classFlag});
		}else{
			SettingsBlindFieldAdd.call({type, classFlag});
		}
		return false;
	}
	handleBlindfieldClassBlur(event){
		event.preventDefault();
		event.target.value = event.target.value.trim();
		if(_.isEmpty(event.target.value))return false;
		this.handleToggleBlindfield(event.target.value, true, false)
		event.target.value = "";
		return false;
	}
	render(){
		return (
			<div>
				<h2><T>userprofile.blindfield.class.title</T></h2>
				<ul className="toggle-list">
					<li>
						<span className="input-wrapper--inline">
							<T>userprofile.blindfield.class.desc</T>
						</span>
					</li>
					{
						this.props.settings.blindfield.class.map((c, k) => (
							<li key={k}>
								<span className="input-wrapper--inline">
									 <span>{c} :</span>
								</span>
								<span className="input-wrapper--inline">
									<MyToggleButton
										value={ true }
										onToggle={flag=>{this.handleToggleBlindfield(c, true, flag)}}
										activeLabel={i18n.__("userprofile.whitelisted")}
										inactiveLabel={i18n.__("userprofile.blacklisted")}
									/>
								</span>
							</li>
						))
					}
					<li>
						<div className="field field--profile">
							<input className="input--text" type="text" onBlur={this.handleBlindfieldClassBlur.bind(this)}/>
						</div>
					</li>
				</ul>
			</div>
		);
	}
}