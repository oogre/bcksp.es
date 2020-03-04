/*----------------------------------------*\
  bcksp.es - description.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:40:21
  @Last Modified time: 2020-03-04 18:36:00
\*----------------------------------------*/

import React from 'react';
import saveAs from 'file-saver';
import FixeWait from './../../../fixe/wait.js'
import { getTranslations } from "./../../../../i18n/index.js";
import { errorHandler, successHandler } from './../../../../utilities/ui.js';


const SouvenirItemDownLoadDescription = () => {
	const [loading, setLoading] = React.useState(false);
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("souvenir.item.download");

  	React.useEffect(() => {//componentDidMount
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
			saveAs(blob, T("file.name")+".txt");
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
						<C>title</C>
					</h1>
				</div>
				<div className="shop">
					<div className="shop__example-illustration">
						<img className="shop__example-illustration-img" src={T("img")} alt="" />
					</div>
					<div className="shop__example-detail">
						<p className="shop__example-description">
							<C>description</C>
						</p>
						<p className="shop__example-price">
							<C>price</C>
						</p>
						{ loading && <FixeWait/> }
						{ !loading && 
							<button className="button button--primary" onClick={downloadArchive}>
								<C>button.create</C>
							</button>
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SouvenirItemDownLoadDescription;