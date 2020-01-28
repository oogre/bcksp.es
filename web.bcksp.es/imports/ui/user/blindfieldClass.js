/*----------------------------------------*\
  bcksp.es - blindfieldClass.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:16:39
  @Last Modified time: 2020-01-28 23:42:53
\*----------------------------------------*/

import FixeWait from "./../fixe/wait.js";
import React, { useState, useEffect } from 'react';
import MyToggleButton from "./../shared/MyToggleButton.js";
import { successHandler, errorHandler } from '../../utilities/ui.js';
import {
	SettingsBlindFieldAdd,
	SettingsBlindFieldRemove
} from '../../api/settings/methods.js';

const BlindfieldClass = ({settings}) => {
	const [ loading, setLoading ] = useState(false);
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T = i18n.createComponent("userprofile.settings.blindfield.class");
  	const T2 = i18n.createTranslator("userprofile.settings.blindfield.class");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const handleToggleBlindfield = (type, classFlag, toggle) => {
		if(loading)return;
		setLoading(true);
		let Action = toggle ? SettingsBlindFieldRemove : SettingsBlindFieldAdd;
		Action.call({type, classFlag}, (error, res) =>{
			setLoading(false);
			if(errorHandler(error))return;
			successHandler(res);
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
					settings.blindfield.types.map((type, k) => (
						<li key={k}>
							<span className="input-wrapper--inline">
								 <span>{type} :</span>
							</span>
							<span className="input-wrapper--inline">
								{ loading && <FixeWait/> }
								{ !loading && 
									<MyToggleButton
										value={ true }
										onToggle={ flag => handleToggleBlindfield(type, true, flag) }
										activeLabel={T2("activeLabel")}
										inactiveLabel={T2("inactiveLabel")}
									/>
								}
							</span>
						</li>
					))
				}
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