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
				<div className="fields-row">
					<div className="fields-column">
						<div className="field">
							<label className="field__label">
								<T>souvenir.delivery.form.adress.fullname.label</T>
							</label>
							<input className="input--text" type="text" name={this.props.name + ".fullname"} required onInvalid={this.invalidHandler.bind(this)}/>
						</div>
					</div>
					<div className="fields-column">
						<div className="field">
							<label className="field__label">
								<T>souvenir.delivery.form.adress.fulladdress.label</T>
							</label>
							<input className="input--text input--text--address" type="text" name={this.props.name + ".address.1"} required/>
							<input className="input--text input--text--address" type="text" name={this.props.name + ".address.2"}/>
						</div>
					</div>
				</div>
				<div className="fields-row">
					<div className="fields-column">
						<div className="field">
							<label className="field__label">
								<T>souvenir.delivery.form.adress.city.label</T>
							</label>
							<input className="input--text" type="text" name={this.props.name + ".city"} required/>
						</div>
					</div>
					<div className="fields-column">
						<div className="field">
							<label className="field__label">
								<T>souvenir.delivery.form.adress.zip.label</T>
							</label>
							<input className="input--text" type="text" name={this.props.name + ".zip"} required/>
						</div>
					</div>
				</div>
				<div className="fields-row">
					<div className="fields-column">
						<div className="field">
							<label className="field__label">
								<T>souvenir.delivery.form.adress.country.label</T>
							</label>
							<input className="input--text" type="text" name={this.props.name + ".country"} required/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}