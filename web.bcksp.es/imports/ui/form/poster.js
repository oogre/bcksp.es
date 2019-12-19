/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:35:17
  @Last Modified time: 2019-11-26 16:04:15
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
			formVisible: false,
			shapes : {}
		}
	}
	onSelect (data){
		if(!_.isEmpty(data)){
			this.setState({ sentence : data });
		}
	}
	toggleDeliveryAdress(){
		this.setState({
			adressSameForDelivery : this.refs.sameForDelivery.checked
		});
	}
	showForm(){
		this.setState({
			formVisible: true
		});
	}
	shapeHandler(shapes){
		this.setState({ shapes: shapes });
	}
	render(){
		const currentItem = i18n.createTranslator("souvenir.item.poster.form");
		return (
			<form className="shop-creation" onSubmit={this.props.onSubmit.bind(this)}>
				<div className="shop-creation__order">
					{
						!this.state.formVisible &&
						<div>
							<LiveStream
								type="shop"
								fullscreenAvailable={false}
								shareAvailable={false}
								onSelect={this.onSelect.bind(this)}
								onLoad={this.onSelect.bind(this)}
							/>
						</div>
					}

					{
						this.state.formVisible &&
						<div className="shop-creation__form">
							<div className="fields-row">
								<div className="fields-column">
									<div>
										<T>souvenir.delivery.label</T>
									</div>
									{
										!Meteor.userId() &&
											<div className="field">
												<label htmlFor="posterDeliveryEmail" className="field__label">
													<T>souvenir.delivery.form.email.label</T>
												</label>
												<input id="posterDeliveryEmail" className="input--text" type="email" name="poster.delivery.email" required/>
											</div>
									}
								</div>
							</div>

							<FormAdress name="poster.delivery"/>

						</div>
					}
				</div>
				<div>
					{
						!this.state.formVisible &&
						<div>
							<GeneratorPoster sentence={this.state.sentence} onShapes={this.shapeHandler.bind(this)}/>
							<button className="button button--primary" onClick={this.showForm.bind(this)}><T>souvenir.item.poster.button.continue</T></button>
						</div>
					}
					{
						this.state.formVisible &&
						<div className="shop-creation__validation">
							<div>
								<GeneratorPoster sentence={this.state.sentence} shapes={this.state.shapes} disallowRegenerate={true}/>
							</div>
							<input type="submit" className="button button--primary" value={i18n.__("souvenir.item.poster.button.buy")}/>
						</div>
					}
				</div>
			</form>
		);
	}
}
//<div className="shop-creation__validation-preview">
//<img alt="Souvenir preview" className="shop-creation__validation-preview-img" src="" />
//</div>
