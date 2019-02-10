/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:35:17
  @Last Modified time: 2019-01-29 19:45:02
\*----------------------------------------*/
import FormAdress from "./adress.js";
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import LiveStream from './../archive/LiveStream.js';

export default class FormPoster extends Component {
constructor(props){
		super(props);
		this.state = {
			adressSameForDelivery : true
		}
	}
	onSelect (data){
		console.log(data);
	}
	render(){
		const currentItem = i18n.createTranslator("souvenir.item.poster.form");
		return (
			<form>
				<div className="fields-row">
					<div className="fields-column">
						<label>
							<T>souvenir.item.poster.form.feed</T>
						</label>
						<LiveStream action={this.onSelect.bind(this)}/>
					</div>
				</div>
				
				<div className="fields-row">
					<div className="fields-column">
						<div>
							<T>souvenir.item.poster.form.adress.billing.label</T>
						</div>
						<FormAdress name="poster.billing"/>
						<div>
							<label>
								<T>souvenir.item.poster.form.adress.billing.VAT.label</T>
							</label>
							<input type="text" name="poster.billing.VAT"/>
						</div>
						<div>
							<label>
								<input type="checkbox" ref="sameForDelivery" name="poster.billing.sameForDelivery" value="true" defaultChecked onChange={this.toggleDeliveryAdress.bind(this)}/>
								<T>souvenir.item.poster.form.adress.billing.sameForDelivery.label</T>
							</label>
						</div>
					</div>
					{
						!this.state.adressSameForDelivery &&
							<div className="fields-column">
								<div>
									<T>souvenir.item.poster.form.adress.delivery.label</T>
								</div>
								<FormAdress name="poster.delivery"/>
							</div>
					}
				</div>
			</form>
		);
	}

	toggleDeliveryAdress(){
		this.setState({
			adressSameForDelivery : this.refs.sameForDelivery.checked
		});
	}
}