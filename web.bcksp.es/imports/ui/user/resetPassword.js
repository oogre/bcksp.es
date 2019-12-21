/*----------------------------------------*\
  bcksp.es - resetPassword.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:33:10
  @Last Modified time: 2019-12-20 21:07:51
\*----------------------------------------*/

import React, { Component } from 'react';
import { ResetPassword } from '../../api/users/methods.js';
import T from './../../i18n/index.js';
import { getMessageFromError } from './../../utilities/ui.js';

export default class ResetPasswordUI extends Component {
	constructor(props){
		super(props);
		
	}
	
	handleResetPassword(event){
		event.preventDefault();
		ResetPassword.call({}, (err, res) =>{
			if(err){
				console.log(getMessageFromError(err));
			}else{
				alert(res.message);
			}
		});
		return false;
	}

	render(){
		return (
			<form  onSubmit={this.handleResetPassword.bind(this)}>
				<div className="field">
					<label className="field__label">
						<T>userprofile.userInfo.resetpassword</T>
					</label>
					<input className="button button--primary" type="submit" value={i18n.__("userprofile.userInfo.submit")}/>
				</div>
			</form>
		);
	}
}