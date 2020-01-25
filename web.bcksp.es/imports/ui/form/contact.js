/*----------------------------------------*\
  bcksp.es - contact.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-27 13:15:16
  @Last Modified time: 2020-01-25 20:59:56
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, {useState} from 'react';
import FixeWait from './../fixe/wait.js';
import { useForm } from 'react-hook-form';
import FixeError from './../fixe/error.js';
import TextInput from './../shared/textInput.js';
import { Contact } from "./../../api/souvenirs/methods.js";
import { errorHandler, successHandler } from './../../utilities/ui.js';

const FormContact = ({type}) => {
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, errors, setError} = useForm();
	const currentItem = i18n.createTranslator((type == "souvenir") ? "souvenir.item.contact" : "forms.contact");
	const T2 = i18n.createComponent(currentItem);

	const onSubmitHandler = data => {
		if(loading)return;
		setLoading(true);
		Contact.call(data, (error, data)=>{
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
						<T2>title</T2>
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
														message: i18n.__("errors.email.required")
													},
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
														message: i18n.__("errors.email.not-an-email")
													}
											})}
											label={currentItem("form.email.label")}
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
												message: i18n.__("errors.default.required")
											}
										})}
										label={currentItem("form.subject.label")}
										error={errors?.subject?.message}
									/>
								</div>
								<div className="fields-row">
									<div className="field" style={{width:"100%"}}>
										<label 
											htmlFor="message"
											className="field__label"
										>
											<T2>form.message.label</T2>
										</label>
										<textarea 
											id="message" 
											className={"textarea input--text"  + (errors?.message?.message ? " error" : "")}
											type="text"
											name="message"
											ref={register({
												required: {
													message: i18n.__("errors.default.required")
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
							{ !loading && <input className="button button--primary" type="submit" value={currentItem("button")}/> }
							{ loading && <FixeWait/> }
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default FormContact;