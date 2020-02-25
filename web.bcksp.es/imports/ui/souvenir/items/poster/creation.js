/*----------------------------------------*\
  bcksp.es - creation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:16:52
  @Last Modified time: 2020-02-24 23:33:52
\*----------------------------------------*/

import React from 'react';
import Paypal from "./../../paypal.js";
import FixeWait from './../../../fixe/wait.js'
import { config } from './../../../../startup/config.js';
import ArchiveWrapper from './../../../archive/wrapper.js';
import GeneratorPoster from './../../../generator/poster.js';
import { errorHandler } from './../../../../utilities/ui.js';
import { successHandler } from './../../../../utilities/ui.js';
import { CreatePoster } from "./../../../../api/souvenirs/methods.js";




const SouvenirItemPosterCreation  = () => {
	const posterGeneratorRef = React.useRef()
	const [ loading, setLoading ] = React.useState(false);
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const T = i18n.createComponent("souvenir.item.poster");
  	const T2 = i18n.createTranslator("souvenir.item.poster");
  	const setSelection = (selection)=> {
		if(!_.isEmpty(selection.content)){
			posterGeneratorRef.current.setSentence(selection.content);	
		}
	};

  	React.useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 
  	const onCancel = () => {
		setLoading(false);
  	}
  	const onError = () => {
  		setLoading(false);
  	}
	const onApproved = ({order}) => {
		if(loading)return;
		setLoading(true);
		CreatePoster.call({
			poster : posterGeneratorRef.current.getPosterVar(),
			order : {
				...order
			}
		}, (error, data) => {
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
					<div className="shop-creation">
						<div className="shop-creation__order">
							<ArchiveWrapper
								type="shop"
								fullscreenAvailable={false}
								onSelect={setSelection}
								autoSelect={{
									startAt : 0,
									stopAt : 30
								}}
							/>
						</div>
						<div>
							<GeneratorPoster ref={posterGeneratorRef}/>
							{ loading && <FixeWait/> }
							{ 
								!loading && <Paypal amount={config.souvenir.poster.price.amount} onApproved={onApproved} onCancel={onCancel} onError={onError}/>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SouvenirItemPosterCreation;
