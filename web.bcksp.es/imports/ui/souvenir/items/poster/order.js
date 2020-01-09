/*----------------------------------------*\
  bcksp.es - order.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-22 15:33:33
  @Last Modified time: 2019-12-23 15:52:55
\*----------------------------------------*/
import FormAdress from "./../../../form/adress.js";
import T from './../../../../i18n/index.js';
import React, { Component } from 'react';
import LiveStream from './../../../archive/LiveStream.js';
import GeneratorPoster from './../../../generator/poster.js';
import { Souvenirs } from "./../../../../api/souvenirs/souvenirs.js";
import { withTracker } from 'meteor/react-meteor-data';
import { OrderPoster } from "./../../../../api/souvenirs/methods.js";

class SouvenirItemPosterOrder extends Component {
	constructor(props){
		super(props);
		this.state = {
			adressSameForDelivery : true,
			error : false,
			success : false,
			loading : false
		}
	}
	toggleDeliveryAdress(){
		this.setState({
			adressSameForDelivery : this.refs.sameForDelivery.checked
		});
	}

	handleSubmit(event){
		event.preventDefault();
		let data = {};
		for(let info of event.currentTarget){

			let splittedName = info.name.split(".");
			for(let i of splittedName){console.log(i)}
			//data[info.name] = info.value;
		}
		this.setState({
			error : false,
			success : false,
			loading : true,
		});
		console.log(data);
		OrderPoster.call(data, (error, data)=>{
			this.setState({
				loading : false,
			});
			if(error){
				console.log(error);
				/*this.setState({
					error : getMessageFromError(error),
					success : false,
				});*/
				return;
			}
			this.setState({
				'success' : data
			});
		});
		return false;
	}

	render(){
		if(!this.props.isReady)return (null);
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title">
							<T>souvenir.item.poster.title</T>
						</h1>
					</div>
					<div className="shop">
						<form className="shop-creation" onSubmit={this.handleSubmit.bind(this)}>
							<input type="hidden" name="souvenir._id" value={this.props.souvenir._id} />
							<div className="shop-creation__order">
								<div className="shop-creation__form">
									<FormAdress name="souvenir"/>
								</div>
							</div>
							<div>
								<div className="shop-creation__validation">
									<GeneratorPoster sentence={this.props.souvenir.data.sentence} shapes={this.props.souvenir.data.shapes} disallowRegenerate={true}/>
									<input type="submit" className="button button--primary" name="submit" value={i18n.__("souvenir.item.poster.button.buy")}/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default withTracker(self => {
	
	return {
		isReady : FlowRouter.subsReady("getSouvenir"),
		souvenir : Souvenirs.findOne({_id : self.id})
	};
})(SouvenirItemPosterOrder);
