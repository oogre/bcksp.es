/*----------------------------------------*\
  bcksp.es - adress.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:22:01
  @Last Modified time: 2019-01-29 18:55:02
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { Component } from 'react';

export default class FormAdress extends Component {

	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<div>
					<label>
						<T>souvenir.item.book.form.adress.name.label</T>
					</label>
					<input type="text" name={this.props.name + ".name"}/>
				</div>
				<div>
					<label>
						<T>souvenir.item.book.form.adress.street.label</T>
					</label>
					<input type="text" name={this.props.name + ".street"}/>
				</div>
				<div>
					<label>
						<T>souvenir.item.book.form.adress.number.label</T>
					</label>
					<input type="text" name={this.props.name + ".number"}/>
				</div>
				<div>
					<label>
						<T>souvenir.item.book.form.adress.city.label</T>
					</label>
					<input type="text" name={this.props.name + ".city"}/>
				</div>
				<div>
					<label>
						<T>souvenir.item.book.form.adress.zip.label</T>
					</label>
					<input type="text" name={this.props.name + ".zip"}/>
				</div>
				<div>
					<label>
						<T>souvenir.item.book.form.adress.country.label</T>
					</label>
					<input type="text" name={this.props.name + ".country"}/>
				</div>
			</div>
		);
	}
}