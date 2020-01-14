/*----------------------------------------*\
  bcksp.es - adress.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:22:01
  @Last Modified time: 2020-01-14 21:53:02
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { useState } from 'react';
import TextInput from './../shared/textInput.js';
import { useForm } from 'react-hook-form'


const FormAdress = ({className, children, name, onSubmit}) => {
	const { register, handleSubmit, errors, setError, setValue} = useForm();
	const [success, setSuccess] = useState();
	const onSubmitHandler = data => {
  		onSubmit(data)
  		.then(v=>{
  			//setSuccess({message : v});
  			console.log(v)
  		})
  		.catch(error=>{
  			console.log(error);
  			for(let e of error?.details){
  				setError(e?.details?.origin || "main" , e.type, e.details.value);		
  			}
  		});
  	};
	return (
		<form className={className} onSubmit={handleSubmit(onSubmitHandler)}>
			<div className="shop-creation__order">
				<div className="shop-creation__form">
					
					{
						!Meteor.userId() && 
						<div className="fields-row">
							<div className="fields-column">
								<TextInput 
									name={name + ".email"} 
									validator={register({
											required: {
												message: i18n.__("errors.email.required")
											},
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message: i18n.__("errors.email.not-an-email")
											}
									})}
									label={i18n.__("souvenir.delivery.form.email.label")}
									error={errors[name]?.email?.message}
									defaultValue="vincent@ogre.be"
								/>
							</div>
						</div>
					}

					<div className="fields-row">
						<div className="fields-column">
							<div className="field">
								<TextInput 
									name={ name + ".fullname" }
									validator={register({
										required: {
											message: i18n.__("errors.fullname.required")
										}
									})}
									label={ i18n.__("souvenir.delivery.form.adress.fullname.label") }
									error={errors[name]?.fullname?.message}
									defaultValue="vincent"
								/>
							</div>
						</div>
						<div className="fields-column">
							<div className="field">
								<TextInput 
									name={ name + ".address" }
									validator={register({
										required: {
											message: i18n.__("errors.address.required")
										}
									})}
									label={ i18n.__("souvenir.delivery.form.adress.fulladdress.label") }
									error={errors[name]?.address?.message}
									defaultValue="av v. rousseau 98/3"
								/>
							</div>
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<div className="field">
								<TextInput 
									name={ name + ".city" }
									validator={register({
										required: {
											message: i18n.__("errors.city.required")
										}
									})}
									label={ i18n.__("souvenir.delivery.form.adress.city.label") }
									error={errors[name]?.city?.message}
									defaultValue="forest"
								/>
							</div>
						</div>
						<div className="fields-column">
							<div className="field">
								<TextInput 
									name={ name + ".zip" }
									validator={register({
										required: {
											message: i18n.__("errors.zip.required")
										}
									})}
									label={ i18n.__("souvenir.delivery.form.adress.zip.label") }
									error={errors[name]?.zip?.message}
									defaultValue="1190"
								/>
							</div>
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<div className="field">
								<TextInput 
									name={ name + ".country" }
									validator={register({
										required: {
											message: i18n.__("errors.country.required")
										}
									})}
									label={ i18n.__("souvenir.delivery.form.adress.country.label") }
									error={errors[name]?.country?.message}
									defaultValue="belgique"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{
				React.Children.map(children, (child, k) => child )
			}
			{success?.message}
			{errors?.main?.message}
		</form>
	)
}
export default FormAdress;