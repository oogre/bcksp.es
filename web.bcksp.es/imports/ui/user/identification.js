/*----------------------------------------*\
  bcksp.es - indentification.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:25:59
  @Last Modified time: 2020-01-26 16:13:40
\*----------------------------------------*/

import T from './../../i18n/index.js';
import FixeWait from "./../fixe/wait.js";
import { useForm } from 'react-hook-form';
import FixeError from './../fixe/error.js';
import React, { useEffect, useState } from 'react';
import { regexp } from './../../utilities/validation.js';
import { UpdateEmail } from './../../api/users/methods.js';
import { getEmailOfCurrentUser } from './../../utilities/meteor.js';
import { successHandler, errorHandler } from './../../utilities/ui.js';

let defaultEmail;

const Identification = () => {
	const [ loading, setLoading ] = useState(false);
	const { register, watch, handleSubmit, errors, setError, triggerValidation} = useForm();
  	const email = watch("email", getEmailOfCurrentUser());
  	
  	useEffect(() => {//componentDidMount
  		defaultEmail = getEmailOfCurrentUser();
		return () => {//componentWillUnmount
		}
	}, []); 
  	
	const updateEmailHandler = data => {
		if(loading)return;
		setLoading(true);
		UpdateEmail.call({email : data.email}, (error, res) => {
			setLoading(false);
			if(errorHandler(error, setError))return;
			successHandler(res);
			document.querySelector("#email").value = defaultEmail;
			document.querySelector("#email").focus();
			document.querySelector("#email").blur();
		});
		return false;
	};
	
	return (
		<form  onSubmit={handleSubmit(updateEmailHandler)}>
			<div className="field field--profile">
				<label className="field__label" htmlFor="email">
					<T>userprofile.identification.email.label</T>
				</label>
				
				<div>
					<span className="input-wrapper--inline">
						<input 
							id="email"
							type="email"
							name="email"
							defaultValue={email}
							autoComplete="off"
							className={"input--text"  + (errors?.email?.message ? " error" : "")}
							onChange={async () => triggerValidation("email") }
							ref={register({
								required: {
									message: i18n.__("errors.email.required")
								},
								pattern: {
									value: regexp.email,
									message: i18n.__("errors.email.not-an-email")
								}
							})}
						/>
					</span>
					{ 
						errors?.email?.message && 
							<span className="input-wrapper--inline">
								<FixeError>{errors?.email?.message}</FixeError>
							</span>
					}
					{
						(defaultEmail != email || loading) && (! errors?.email?.message) && 
							<span className="input-wrapper--inline">
								{ loading && <FixeWait/> }
								{ !loading && 
									<input className="button button--primary" type="submit" value={i18n.__("userprofile.identification.email.submit")}/>
								}
							</span>
					}
				</div>
			</div>
		</form>
	);
}

export default Identification;