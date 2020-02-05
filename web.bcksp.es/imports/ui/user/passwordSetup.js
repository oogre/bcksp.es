/*----------------------------------------*\
  dev - enrollment.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-20 13:29:36
  @Last Modified time: 2020-02-05 13:57:13
\*----------------------------------------*/

import ReactModal from 'react-modal';// https://reactcommunity.org/react-modal/
import FixeWait from '../fixe/wait.js';
import FixeError from '../fixe/error.js';
import { useForm } from 'react-hook-form';
import { config } from '../../startup/config.js';
import React, { useState, useEffect } from 'react';
import { successHandler, errorHandler } from './../../utilities/ui.js';

ReactModal.setAppElement('body');

const UserPasswordSetup = ({token, onComplete}) => {
	const [ loading, setLoading ] = useState(false);
	const [ locale, setLocale ] = useState(i18n.getLocale());
	const { register, handleSubmit, errors, setError, triggerValidation, watch} = useForm();
	const T = i18n.createComponent("forms.resetPassword");
	const T2 = i18n.createTranslator("forms.resetPassword");
	const Terror = i18n.createTranslator("errors");
	
	const onSubmitHandler = ({password}) => {
  		if(loading)return;
		setLoading(true);
		Accounts.resetPassword(token, password, (error) => {
			setLoading(false);
			if(errorHandler(error)) return;
			successHandler({
				success : true,
				message : {
					title : i18n.createTranslator("forms.resetPassword")("success"),
					content : ""
				}
			});
			_.isFunction(onComplete) && onComplete();
		})
  	};

  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 
	
	const modalStyle = {
		overlay : {
			position          : 'fixed',
			top               : 0,
			left              : 0,
			right             : 0,
			bottom            : 0,
			backgroundColor   : 'rgba(40, 40, 40, 0.9)',
			zIndex            : 9999
		},
		content : {
			position                   : 'absolute',
			top                        : '50%',
			left                       : '50%',
			minWidth				   : '300px',
			maxWidth				   : '460px',
			width				   	   : '50% ',
			right                      : 'auto',
			bottom                     : 'auto',
			marginRight           	   : '-50%',
			transform                  : 'translate(-50%, -50%)',
			border                     : '0',
			backgroundColor   		   : 'rgba(255, 255, 255, 0.9)',
			color                      : '#342e30',
			overflow                   : 'auto',
			WebkitOverflowScrolling    : 'touch',
			borderRadius               : '0',
			outline                    : 'none',
			padding                    : '20px'
		}
	}
	
	return (
		<div className="container">
			<ReactModal
				isOpen={true}
				style={modalStyle}
				className="modal--tiny"
			>
				<div className="modal__wrapper">
					<div className="modal__container">
						<form className="login-user" onSubmit={handleSubmit(onSubmitHandler)}>
							<div className="fields-row">
								<div className="field">
									<label 
										htmlFor="password"
										className="field__label"
									>
										<T>password</T>
									</label>
									<input 
										autoComplete="off"
										id="password" 
										className={"input--text"  + (errors?.password?.message ? " error" : "")}
										type="password"
										name="password"
										ref={register({
											required: {
												message: Terror("password.required")
											},
											maxLength: {
												value : config.user.password.length.max,
												message : Terror("password.max-string", {length : config.user.password.length.max})
											}, 
											minLength: {
												value : config.user.password.length.min,
												message : Terror("password.min-string", {length : config.user.password.length.min})
											}
										})}
									/>
									{ 
										errors?.password?.message && 
										<span className="input-wrapper--inline">
											<FixeError>{errors?.password?.message}</FixeError>
										</span>
									}
								</div>
							</div>
							<div className="fields-row">
								<div className="field">
										<label 
											htmlFor="passwordConfirm"
											className="field__label"
										>
											<T>passwordConfirm</T>
										</label>
										<input 
											autoComplete="off"
											id="passwordConfirm" 
											className={"input--text"  + (errors?.passwordConfirm?.message ? " error" : "")}
											type="password"
											name="passwordConfirm"
											ref={register({
												validate: value => value === watch('password') || Terror("passwordConfirm.no-match")
											})}
										/>
										{ 
											errors?.passwordConfirm?.message && 
											<span className="input-wrapper--inline">
												<FixeError>{errors?.passwordConfirm?.message}</FixeError>
											</span>
										}
									</div>
							</div>
							<div className="fields-row">
								{ !loading && <input type="submit" className="button button--primary" name="submit" value={T2("submit")}/> }
								{ loading && <FixeWait/> }
							</div>
						</form>
					</div>
				</div>
			</ReactModal>
		</div>
	);
}

export default UserPasswordSetup;