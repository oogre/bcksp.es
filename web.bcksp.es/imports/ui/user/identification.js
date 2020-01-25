/*----------------------------------------*\
  bcksp.es - indentification.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:25:59
  @Last Modified time: 2020-01-15 20:08:05
\*----------------------------------------*/

import T from './../../i18n/index.js';
import FixeWait from "./../fixe/wait.js";
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import  MessageManager from "./../message/manager.js";
import { UpdateEmail } from '../../api/users/methods.js';
import { checkValidEmail, regexp } from '../../utilities/validation.js';
import { getEmailOfCurrentUser } from '../../utilities/meteor.js';


let defaultEmail;

const Identification = () => {
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const { register, watch, handleSubmit, errors, setError, triggerValidation} = useForm();
  	const email = watch("email", getEmailOfCurrentUser());
  	const submitVisible = defaultEmail != email && !errors.email && !loading;
  	
  	useEffect(() => {//componentDidMount
  		defaultEmail = getEmailOfCurrentUser();
		return () => {//componentWillUnmount
		}
	}, []); 

	const updateEmail = data => {
		if(loading)return;
		setLoading(true);
		UpdateEmail.call({email : data.email}, (error, res) =>{
			setLoading(false);
			if (error){
				for(let e of error?.details){
					setError(e?.details?.origin || "main" , e.type, e.details.value);		
				}
				return;
			}
			defaultEmail = data.email;
			setSuccess(res);
		});
		return false;
	};
	
	return (
		<form  onSubmit={handleSubmit(updateEmail)}>
			<div className="field field--profile">
				<label className="field__label" htmlFor="email">
					<T>userprofile.identification.email.label</T>
				</label>
				{ 
					loading && 
					<div className="input-wrapper--inline">
						<FixeWait/>
					</div>
				}
				<div>
					<span className="input-wrapper--inline">
						<input 
							id="email"
							type="email"
							name="email"
							defaultValue={email}
							className="input--text" 
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
						submitVisible && 
						<span className="input-wrapper--inline">
							<input className="button button--primary" type="submit" value={i18n.__("userprofile.identification.email.submit")}/>
						</span>
					}
				</div>
				{errors?.email?.message}
				{errors?.main?.message}
				{success?.message}
			</div>
		</form>
	);
}

export default Identification;