/*----------------------------------------*\
  web.bitRepublic - profile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-21 00:58:47
  @Last Modified time: 2019-01-09 17:41:49
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { needConfirmation } from './../../utilities/ui.js';
import { ResetPassword, UpdateEmail } from '../../api/users/methods.js';
import { SettingsBlacklistRemove, SettingsBlindFieldAdd, SettingsBlindFieldRemove } from '../../api/settings/methods.js';
import T from './../../i18n/index.js';
import { Settings } from './../../api/settings/settings.js';
import { config } from '../../startup/config.js'
import MyToggleButton from "./../template/MyToggleButton.js";

class UserProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			email : ""
		}
	}
	
	static getDerivedStateFromProps(props, state) {
		return {
			email : props.userMail || "",
			validEmail : true
		}
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
	
	handleDeleteArchive(event){
		event.preventDefault();
		needConfirmation("userprofile")
		.then(data=>{
			
		}).catch(e=>{
			console.log("Delete Archive Confirmation",e.message);
		});
		return false;
	}

	handleToggleBlindfield(type, classFlag, toggle){
		if(toggle){
			SettingsBlindFieldRemove.call({type, classFlag});
		}else{
			SettingsBlindFieldAdd.call({type, classFlag});
		}
		return false;
	}
	handleToggleBlacklist(url){
		SettingsBlacklistRemove.call({url});
		return false;
	}
	handleBlindfieldClassBlur(event){
		event.preventDefault();
		event.target.value = event.target.value.trim();
		if(_.isEmpty(event.target.value))return false;
		this.handleToggleBlindfield(event.target.value, true, false)
		event.target.value = "";
		return false;
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
	renderBlacklist(){
		if(!this.props.isSettingsReady)return;
		return this.props.settings.blacklist.map((url, k) => (
			<li key={k}>
				<span style={{display: "inline-block"}}>
					<MyToggleButton 
						value={ true } 
						onToggle={flag=>{this.handleToggleBlacklist(url, flag)}}
					/>
				</span>
				<span>
					 : {url}
				</span>
			</li>
		))
	}
	renderBlindfieldClass(){
		if(!this.props.isSettingsReady)return;
		return this.props.settings.blindfield.class.map((c, k) => (
			<li key={k}>
				<span style={{display: "inline-block"}}>
					<MyToggleButton 
						value={ true } 
						onToggle={flag=>{this.handleToggleBlindfield(c, true, flag)}}
					/>
				</span>
				<span>
					 : {c}
				</span>
			</li>
		))
	}
	renderBlindfieldType(){
		if(!this.props.isSettingsReady)return;
		return config.settings.blindfield.types.map((type, k) => (
			<li key={k}>
				<span style={{display: "inline-block"}}>
					<MyToggleButton 
						value={ this.props.settings.blindfield.types.includes(type.value) } 
						onToggle={flag=>{this.handleToggleBlindfield(type.value, false, flag)}}
					/>
				</span>
				<span>
					<input type={type.value} defaultValue={type.placeholder} disabled/>
				</span>
				<span>
					 : {type.value}
				</span>
			</li>
		))
	}
	renderUserInfo(){
		if(!this.props.isSettingsReady)return;
		return (
			<div className="fields-row">
				<div className="fields-column">
					<label htmlFor = "email">
						<T>forms.email</T>
					</label>
					<input 	id = "email" 
							type = "email" 
							ref = "email"
							name = "email"
							placeholder = "email"
							value = {Meteor.user().emails.pop().address}
							disabled = {true}
					/>
				</div>
			</div>
		)
	}
	
	render() {
		return (
			<div className="page__content">
				<form className="login-user">
					{
						this.renderUserInfo()
					}
					<div className="fields-row">
						<div className="fields-column">
							<label>
								<T>userprofile.blacklist</T>
							</label>
							<ul>
							{ this.renderBlacklist() }
							</ul>
						</div>	
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label>
								<T>userprofile.blindfield.type</T>
							</label>
							<ul>
							{ this.renderBlindfieldType() }
							</ul>	
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label>
								<T>userprofile.blindfield.class</T>
							</label>
							<ul>
								{ this.renderBlindfieldClass() }
								<li>
									<input type="text" onBlur={this.handleBlindfieldClassBlur.bind(this)}/>
								</li>
							</ul>	
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label>
								<T>userprofile.archive</T>
							</label>
							<button	onClick = {this.handleDeleteArchive.bind(this)}>
								<T>userprofile.deleteArchive</T>
							</button>
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label>
								<T>userprofile.account</T>
							</label>
							<button	onClick = {this.handleDeleteAccount.bind(this)}>
								<T>userprofile.deleteAccount</T>
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		isSettingsReady : Meteor.userId() && FlowRouter.subsReady("settings.private"),
		settings : Settings.findOne({owner : Meteor.userId()})
	};
})(UserProfile);
