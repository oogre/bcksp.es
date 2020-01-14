/*----------------------------------------*\
  bcksp.es - creation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:16:52
  @Last Modified time: 2020-01-14 22:14:13
\*----------------------------------------*/
/*----------------------------------------*\
  bcksp.es - download.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-26 16:22:51
  @Last Modified time: 2019-12-21 14:19:52
\*----------------------------------------*/

import T from './../../../../i18n/index.js';
import FixeWait from './../../../fixe/wait.js'
import React, { Component } from 'react';
import PrivateArchiveWrapper from './../../../archive/privateArchiveWrapper.js';
import TextInput from './../../../shared/textInput.js';
import { useForm } from 'react-hook-form'


const SouvenirItemBookCreation = () => {
	const { register, watch, handleSubmit, errors, setError} = useForm();
  	const author = watch("author", "John Doe");
	const onSubmitHandler = data => {
		/*
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
  		*/
  	};
	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<T>souvenir.item.book.title</T>
					</h1>
				</div>
				<div className="shop">
					<form className="shop-creation" onSubmit={handleSubmit(onSubmitHandler)}>
						<div className="shop-creation__order">
							<PrivateArchiveWrapper raw={true} author={author}/>
						</div>
						<div>
							<div className="field">
								<label 
									htmlFor="author"
									className="field__label"
								>
									author
								</label>
								<input 
									id="author"
									className="input--text" 
									type="text"
									name="author"
									ref={register({maxLength: 32})}
									defaultValue={author}
								/>
							</div>
							<input type="submit" value={i18n.__("souvenir.item.book.button.continue")} className="button button--primary"/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}


export default SouvenirItemBookCreation;