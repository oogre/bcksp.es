/*----------------------------------------*\
  bcksp.es - adress.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-27 22:22:01
  @Last Modified time: 2019-11-26 16:00:55
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { Component } from 'react';
import FixeError from './../fixe/error.js';
import TextInput from './../shared/textInput.js';
import { checkString } from './../../utilities/validation.js'
export default class FormAdress extends Component {

	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<div>
				<div className="fields-row">
					<div className="fields-column">
						<div className="field">
							<TextInput 
								name={ this.props.name + ".fullname" }
								label={ i18n.__("souvenir.delivery.form.adress.fullname.label") }
								type="text"
								validators={[checkString]}
								//error={this.props.errors[this.props.name + ".fullname"]}
							/>
						</div>
					</div>
					<div className="fields-column">
						<div className="field">
							<TextInput 
								name={ this.props.name + ".address.1" }
								label={ i18n.__("souvenir.delivery.form.adress.fulladdress.label") }
								type="text"
								validators={[checkString]}
							/>
							<TextInput 
								name={ this.props.name + ".address.2" }
								type="text"
								//error={this.props.errors[this.props.name + ".address.2"]}
							/>
						</div>
					</div>
				</div>
				<div className="fields-row">
					<div className="fields-column">
						<div className="field">
							<TextInput 
								name={ this.props.name + ".city" }
								label={ i18n.__("souvenir.delivery.form.adress.city.label") }
								type="text"
								validators={[checkString]}
								//error={this.props.errors[this.props.name + ".city"]}
							/>
						</div>
					</div>
					<div className="fields-column">
						<div className="field">
							<TextInput 
								name={ this.props.name + ".zip" }
								label={ i18n.__("souvenir.delivery.form.adress.zip.label") }
								type="text"
								validators={[checkString]}
								//error={this.props.errors[this.props.name + ".zip"]}
							/>
						</div>
					</div>
				</div>
				<div className="fields-row">
					<div className="fields-column">
						<div className="field">
							<TextInput 
								name={ this.props.name + ".country" }
								label={ i18n.__("souvenir.delivery.form.adress.country.label") }
								type="text"
								validators={[checkString]}
								//error={this.props.errors[this.props.name + ".country"]}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}