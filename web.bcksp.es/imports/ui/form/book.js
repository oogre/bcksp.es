/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:35:17
  @Last Modified time: 2019-05-20 13:30:21
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import FormAdress from "./adress.js";
export default class FormBook extends Component {
constructor(props){
		super(props);
	}
	render(){
		const currentItem = i18n.createTranslator("souvenir.item.book.form");
		return (
			<form className="shop-creation" onSubmit={this.props.onSubmit.bind(this)}>
				<div className="shop-creation__order">
					<div className="shop-creation__form">
						<div className="fields-row">
							<div className="field">
								<label htmlFor="bookAuthor" className="field__label">
									<T>souvenir.item.book.form.author.label</T>
								</label>
								<input id="bookAuthor" className="input--text" type="text" name="book.author"/>
							</div>
						</div>
						<div className="field">
							<label className="field__label">
								<T>souvenir.item.book.form.finishing.label</T>
							</label>
							<div className="fields-row">
								<div className="fields-column">
									<div className="field">
										<label className="input--radio">
											<input className="input--radio__input" type="radio" name="book.finishing" value="basic" defaultChecked/>
											<span className="input--radio__label"><T>souvenir.item.book.form.finishing.basic</T></span>
										</label>
									</div>
								</div>
								<div className="fields-column">
									<div className="field">
										<label className="input--radio">
											<input className="input--radio__input" type="radio" name="book.finishing" value="premium"/>
											<span className="input--radio__label"><T>souvenir.item.book.form.finishing.premium</T></span>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="fields-row">
							<div className="field--fullwidth">
								<label className="field__label">
									<T>souvenir.delivery.label</T>
								</label>
								<FormAdress name="book.delivery" errors={this.props.errors}/>
							</div>
						</div>
					</div>
				</div>
				<div className="shop-creation__validation">
					<div className="shop-creation__validation-preview">
						<img alt="Souvenir preview" className="shop-creation__validation-preview-img" src="" />
					</div>
					<input type="submit" className="button button--primary" value={i18n.__("souvenir.item.book.button")}/>
				</div>
			</form>
		);
	}
}