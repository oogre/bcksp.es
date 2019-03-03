/*----------------------------------------*\
  bcksp.es - adress.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:22:01
  @Last Modified time: 2019-02-25 21:55:02
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { Component } from 'react';

export default class FormAdress extends Component {

	constructor(props){
		super(props);
	}
	invalidHandler(event){
		console.log(event.target, event.type);
	}
	render(){
		return (
			<div>
				<div>
					<label>
						<T>souvenir.delivery.form.adress.fullname.label</T>
					</label>
					<input type="text" name={this.props.name + ".fullname"} required onInvalid={this.invalidHandler.bind(this)}/>
				</div>
				<div>
					<label>
						<T>souvenir.delivery.form.adress.fulladdress.label</T>
					</label>
					<input type="text" name={this.props.name + ".address.1"} required/>
					<input type="text" name={this.props.name + ".address.2"}/>
				</div>
				<div>
					<label>
						<T>souvenir.delivery.form.adress.city.label</T>
					</label>
					<input type="text" name={this.props.name + ".city"} required/>
				</div>
				<div>
					<label>
						<T>souvenir.delivery.form.adress.zip.label</T>
					</label>
					<input type="text" name={this.props.name + ".zip"} required/>
				</div>
				<div>
					<label>
						<T>souvenir.delivery.form.adress.country.label</T>
					</label>
					<input type="text" name={this.props.name + ".country"} required/>
				</div>
			</div>
		);
	}
}