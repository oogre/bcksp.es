/*----------------------------------------*\
  bcksp.es - blindfieldType.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:20:35
  @Last Modified time: 2019-12-19 20:23:43
\*----------------------------------------*/

import React, { Component } from 'react';
import {
	SettingsBlindFieldAdd,
	SettingsBlindFieldRemove,
} from '../../api/settings/methods.js';
import T from './../../i18n/index.js';
import { config } from '../../startup/config.js';
import MyToggleButton from "./../shared/MyToggleButton.js";

export default class BlindfieldType extends Component {
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
	render(){
		return (
			<div>
				<h2><T>userprofile.blindfield.type.title</T></h2>
				<ul className="toggle-list">
					<li>
						<span className="input-wrapper--inline">
							<T>userprofile.blindfield.type.desc</T>
						</span>
					</li>
					{
						config.settings.blindfield.available.types.map((type, k) => (
							<li className="field" key={k}>
								<label className="field__label" htmlFor="">
									{type.value}
								</label>
								<span className="input-wrapper--inline">
									<input className="input--text" type={type.value} defaultValue={type.placeholder} disabled/>
								</span>
								<span className="input-wrapper--inline">
									<MyToggleButton
										value={ this.props.settings.blindfield.types.includes(type.value) }
										onToggle={ flag => this.handleToggleBlindfield(type.value, false, flag) }
										activeLabel={ i18n.__("userprofile.whitelisted") }
										inactiveLabel={ i18n.__("userprofile.blacklisted") }
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