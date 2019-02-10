/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:35:17
  @Last Modified time: 2019-01-29 18:56:35
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import FormAdress from "./adress.js";
export default class FormBook extends Component {
constructor(props){
		super(props);
		this.state = {
			adressSameForDelivery : true
		}
	}
	render(){
		const currentItem = i18n.createTranslator("souvenir.item.book.form");
		return (
			<form>
				<div className="fields-row">
					<div className="fields-column">
						<label>
							<T>souvenir.item.book.form.author.label</T>
						</label>
						<input type="text" name="book.author" placeholder={currentItem("author.placeholder")}/>
					</div>
				</div>
				<div className="fields-row">
					<div className="fields-column">
						<label>
							<T>souvenir.item.book.form.finishing.label</T>
						</label>
						<label>
							<input type="radio" name="book.finishing" value="basic" defaultChecked/>
							<T>souvenir.item.book.form.finishing.basic</T>
						</label>
						<label>
							<input type="radio" name="book.finishing" value="premium"/>
							<T>souvenir.item.book.form.finishing.premium</T>
						</label>
					</div>
				</div>
				<div className="fields-row">
					<div className="fields-column">
						<div>
							<T>souvenir.item.book.form.adress.billing.label</T>
						</div>
						<FormAdress name="book.billing"/>
						<div>
							<label>
								<T>souvenir.item.book.form.adress.billing.VAT.label</T>
							</label>
							<input type="text" name="book.billing.VAT"/>
						</div>
						<div>
							<label>
								<input type="checkbox" ref="sameForDelivery" name="book.billing.sameForDelivery" value="true" defaultChecked onChange={this.toggleDeliveryAdress.bind(this)}/>
								<T>souvenir.item.book.form.adress.billing.sameForDelivery.label</T>
							</label>
						</div>
					</div>
					{
						!this.state.adressSameForDelivery &&
							<div className="fields-column">
								<div>
									<T>souvenir.item.book.form.adress.delivery.label</T>
								</div>
								<FormAdress name="book.delivery"/>
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