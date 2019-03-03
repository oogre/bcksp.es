/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:35:17
  @Last Modified time: 2019-03-03 13:25:36
\*----------------------------------------*/
import FormAdress from "./adress.js";
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import LiveStream from './../archive/LiveStream.js';
import GeneratorPoster from './../generator/poster.js';

export default class FormPoster extends Component {
constructor(props){
		super(props);
		this.state = {
			adressSameForDelivery : true,
			sentence : false,
		}
	}
	onSelect (data){
		if(!_.isEmpty(data)){
			this.setState({
				sentence : data
			});
		}
	}
	toggleDeliveryAdress(){
		this.setState({
			adressSameForDelivery : this.refs.sameForDelivery.checked
		});
	}
	render(){
		const currentItem = i18n.createTranslator("souvenir.item.poster.form");
		return (
			<form onSubmit={this.props.onSubmit.bind(this)}>
				<GeneratorPoster sentence={this.state.sentence}/>
				<div>
					<div className="fields-row">
						<div className="fields-column">
							<label>
								<T>souvenir.item.poster.form.feed</T>
							</label>
							<LiveStream 
								fullscreenAvailable={false} 
								shareAvailable={false}
								onSelect={this.onSelect.bind(this)}
								onLoad={this.onSelect.bind(this)}
							/>
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<div>
								<T>souvenir.delivery.label</T>
							</div>
							{
								!Meteor.userId() && 
									<div>
										<label>
											<T>souvenir.delivery.form.email.label</T>
										</label>
										<input type="email" name="poster.delivery.email" required/>
									</div>
							}
							<FormAdress name="poster.delivery"/>
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<input type="submit" value={i18n.__("souvenir.item.poster.button")}/>
						</div>
					</div>
				</div>
			</form>
		);
	}
}