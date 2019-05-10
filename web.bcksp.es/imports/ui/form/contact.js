/*----------------------------------------*\
  bcksp.es - contact.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-27 13:15:16
  @Last Modified time: 2019-02-27 13:32:00
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import FormAdress from "./adress.js";
export default class FormContact extends Component {
constructor(props){
		super(props);
	}
	render(){
		const currentItem = i18n.createTranslator("souvenir.item.contact.form");
		return (
			<form className="shop-creation" onSubmit={this.props.onSubmit.bind(this)}>
				<div className="shop-creation__order">
					<div className="shop-creation__form">
						{
							!Meteor.userId() &&
								<div className="fields-row">
									<div className="field">
										<label htmlFor="souvenirContactEmail" className="field__label">
											<T>souvenir.item.contact.form.email.label</T>
										</label>
										<input id="souvenirContactEmail" className="input--text" type="email" name="contact.email"/>
									</div>
								</div>
						}
						<div className="">
							<div className="field">
								<label htmlFor="souvenirContactSubject" className="field__label">
									<T>souvenir.item.contact.form.subject.label</T>
								</label>
								<input id="souvenirContactSubject" className="input--text" type="text" name="contact.subject"/>
							</div>
							<div className="field">
								<label htmlFor="souvenirContactMessage" className="field__label">
									<T>souvenir.item.contact.form.message.label</T>
								</label>
								<textarea id="souvenirContactMessage" className="textarea" type="text" name="contact.message"></textarea>
							</div>
							<div className="field">
								<input className="button button--primary" type="submit" value={i18n.__("souvenir.item.contact.button")}/>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}