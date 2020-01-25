/*----------------------------------------*\
  bcksp.es - order.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-22 15:33:33
  @Last Modified time: 2020-01-25 19:47:38
\*----------------------------------------*/
import React, {useState} from 'react';
import T from './../../../../i18n/index.js';
import FixeWait from './../../../fixe/wait.js';
import FormAdress from "./../../../form/adress.js";
import { withTracker } from 'meteor/react-meteor-data';
import GeneratorPoster from './../../../generator/poster.js';
import { successHandler } from './../../../../utilities/ui.js';
import { Souvenirs } from "./../../../../api/souvenirs/souvenirs.js";
import { OrderPoster } from "./../../../../api/souvenirs/methods.js";


const SouvenirItemPosterOrder = ({isReady, souvenir}) => {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async data => {
		if(loading)return;
		setLoading(true);
		data.souvenir._id = souvenir._id;
		return OrderPoster.call(data, (error, data)=>{
			setLoading(false);
			if(error) throw error;
			if(successHandler(data)){
				FlowRouter.go('home');
			}
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
							{ !loading && <input type="submit" className="button button--primary" name="submit" value={i18n.__("souvenir.item.poster.button.buy")}/> }
							{ loading && <FixeWait/> }
						</div>
					</FormAdress>
				</div>
			</div>
		</div>
	);
}

export default withTracker(self => {
	let isReady = FlowRouter.subsReady("souvenir.get.poster");
	let souvenir;
	if(isReady){
		souvenir = Souvenirs.findOne({_id : self.id});
		if(!souvenir){
			FlowRouter.go("home");
		}
	}
	return {
		isReady : isReady,
		souvenir : souvenir && Souvenirs.find({_id : self.id}).map(s=>s.populate())[0]
	};
})(SouvenirItemPosterOrder);