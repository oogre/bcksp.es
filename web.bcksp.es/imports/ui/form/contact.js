/*----------------------------------------*\
  bcksp.es - contact.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-27 13:15:16
  @Last Modified time: 2020-02-25 17:06:58
\*----------------------------------------*/
import React, {useState, useEffect} from 'react';
import FixeWait from './../fixe/wait.js';
import { useForm } from 'react-hook-form';
import FixeError from './../fixe/error.js';
import TextInput from './../shared/textInput.js';
import { errorHandler, successHandler } from './../../utilities/ui.js';

const FormContact = ({type}) => {
	const [ locale, setLocale ] = useState(i18n.getLocale());
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, errors, setError} = useForm();

  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const contactType = (type == "souvenir") ? "souvenir.item.contact" : "forms.contact";
	const T2errors = i18n.createTranslator("errors");
	const T = i18n.createComponent(contactType);
	const T2 = i18n.createTranslator(contactType);

	const onSubmitHandler = data => {
		if(loading)return;
		setLoading(true);
		Meteor.call("Souvenir.methods.contact", data, (error, data)=>{
			setLoading(false);
			if (errorHandler(error, setError)) return;
			if(successHandler(data)){
				FlowRouter.go('home');
			}
		});
  	};

	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<T>title</T>
					</h1>
				</div>
				<div className="shop">
					<form className="shop-creation" onSubmit={handleSubmit(onSubmitHandler)}>
						<div className="shop-creation__order">
							<div className="shop-creation__form">
								{
									!Meteor.userId() && 
									<div className="fields-row">
										<TextInput 
											name="email"
											validator={register({
													required: {
														message: T2errors("email.required")
													},
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
														message: T2errors("email.not-an-email")
													}
											})}
											label={T2("form.email.label")}
											error={errors?.email?.message}
											defaultValue="vincent@ogre.be"
										/>
									</div>
								}
								<div className="fields-row">
									<TextInput 
										name="subject"
										validator={register({
											required: {
												message: T2errors("default.required")
											}
										})}
										label={T2("form.subject.label")}
										error={errors?.subject?.message}
									/>
								</div>
								<div className="fields-row">
									<div className="field" style={{width:"100%"}}>
										<label 
											htmlFor="message"
											className="field__label"
										>
											<T>form.message.label</T>
										</label>
										<textarea 
											id="message" 
											className={"textarea input--text"  + (errors?.message?.message ? " error" : "")}
											type="text"
											name="message"
											ref={register({
												required: {
													message: T2errors("default.required")
												}
											})}
										/>
										{ 
											errors?.message?.message && 
											<span className="input-wrapper--inline">
												<FixeError>{errors?.message?.message}</FixeError>
											</span>
										}
									</div>
								</div>
							</div>
						</div>
						<div className="shop-creation__validation">
							{ !loading && <input className="button button--primary" type="submit" value={T2("button")}/> }
							{ loading && <FixeWait/> }
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default FormContact;