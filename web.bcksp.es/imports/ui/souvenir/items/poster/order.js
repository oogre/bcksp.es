/*----------------------------------------*\
  bcksp.es - order.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-22 15:33:33
  @Last Modified time: 2020-01-11 13:58:44
\*----------------------------------------*/
import React from 'react';
import T from './../../../../i18n/index.js';
import FormAdress from "./../../../form/adress.js";
import { withTracker } from 'meteor/react-meteor-data';
import GeneratorPoster from './../../../generator/poster.js';
import { Souvenirs } from "./../../../../api/souvenirs/souvenirs.js";
import { OrderPoster } from "./../../../../api/souvenirs/methods.js";

const SouvenirItemPosterOrder = ({isReady, souvenir}) => {
	const handleSubmit = async data => {
		data.souvenir._id = souvenir._id;
		return OrderPoster.call(data, (error, data)=>{
			if(error) throw error;
			return data;
		});
	}
	
	if(!isReady)return (null);

	return(
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<T>souvenir.item.poster.title</T>
					</h1>
				</div>
				<div className="shop">
					<FormAdress className="shop-creation" name="souvenir" onSubmit={handleSubmit}>
						<div className="shop-creation__validation">
							<GeneratorPoster sentence={souvenir.data.sentence} shapes={souvenir.data.shapes} disallowRegenerate={true}/>
							<input type="submit" className="button button--primary" name="submit" value={i18n.__("souvenir.item.poster.button.buy")}/>
						</div>
					</FormAdress>
				</div>
			</div>
		</div>
	);
}

export default withTracker(self => {
	return {
		isReady : FlowRouter.subsReady("souvenir.get"),
		souvenir : Souvenirs.findOne({_id : self.id})
	};
})(SouvenirItemPosterOrder);