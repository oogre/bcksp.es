/*----------------------------------------*\
  bcksp.es - blindfieldType.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:20:35
  @Last Modified time: 2020-01-29 13:31:26
\*----------------------------------------*/


import FixeWait from "./../fixe/wait.js";
import React, { useState, useEffect } from 'react';
import { config } from '../../startup/config.js';
import MyToggleButton from "./../shared/MyToggleButton.js";
import { successHandler, errorHandler } from '../../utilities/ui.js';
import {
	SettingsBlindFieldAdd,
	SettingsBlindFieldRemove,
} from '../../api/settings/methods.js';

const BlindfieldType = ({settings})=>{
	const [loading, setLoading] = useState((new Array(config.settings.blindfield.available.types.length)).fill(false));
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T = i18n.createComponent("userprofile.settings.blindfield.type");
  	const T2 = i18n.createTranslator("userprofile.settings.blindfield.type");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 


	const handleToggleBlindfield = (type, classFlag, toggle, k) => {
		if(_.any(loading))return;
		loading[k] = true;
		setLoading(loading);
		let Action = toggle ? SettingsBlindFieldRemove : SettingsBlindFieldAdd;
		Action.call({type, classFlag}, (error, res) => {
			loading[k] = false;
			setLoading(loading);
			if(errorHandler(error))return;
			successHandler(res);
		});
		return false;
	};
	
	return (
		<div>
			<h2><T>title</T></h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						<T>desc</T>
					</span>
				</li>
				{ 
					config.settings.blindfield.available.types.map((type, k) => (
						<span key={k}>
							<li className="field" >
								<label className="field__label" htmlFor="">
									{type.value}
								</label>
								<span className="input-wrapper--inline">
									<input className="input--text" type={type.value} defaultValue={type.placeholder} disabled/>
								</span>
								<span className="input-wrapper--inline">
									{ loading[k] && <FixeWait/> }
									{ !loading[k] && 
										<MyToggleButton
											value={ settings.blindfield.types.includes(type.value) }
											onToggle={ flag => handleToggleBlindfield(type.value, false, flag, k) }
											activeLabel={ T2("activeLabel") }
											inactiveLabel={ T2("inactiveLabel") }
										/>
									}
								</span>
							</li>
						</span>
					))
				}
			</ul>
		</div>
	);
}

export default BlindfieldType;