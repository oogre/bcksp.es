/*----------------------------------------*\
  bcksp.es - creation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:16:52
  @Last Modified time: 2020-01-28 22:49:45
\*----------------------------------------*/

import { useForm } from 'react-hook-form';
import FixeWait from './../../../fixe/wait.js'
import React, { useState, useEffect } from 'react';
import ArchiveWrapper from './../../../archive/wrapper.js';
import GeneratorPoster from './../../../generator/poster.js';
import { errorHandler } from './../../../../utilities/ui.js';
import { CreatePoster } from "./../../../../api/souvenirs/methods.js";


const SouvenirItemPosterCreation  = () => {
	const [ sentence, setSentence ] = useState(false);
	const [ shapes, setShapes ] = useState({});
	const [ loading, setLoading ] = useState(false);
	const { register, watch, handleSubmit } = useForm();
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T = i18n.createComponent("souvenir.item.poster");
  	const T2 = i18n.createTranslator("souvenir.item.poster");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const onSubmitHandler = data => {
		if(loading)return;
		setLoading(true);
		let designData = JSON.parse($("[data-design-poster]").attr("data-design-poster"));
		data.sentence = sentence;
		data.shapes = shapes;
		data.fontSize=designData.fontSize;
		data.lineHeight=designData.lineHeight;
		
		CreatePoster.call(data, (error, res) => {
			setLoading(false);
			if (errorHandler(error)) return;
			FlowRouter.go('posterOrder', {id : res.data});
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
					<form className="shop-creation" onSubmit={handleSubmit(onSubmitHandler)}>
						<div className="shop-creation__order">
							<ArchiveWrapper
								type="shop"
								fullscreenAvailable={false}
								onSelect={sentence=>setSentence(sentence)}
								onLoad={sentence=>setSentence(sentence)}
							/>
						</div>
						<div>
							<GeneratorPoster sentence={sentence} onShapes={shapes=>setShapes(shapes)}/>
							{ loading && <FixeWait/> }
							{ !loading && <input type="submit" value={T2("button.continue")} className="button button--primary"/> }
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SouvenirItemPosterCreation;
