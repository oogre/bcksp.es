/*----------------------------------------*\
  bcksp.es - creation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:16:52
  @Last Modified time: 2020-01-31 12:59:19
\*----------------------------------------*/
/*----------------------------------------*\
  bcksp.es - download.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-26 16:22:51
  @Last Modified time: 2019-12-21 14:19:52
\*----------------------------------------*/

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FixeWait from './../../../fixe/wait.js'
import FixeError from './../../../fixe/error.js'
import { config } from "./../../../../startup/config.js";
import { errorHandler } from './../../../../utilities/ui.js';
import { CreateBook } from "./../../../../api/souvenirs/methods.js";
import { Souvenirs } from "./../../../../api/souvenirs/souvenirs.js";
import PrivateArchiveWrapper from './../../../archive/privateArchiveWrapper.js';

const SouvenirItemBookCreation = () => {
	const [ locale, setLocale ] = useState(i18n.getLocale());
	const [ loading, setLoading ] = useState(false);
	const { register, watch, handleSubmit, errors, setError} = useForm();
  	const T2 = i18n.createTranslator("souvenir.item.book");
  	const T = i18n.createComponent(T2);
  	
  	const Terror = i18n.createTranslator("errors");
  	const author = watch("author", T2("form.author.placeholder"));
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const onSubmitHandler = data => {
		if(loading)return;
		setLoading(true);
		CreateBook.call(data, (error, res) => {
			setLoading(false);
			if (errorHandler(error, setError)) return;
			FlowRouter.go('bookOrder', {id : res.data});
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
							<PrivateArchiveWrapper raw={true} author={author}/>
						</div>
						<ul className="toggle-list">
							<li>
								<span className="input-wrapper--inline">
									<h2 className="page__subtitle">
										<T>form.finishing.label</T>
									</h2>
									
								</span>
							</li>
							<li>
								<span className="input-wrapper--inline">
									<div className="field">
										<label 
											htmlFor="author"
											className="field__label"
										>
											<T>form.author.label</T>
										</label>
										<input 
											id="author"
											className="input--text" 
											type="text"
											name="author"
											ref={
												register({
													maxLength: {
														value : config.book.page.line.char.count,
														message : Terror("author.max-string", {length : config.book.page.line.char.count})
													}
												})
											}
											defaultValue={author}
										/>
									</div>
								</span>
							</li>
							{ 
								errors?.author?.message && 
								<li>
									<span className="input-wrapper--inline">
										<FixeError>{errors.author.message}</FixeError>
									</span>
								</li>
							}
							<li>
								<span className="input-wrapper--inline">
									<div className="field">
										{
											Souvenirs.Finishing.each((value, key) => (
												<label 
													key={key}
													className="input--radio"
													htmlFor={T2("form.finishing."+key+".label")}
												>
													<input 
														className="input--radio__input" 
														type="radio" 
														id={T2("form.finishing."+key+".label")} 
														name="finishing" 
														defaultChecked={value==0}
														ref={register({ 
															required: {
																value : true,
																message : Terror("default.required")
															}
														})}
														value={value}
													/>
													<span className="input--radio__label">
														{T2("form.finishing."+key+".label")}
														<div><small>{T2("form.finishing."+key+".description")}</small></div>
													</span>
													
	      										</label>
	      										
											))
										}
									</div>
								</span>
							</li>
							{ 
								errors?.finishing?.message && 
								<li>
									<span className="input-wrapper--inline">
										<FixeError>{errors.finishing.message}</FixeError>
									</span>
								</li>
							}
							<li>
								<span className="input-wrapper--inline">
									<div className="field">
										<label 
											htmlFor="author"
											className="field__label"
										>
											<T>form.licence.label</T>
										</label>
										{
											Souvenirs.Licence.each((value, k) => (
												<label 
													key={k}
													htmlFor={T2("form.licence."+k+".label")}
													className="input--radio"
												>
													<input 
														className="input--radio__input" 
														type="radio" 
														id={T2("form.licence."+k+".label")} 
														name="licence" 
														defaultChecked={value==0}
														ref={register({ 
															required: {
																value : true,
																message : Terror("default.required")
															}
														})}
														value={value}
													/>
													<span className="input--radio__label">
														{T2("form.licence."+k+".label")}
														<div>
															<small>{T2("form.licence."+k+".description")}</small>
														</div>
													</span>
	      										</label>
											))
										}
									</div>
								</span>
							</li>
							{ 
								errors?.licence?.message && 
								<li>
									<span className="input-wrapper--inline">
										<FixeError>{errors.licence.message}</FixeError>
									</span>
								</li>
							}
							<li>
								<span className="input-wrapper--inline">
									{ loading && <FixeWait/>}
									{ !loading && <input type="submit" value={T2("button.continue")} className="button button--primary"/>}
								</span>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</div>
	);
}


export default SouvenirItemBookCreation;