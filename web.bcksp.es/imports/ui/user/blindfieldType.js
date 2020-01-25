/*----------------------------------------*\
  bcksp.es - blindfieldType.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:20:35
  @Last Modified time: 2020-01-15 19:24:13
\*----------------------------------------*/


import React, { useState } from 'react';
import FixeWait from "./../fixe/wait.js";
import {
	SettingsBlindFieldAdd,
	SettingsBlindFieldRemove,
} from '../../api/settings/methods.js';
import T from './../../i18n/index.js';
import { config } from '../../startup/config.js';
import MyToggleButton from "./../shared/MyToggleButton.js";

const BlindfieldType = ({settings})=>{
	const [loading, setLoading] = useState((new Array(config.settings.blindfield.available.types.length)).fill(false));
	const handleToggleBlindfield = (type, classFlag, toggle, k) => {
		if(_.any(loading))return;
		loading[k] = true;
		setLoading(loading);
		let Action = toggle ? SettingsBlindFieldRemove : SettingsBlindFieldAdd;
		Action.call({type, classFlag}, (err, res) => {
			loading[k] = false;
			setLoading(loading);
			console.log(err, res);
		});
		return false;
	};
	
	const displayBlindfieldType = (type, k) => (
		<span key={k}>
			<li className="field" >
				<label className="field__label" htmlFor="">
					{type.value} { loading[k] && <span className="input-wrapper--inline"><FixeWait/></span> }
				</label>
				<span className="input-wrapper--inline">
					<input className="input--text" type={type.value} defaultValue={type.placeholder} disabled/>
				</span>
				<span className="input-wrapper--inline">
					<MyToggleButton
						value={ settings.blindfield.types.includes(type.value) }
						onToggle={ flag => handleToggleBlindfield(type.value, false, flag, k) }
						activeLabel={ i18n.__("userprofile.settings.blindfield.type.activeLabel") }
						inactiveLabel={ i18n.__("userprofile.settings.blindfield.type.inactiveLabel") }
					/>
				</span>
			</li>
		</span>
	);

	return (
		<div>
			<h2><T>userprofile.settings.blindfield.type.title</T></h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						<T>userprofile.settings.blindfield.type.desc</T>
					</span>
				</li>
				{ config.settings.blindfield.available.types.map(displayBlindfieldType) }
			</ul>
		</div>
	);
}

export default BlindfieldType;