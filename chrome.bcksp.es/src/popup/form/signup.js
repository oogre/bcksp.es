/*----------------------------------------*\
  bcksp.es - signup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:11:37
  @Last Modified time: 2020-02-18 16:55:51
\*----------------------------------------*/

import React from 'react';
import FixeWait from './../fixe/wait.js';
import { useForm } from 'react-hook-form';
import FixeError from './../fixe/error.js';
import { T } from './../../utilities/tools.js';
import { sendMessage } from './../../utilities/com.js';
import { validation } from './../../utilities/validation.js';


const SignupForm = ({onSuccess}) => {
	const [loading, setLoading] = React.useState(false);
	const { register, handleSubmit, errors, setError, watch, triggerValidation} = useForm();
	const handleSignup = data => {
		if(loading)return;
		setLoading(true);
		sendMessage("signup", data)
		.then(onSuccess)
		.catch(error => setError("main", error.errorType, error.reason) )
		.finally(() => setLoading(false));
	}
	
	return (
		<form className="signup-user" onSubmit={handleSubmit(handleSignup)}>
			<div className="field">
				<label className="field__label" htmlFor="email">
					<T.span text={{ key : "forms.signup.email" }}/>
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
			<div className="field">
				<label className="field__label" htmlFor="password">
					<T.span text={{ key : "forms.signup.pwd" }}/>
				</label>
				<input 	className={"input--text"  + (errors && errors.password && errors.password.message ? " error" : "")}
						id="password" 
						type="password"
						onChange={async () => triggerValidation("password") }
						ref={register(validation.password())}
						name="password"
						autoComplete="off"
				/>
				{ 
					errors && errors.password && errors.password.message && 
					<span className="input-wrapper--inline">
						<FixeError>{errors && errors.password && errors.password.message}</FixeError>
					</span>
				}
			</div>
			<div className="field">
				<label className="field__label" htmlFor="passwordConfirm">
					<T.span text={{ key : "forms.signup.pwdconf" }}/>
				</label>
				<input 	className={"input--text"  + (errors && errors.passwordConfirm && errors.passwordConfirm.message ? " error" : "")}
						id="passwordConfirm" 
						type="password" 
						onChange={async () => triggerValidation("passwordConfirm") }
						ref={register(validation.passwordConfirm(()=>watch('password')))}
						name="passwordConfirm"
						autoComplete="off"
				/>
				{ 
					errors && errors.passwordConfirm && errors.passwordConfirm.message && 
					<span className="input-wrapper--inline">
						<FixeError>{errors && errors.passwordConfirm && errors.passwordConfirm.message}</FixeError>
					</span>
				}
			</div>
			<div className="fields-row text-right">
				{ 
					!loading && 
					<input 	className="button button--secondary"
						type="submit"
						value={T.translate("forms.signup.action")}
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
export default SignupForm;