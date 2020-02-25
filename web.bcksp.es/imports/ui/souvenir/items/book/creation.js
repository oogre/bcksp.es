/*----------------------------------------*\
  bcksp.es - creation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:16:52
  @Last Modified time: 2020-02-24 23:33:40
\*----------------------------------------*/
/*----------------------------------------*\
  bcksp.es - download.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-26 16:22:51
  @Last Modified time: 2019-12-21 14:19:52
\*----------------------------------------*/

import React from 'react';
import Paypal from "./../../paypal.js";
import { useForm } from 'react-hook-form';
import FixeWait from './../../../fixe/wait.js'
import TextInput from './../../../shared/textInput.js';
import GeneratorBook from './../../../generator/book.js';
import RadioInput from './../../../shared/radioInput.js';
import { config } from "./../../../../startup/config.js";
import { errorHandler } from './../../../../utilities/ui.js';
import { successHandler } from './../../../../utilities/ui.js';
import { CreateBook } from "./../../../../api/souvenirs/methods.js";
import { Souvenirs } from "./../../../../api/souvenirs/souvenirs.js";
import PrivateArchiveWrapper from './../../../archive/privateArchiveWrapper.js';
import { intro, preface } from './../../../../api/books/intro.js';



const SouvenirItemBookCreation = () => {
	React.useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const [ loading, setLoading ] = React.useState(false);
	const values = React.useRef(false);
	const { register, triggerValidation, watch, errors, getValues} = useForm();
  	const T2 = i18n.createTranslator("souvenir.item.book");
  	const T = i18n.createComponent(T2);
  	const Terror = i18n.createTranslator("errors");
  	const author = watch("author", T2("form.author.placeholder"));
  	const finishing = watch("finishing", 0);
  	const amount = config.souvenir.book[Souvenirs.Finishing.getName(finishing)].price.amount;
	const onCreateOrder = () => {
		values.current = getValues();
  	}
  	const onCancel = () => {
		setLoading(false);
		values.current = false;
  	}
  	const onError = () => {
  		setLoading(false);
  		values.current = false;
  	}
	const onApproved = ({order}) => {
		if(loading)return;
		setLoading(true);
		CreateBook.call({
			book : values.current,
			order : {
				...order
			}
		}, (error, data) => {
			setProcessing(false);
			setLoading(false);
			if (errorHandler(error)) return;
			if(successHandler(data)){
				FlowRouter.go('home');
			}
		});
	}

	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<T>title</T>
					</h1>
				</div>
				<div className="shop">
					<form className="shop-creation">
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
									<TextInput 
										name="author"
										validator={register({
														maxLength: {
															value : config.book.page.line.char.count,
															message : Terror("author.max-string", {length : config.book.page.line.char.count})
														}
													})}
										onChange={ async () => triggerValidation("author")}
										label={T2("form.author.label")}
										error={errors?.author?.message}
										defaultValue={author}
									/>
								</span>
							</li>
							<li>
								<span className="input-wrapper--inline">
									<RadioInput 
										radios={Souvenirs.Finishing} 
										labels={T2("form.finishing")} 
										name="finishing"
										validator={register({ 
											required: {
												value : true,
												message : Terror("default.required")
											}
										})}
										error={errors?.finishing?.message}
									/>
								</span>
							</li>
							<li>
								<span className="input-wrapper--inline">
									<RadioInput 
										radios={Souvenirs.Licence} 
										labels={T2("form.licence")} 
										name="licence"
										validator={register({ 
											required: {
												value : true,
												message : Terror("default.required")
											}
										})}
										error={errors?.licence?.message}
									/>
								</span>
							</li>
							<li>
								<span className="input-wrapper--inline">
									{ loading && <FixeWait/>}
									{ _.isEmpty(errors) && !loading &&
										<Paypal amount={amount} onApproved={onApproved} onCreateOrder={onCreateOrder} onCancel={onCancel} onError={onError}/>
									}
								</span>
							</li>
						</ul>
						<div className="shop-creation__order">
							<PrivateArchiveWrapper Renderer={GeneratorBook} author={author} intro={intro} preface={preface}/> 
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}


export default SouvenirItemBookCreation;