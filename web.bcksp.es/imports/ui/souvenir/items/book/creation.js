/*----------------------------------------*\
  bcksp.es - creation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:16:52
  @Last Modified time: 2020-03-04 18:32:23
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
import { getTranslations } from "./../../../../i18n/index.js";
import { errorHandler } from './../../../../utilities/ui.js';
import { successHandler } from './../../../../utilities/ui.js';
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
	const {C, T, E} = getTranslations("souvenir.item.book");
  	const [ loading, setLoading ] = React.useState(false);
	const values = React.useRef(false);
	const { register, triggerValidation, watch, errors, getValues} = useForm();
	const author = watch("author", T("form.author.placeholder"));
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
		Meteor.call("Souvenir.methods.create.book", {
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
						<C>title</C>
					</h1>
				</div>
				<div className="shop">
					<form className="shop-creation">
						<ul className="toggle-list">
							<li>
								<span className="input-wrapper--inline">
									<h2 className="page__subtitle">
										<C>form.finishing.label</C>
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
															message : E("author.max-string", {length : config.book.page.line.char.count})
														}
													})}
										onChange={ async () => triggerValidation("author")}
										label={T("form.author.label")}
										error={errors?.author?.message}
										defaultValue={author}
									/>
								</span>
							</li>
							<li>
								<span className="input-wrapper--inline">
									<RadioInput 
										radios={Souvenirs.Finishing} 
										labels={T("form.finishing")} 
										name="finishing"
										validator={register({ 
											required: {
												value : true,
												message : E("default.required")
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
										labels={T("form.licence")} 
										name="licence"
										validator={register({ 
											required: {
												value : true,
												message : E("default.required")
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