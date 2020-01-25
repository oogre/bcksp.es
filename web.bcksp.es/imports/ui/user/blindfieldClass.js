/*----------------------------------------*\
  bcksp.es - blindfieldClass.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:16:39
  @Last Modified time: 2020-01-15 19:02:05
\*----------------------------------------*/
import React, { useState } from 'react';
import FixeWait from "./../fixe/wait.js";
import {
	SettingsBlindFieldAdd,
	SettingsBlindFieldRemove
} from '../../api/settings/methods.js';
import T from './../../i18n/index.js';
import { config } from '../../startup/config.js'
import MyToggleButton from "./../shared/MyToggleButton.js";

const BlindfieldClass = ({settings}) => {
	const [loading, setLoading] = useState(false);

	const handleToggleBlindfield = (type, classFlag, toggle) => {
		if(loading)return;
		setLoading(true);
		let Action = toggle ? SettingsBlindFieldRemove : SettingsBlindFieldAdd;
		Action.call({type, classFlag}, (err, res) =>{
			setLoading(false);
			console.log(err, res);
		});
		return false;
	};
	const handleBlindfieldClassSubmit = (event) => {
		event.preventDefault();
		let value;;
		switch(event.type){
			case "submit" :
				value = event.target[0].value;
				event.target[0].value = "";
			break;
			case "blur" : 
				value = event.target.value;
				event.target.value = "";
			break;
		}
		value = value.trim();
		if(_.isEmpty(value)) return false;
		handleToggleBlindfield(value, true, false)
		return false;
	};
	const displayBlindfieldClass = (type, k) => (
		<li key={k}>
			<span className="input-wrapper--inline">
				 <span>{type} :</span>
			</span>
			<span className="input-wrapper--inline">
				<MyToggleButton
					value={ true }
					onToggle={ flag => handleToggleBlindfield(type, true, flag) }
					activeLabel={i18n.__("userprofile.settings.blindfield.class.activeLabel")}
					inactiveLabel={i18n.__("userprofile.settings.blindfield.class.inactiveLabel")}
				/>
			</span>
		</li>
	);
	return (
		<div>
			<h2><T>userprofile.settings.blindfield.class.title</T></h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						<T>userprofile.settings.blindfield.class.desc</T>
					</span>
				</li>
				{ 
					loading && 
					<li>
						<span className="input-wrapper--inline">
							<FixeWait/>
						</span>
					</li>
				}
				{ settings.blindfield.class.map(displayBlindfieldClass) }
				<li>
					<div className="field field--profile">
						<form onSubmit={handleBlindfieldClassSubmit}>
							<input className="input--text" type="text" onBlur={ handleBlindfieldClassSubmit }/>
						</form>
					</div>
				</li>
			</ul>
		</div>
	);
}

export default BlindfieldClass;