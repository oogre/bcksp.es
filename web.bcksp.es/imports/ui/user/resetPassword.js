/*----------------------------------------*\
  bcksp.es - resetPassword.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:33:10
  @Last Modified time: 2020-01-26 16:24:22
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { useState } from 'react';
import FixeWait from "./../fixe/wait.js";
import { ResetPassword } from '../../api/users/methods.js';
import { successHandler, errorHandler } from './../../utilities/ui.js';

const ResetPasswordUI = () => {
	const [loading, setLoading] = useState(false);
	
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
			<h2><T>userprofile.identification.password.label</T></h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						{ loading && <FixeWait/> }
						{ !loading && 
							<input className="button button--primary" type="submit" value={i18n.__("userprofile.identification.password.submit")}/>
						}
					</span>
				</li>
			</ul>
		</form>
	);
}

export default ResetPasswordUI;