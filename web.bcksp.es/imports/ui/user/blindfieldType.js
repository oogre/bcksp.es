/*----------------------------------------*\
  bcksp.es - blindfieldType.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:20:35
  @Last Modified time: 2020-03-04 18:50:31
\*----------------------------------------*/


import React from 'react';
import FixeWait from "./../fixe/wait.js";
import { config } from '../../startup/config.js';
import { getTranslations } from "./../../i18n/index.js";
import MyToggleButton from "./../shared/MyToggleButton.js";
import { successHandler, errorHandler } from '../../utilities/ui.js';
import {
	SettingsBlindFieldAdd,
	SettingsBlindFieldRemove,
} from '../../api/settings/methods.js';

const BlindfieldType = ({settings})=>{
	const [loading, setLoading] = React.useState((new Array(config.settings.blindfield.available.types.length)).fill(false));
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("userprofile.settings.blindfield.type");
  	React.useEffect(() => {//componentDidMount
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
			<h2>
				<C>title</C>
			</h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						<C>desc</C>
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
											activeLabel={ T("activeLabel") }
											inactiveLabel={ T("inactiveLabel") }
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