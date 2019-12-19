/*----------------------------------------*\
  bcksp.es - deleteAccount.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:45:21
  @Last Modified time: 2019-12-19 20:46:05
\*----------------------------------------*/

import React, { Component } from 'react';
import { needConfirmation } from './../../utilities/ui.js';
import T from './../../i18n/index.js';

export default class DeleteAccount extends Component {
	constructor(props){
		super(props);
	}
	handleDeleteAccount(event){
		event.preventDefault();
		needConfirmation("userprofile")
		.then(data=>{

		}).catch(e=>{
			console.log("Delete Account Confirmation",e.message);
		});
		return false;
	}
	render(){
		return (
			<form  onSubmit={this.handleDeleteAccount.bind(this)}>
				<div className="field">
					<label className="field__label">
						<T>userprofile.account</T>
					</label>
					<input className="button button--secondary" type="submit" value={i18n.__("userprofile.deleteAccount")}/>
				</div>
			</form>
		);
	}
}