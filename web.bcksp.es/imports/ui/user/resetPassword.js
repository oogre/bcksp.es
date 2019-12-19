/*----------------------------------------*\
  bcksp.es - resetPassword.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:33:10
  @Last Modified time: 2019-12-19 20:35:57
\*----------------------------------------*/

import React, { Component } from 'react';
import { ResetPassword } from '../../api/users/methods.js';
import T from './../../i18n/index.js';

export default class ResetPasswordUI extends Component {
	constructor(props){
		super(props);
		
	}
	
	handleResetPassword(event){
		event.preventDefault();
		ResetPassword.call({}, (err, res) =>{
			console.log(err);
			if (err) {
				err.details.forEach((fieldError) => {
          			console.log(fieldError.details.value);
        		});
			}else{
				console.log(res);
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