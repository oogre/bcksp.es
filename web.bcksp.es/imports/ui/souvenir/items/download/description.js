/*----------------------------------------*\
  bcksp.es - description.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:40:21
  @Last Modified time: 2020-01-25 19:34:11
\*----------------------------------------*/

import saveAs from 'file-saver';
import React, { useState } from 'react';
import T from './../../../../i18n/index.js';
import FixeWait from './../../../fixe/wait.js'
import { errorHandler, successHandler } from './../../../../utilities/ui.js';


const SouvenirItemDownLoadDescription = () => {
	const [loading, setLoading] = useState(false);
	
	const downloadArchive = () => {
		if(loading)return;
		setLoading(true);
		Meteor.call("Archives.methods.download", (error, res)=>{
			setLoading(false);
			if (errorHandler(error))return;
			let blob = new Blob(res.data, {type: "text/plain;charset=utf-8"});
			saveAs(blob, i18n.__("souvenir.item.download.file.name")+".txt");
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
						<T>souvenir.item.download.title</T>
					</h1>
				</div>
				<div className="shop">
					<div className="shop__example-illustration">
						<img className="shop__example-illustration-img" src={i18n.__("souvenir.item.download.img")} alt="" />
					</div>
					<div className="shop__example-detail">
						<p className="shop__example-description"><T>souvenir.item.download.description</T></p>
						<p className="shop__example-price"><T>souvenir.item.download.price</T></p>
						{ loading && <FixeWait/> }
						{ !loading && 
							<button className="button button--primary" onClick={downloadArchive}>
								<T>souvenir.item.download.button.create</T>
							</button>
						}
					</div>
				</div>
				
				
			</div>
		</div>
	);
}

export default SouvenirItemDownLoadDescription;