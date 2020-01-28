/*----------------------------------------*\
  bcksp.es - resetPassword.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:33:10
  @Last Modified time: 2020-01-28 23:09:35
\*----------------------------------------*/

import React, { useState, useEffect } from 'react';
import FixeWait from "./../fixe/wait.js";
import { ResetPassword } from '../../api/users/methods.js';
import { successHandler, errorHandler } from './../../utilities/ui.js';

const ResetPasswordUI = () => {
	const [loading, setLoading] = useState(false);
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T = i18n.createComponent("userprofile.identification.password");
  	const T2 = i18n.createTranslator("userprofile.identification.password");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const handleResetPassword = event => {
		event.preventDefault();
		if(loading)return;
		setLoading(true);
		ResetPassword.call({}, (error, res) =>{
			setLoading(false);
			if(errorHandler(error))return;
			successHandler(res);
		});
		return false;
	}

	return (
		<form  onSubmit={handleResetPassword}>
			<h2><T>label</T></h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						{ loading && <FixeWait/> }
						{ !loading && 
							<input className="button button--primary" type="submit" value={T2("submit")}/>
						}
					</span>
				</li>
			</ul>
		</form>
	);
}

export default ResetPasswordUI;