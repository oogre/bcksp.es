/*----------------------------------------*\
  bcksp.es - forgotPwd.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-12-26 12:47:44
  @Last Modified time: 2020-02-18 16:55:27
\*----------------------------------------*/

import React from 'react';
import FixeWait from './../fixe/wait.js';
import { useForm } from 'react-hook-form';
import FixeError from './../fixe/error.js';
import { T } from './../../utilities/tools.js';
import { sendMessage } from './../../utilities/com.js';
import { validation } from './../../utilities/validation.js';

const ForgotPwdForm = ({onSuccess}) => {
	const [loading, setLoading] = React.useState(false);
	const { register, handleSubmit, errors, setError, watch, triggerValidation} = useForm();
	const handleForgotPwd = data => {
		if(loading)return;
		setLoading(true);
		sendMessage("forgotPwd", data)
		.then(onSuccess)
		.catch(error => setError("main", error.errorType, error.reason) )
		.finally(() => setLoading(false));

	}

	return (
    	<form className="login-user" onSubmit={handleSubmit(handleForgotPwd)}>
			<div>
				<div className="field">
					<label className="field__label" htmlFor="email">
						<T.span text={{ key : "forms.resetPassword.email" }}/>
					</label>
					<input 	className={"input--text"  + (errors && errors.email && errors.email.message ? " error" : "")}
							id="email" 
							type="text"
							ref={register(validation.email())}
							name="email"
							autoComplete="off"
					/>
					{ 
						errors && errors.email && errors.email.message && 
						<span className="input-wrapper--inline">
							<FixeError>{errors && errors.email && errors.email.message}</FixeError>
						</span>
					}
				</div>
			</div>
			<div className="field">
				{ 
					!loading && 
					<input 	className="button button--secondary"
						type="submit"
						value={T.translate("forms.resetPassword.action")}
					/>
				}
				{ loading && <FixeWait/> }
				{ 
					errors && errors.main && errors.main.message && 
					<span className="input-wrapper--inline">
						<FixeError>{errors && errors.main && errors.main.message}</FixeError>
					</span>
				}
			</div>
			
		</form>
	);
}
export default ForgotPwdForm;