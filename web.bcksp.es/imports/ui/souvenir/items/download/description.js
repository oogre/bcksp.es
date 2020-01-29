/*----------------------------------------*\
  bcksp.es - description.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:40:21
  @Last Modified time: 2020-01-28 23:49:04
\*----------------------------------------*/

import saveAs from 'file-saver';
import FixeWait from './../../../fixe/wait.js'
import React, { useState, useEffect } from 'react';
import { errorHandler, successHandler } from './../../../../utilities/ui.js';


const SouvenirItemDownLoadDescription = () => {
	const [loading, setLoading] = useState(false);
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T = i18n.createComponent("souvenir.item.download");
  	const T2 = i18n.createTranslator("souvenir.item.download");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const downloadArchive = () => {
		if(loading)return;
		setLoading(true);
		Meteor.call("Archives.methods.download", (error, res)=>{
			setLoading(false);
			if (errorHandler(error))return;
			let blob = new Blob(res.data, {type: "text/plain;charset=utf-8"});
			saveAs(blob, T2("file.name")+".txt");
			if(successHandler(res)){
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
					<div className="shop__example-illustration">
						<img className="shop__example-illustration-img" src={T2("img")} alt="" />
					</div>
					<div className="shop__example-detail">
						<p className="shop__example-description"><T>description</T></p>
						<p className="shop__example-price"><T>price</T></p>
						{ loading && <FixeWait/> }
						{ !loading && 
							<button className="button button--primary" onClick={downloadArchive}>
								<T>button.create</T>
							</button>
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SouvenirItemDownLoadDescription;