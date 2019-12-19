/*----------------------------------------*\
  bcksp.es - indentification.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:25:59
  @Last Modified time: 2019-12-19 23:09:04
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { Component } from 'react';
import  MessageManager from "./../message/manager.js";
import { UpdateEmail } from '../../api/users/methods.js';
import { checkValidEmail } from '../../utilities/validation.js';
import { getEmailOfCurrentUser } from '../../utilities/meteor.js';


export default class Identification extends Component {
	constructor(props){
		super(props);
		this.state = {
			email : "",
			submitNewEmailVisible : false
		}
		this.messageManager = React.createRef();
	}

	submitVisible(flag){
		this.setState({
			submitNewEmailVisible : !!flag
		});
	}
	
	updateEmail(event){
		event.preventDefault();
		if(!this.state.submitNewEmailVisible)return false;
		let newValue = $("input#email").val();
		UpdateEmail.call({email : newValue}, (error, res) =>{
			this.submitVisible(false);
			if (error) {
				this.messageManager.current.setError(true, error);
				$("input#email").val(this.state.email);
			}else{
				this.messageManager.current.setSuccess(true, res.message)
			}
		});
		return false;
	}

	changeEmail(event){
		event.preventDefault();
		let newValue = event.target.value;
		let defaultValue = this.state.email;
		this.submitVisible(false);
		this.messageManager.current.reset();
		if(newValue != defaultValue){
			try{
				checkValidEmail(newValue, false);
				this.submitVisible(true);
			}catch(error){
				this.messageManager.current.setError(true, error);
			}
		}
		return false;
	}
	
	handleStatusChange(e){
		console.log(e);
	}

	render(){
		if(!this.state.email){
			getEmailOfCurrentUser()
			.then(email=>{
				this.setState({email : email});
			})
			.catch(error=>{})
		}
		return (
			<form  onSubmit={this.updateEmail.bind(this)}>
				<div className="field field--profile">
					<label className="field__label" htmlFor="email">
						<T>userprofile.userInfo.email</T>
					</label>
					<span className="input-wrapper--inline">
						<input 	id="email"
								ref="email"
								name="email"
								type="email"
								autoComplete="off"
								placeholder="email"
								className="input--text"
								defaultValue={this.state.email}
								onChange={this.changeEmail.bind(this)}
						/>
					</span>
					{
						this.state.submitNewEmailVisible &&
							<span className="input-wrapper--inline">
								<input className="button button--primary"  type="submit" value={i18n.__("userprofile.userInfo.submit")}/>
							</span>
					}
					<MessageManager ref={this.messageManager} onChange={this.handleStatusChange.bind(this)}/>
					
				</div>
			</form>
		);
	}
}