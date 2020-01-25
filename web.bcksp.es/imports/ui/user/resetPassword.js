/*----------------------------------------*\
  bcksp.es - resetPassword.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:33:10
  @Last Modified time: 2020-01-19 09:14:46
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { useState } from 'react';
import FixeWait from "./../fixe/wait.js";
import { useForm } from 'react-hook-form';
import { errorHandler } from '../../utilities/ui.js';
import { ResetPassword } from '../../api/users/methods.js';

const ResetPasswordUI = () => {
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const { errors, setError } = useForm();

	const handleResetPassword = event => {
		event.preventDefault();
		if(loading)return;
		setLoading(true);
		
		ResetPassword.call({}, (err, res) =>{
			setLoading(false);
			if(!errorHandler(err, setError)){
				setSuccess(res);
			}
		});
		return false;
	}

	return (
		<form  onSubmit={handleResetPassword}>
			<h2><T>userprofile.identification.password.label</T></h2>
			<ul className="toggle-list">
				{ 
					loading && 
					<li>
						<span className="input-wrapper--inline">
							<FixeWait/>
						</span>
					</li>
				}
				<li>
					<span className="input-wrapper--inline">
						<input className="button button--primary" type="submit" value={i18n.__("userprofile.identification.password.submit")}/>
					</span>
				</li>
			</ul>
			{errors?.main?.message}
			{success?.message}
		</form>
	);
}

export default ResetPasswordUI;