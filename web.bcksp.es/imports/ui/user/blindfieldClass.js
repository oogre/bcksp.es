/*----------------------------------------*\
  bcksp.es - blindfieldClass.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:16:39
  @Last Modified time: 2020-03-04 18:49:21
\*----------------------------------------*/

import React from 'react';
import FixeWait from "./../fixe/wait.js";
import { getTranslations } from "./../../i18n/index.js";
import MyToggleButton from "./../shared/MyToggleButton.js";
import { successHandler, errorHandler } from '../../utilities/ui.js';
import {
	SettingsBlindFieldAdd,
	SettingsBlindFieldRemove
} from '../../api/settings/methods.js';

const BlindfieldClass = ({settings}) => {
	const [ loading, setLoading ] = React.useState(false);
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("userprofile.settings.blindfield.class");
  	React.useEffect(() => {//componentDidMount
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
			<h2><C>title</C></h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						<C>desc</C>
					</span>
				</li>
				{ 
					settings.blindfield.class.map((type, k) => (
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
										activeLabel={T("activeLabel")}
										inactiveLabel={T("inactiveLabel")}
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