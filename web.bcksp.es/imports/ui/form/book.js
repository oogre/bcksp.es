/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:35:17
  @Last Modified time: 2019-02-27 13:17:22
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
			<form onSubmit={this.props.onSubmit.bind(this)}>
				<div className="fields-row">
					<div className="fields-column">
						<label>
							<T>souvenir.item.book.form.author.label</T>
						</label>
						<input type="text" name="book.author"/>
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
							<T>souvenir.delivery.label</T>
						</div>
						<FormAdress name="book.delivery"/>
					</div>
				</div>
				<div className="fields-row">
					<div className="fields-column">
						<input type="submit" value={i18n.__("souvenir.item.book.button")}/>
					</div>
				</div>
			</form>
		);
	}
}