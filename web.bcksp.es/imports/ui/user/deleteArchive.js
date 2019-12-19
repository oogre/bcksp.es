/*----------------------------------------*\
  bcksp.es - deleteArchive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:43:12
  @Last Modified time: 2019-12-19 20:44:23
\*----------------------------------------*/
import React, { Component } from 'react';
import { needConfirmation } from './../../utilities/ui.js';
import T from './../../i18n/index.js';

export default class DeleteArchive extends Component {
	constructor(props){
		super(props);
	}
	handleDeleteArchive(event){
		event.preventDefault();
		needConfirmation("userprofile")
		.then(data=>{

		}).catch(e=>{
			console.log("Delete Archive Confirmation",e.message);
		});
		return false;
	}
	render(){
		return (
			<form  onSubmit={this.handleDeleteArchive.bind(this)}>
				<div className="field">
					<label className="field__label">
						<T>userprofile.archive</T>
					</label>
					<input className="button button--secondary" type="submit" value={i18n.__("userprofile.deleteArchive")}/>
				</div>
			</form>
		);
	}
}