/*----------------------------------------*\
  bcksp.es - adress.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:22:01
  @Last Modified time: 2020-01-31 13:00:27
\*----------------------------------------*/

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './../shared/textInput.js';
import { errorHandler } from './../../utilities/ui.js';

const FormAdress = ({className, children, name, onSubmit}) => {
	const [ locale, setLocale ] = useState(i18n.getLocale());
	const { register, handleSubmit, errors, setError} = useForm();
	const onSubmitHandler = data => {
  		onSubmit(data)
  		.catch(error => errorHandler(error, setError) );
  	};

  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	
	const T2errors = i18n.createTranslator("errors");
	const T2 = i18n.createTranslator("souvenir.delivery.form");

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
												message: T2errors("email.required")
											},
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message: T2errors("email.not-an-email")
											}
									})}
									label={T2("email.label")}
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
											message: T2errors("fullname.required")
										}
									})}
									label={ T2("adress.fullname.label") }
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
											message: T2errors("address.required")
										}
									})}
									label={ T2("adress.fulladdress.label") }
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
											message: T2errors("city.required")
										}
									})}
									label={ T2("adress.city.label") }
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
											message: T2errors("zip.required")
										}
									})}
									label={ T2("adress.zip.label") }
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
											message: T2errors("country.required")
										}
									})}
									label={ T2("adress.country.label") }
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
		</form>
	)
}
export default FormAdress;