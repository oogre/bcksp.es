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
			<form onSubmit={this.props.onSubmit.bind(this)}>
				{
					!Meteor.userId() && 
						<div className="fields-row">
							<div className="fields-column">
								<label>
									<T>souvenir.item.contact.form.email.label</T>
								</label>
								<input type="email" name="contact.email"/>
							</div>
						</div>
				}
				<div className="fields-row">
					<div className="fields-column">
						<label>
							<T>souvenir.item.contact.form.subject.label</T>
						</label>
						<input type="text" name="contact.subject"/>
					</div>
				</div>
				<div className="fields-row">
					<div className="fields-column">
						<label>
							<T>souvenir.item.contact.form.message.label</T>
						</label>
						<textarea type="text" name="contact.message"></textarea>
					</div>
				</div>
				<div className="fields-row">
					<div className="fields-column">
						<input type="submit" value={i18n.__("souvenir.item.contact.button")}/>
					</div>
				</div>
			</form>
		);
	}
}