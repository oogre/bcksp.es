/*----------------------------------------*\
  web.bitRepublic - profile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-21 00:58:47
  @Last Modified time: 2018-11-25 23:12:29
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import  LiveStream from './../LiveStream.js';
import * as Utilities from '../../utilities.js';
import { ResetPassword, UpdateEmail } from '../../api/users/methods.js';
import { SettingsBlacklistRemove, SettingsBlindFieldAdd, SettingsBlindFieldRemove } from '../../api/settings/methods.js';
import T from './../../i18n/index.js';
import { Settings } from './../../api/settings/settings.js';
import { config } from '../../startup/config.js'
import ToggleButton from 'react-toggle-button'

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
		Utilities.needConfirmation("userprofile").then(data=>{
			
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
	handleToggleBlacklist(url, flag){
		if(flag){
			SettingsBlacklistRemove.call({url});
		}
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
		Utilities.needConfirmation("userprofile").then(data=>{
			
		}).catch(e=>{
			console.log("Delete Account Confirmation",e.message);
		});
		return false;
	}
	renderBlacklist(){
		
		return this.props.settings.blacklist.map((url, k) => (
			<li key={k}>
				<span style={{display: "inline-block"}}>
					<ToggleButton
					  colors={{
					  	inactive: {
					      base: 'rgb(128, 128, 128)',
					      hover: 'rgb(150,150,150)',
					    },
					    active: {
					      base: 'rgb(0, 0, 0)',
					      hover: 'rgb(50,50,50)',
					    }
					  }}
					  activeLabel="black"
  					  inactiveLabel="white"
					  value={ true }
					  thumbStyle={{ borderRadius: 2 }}
					  trackStyle={{ borderRadius: 2 }}
					  onToggle={this.handleToggleBlacklist.bind(this, url)} />
				</span>
				<span>
					 : {url}
				</span>
			</li>
		))
	}
	renderBlindfieldClass(){
		return this.props.settings.blindfield.class.map((c, k) => (
			<li key={k}>
				<span style={{display: "inline-block"}}>
					<ToggleButton
					  colors={{
					  	inactive: {
					      base: 'rgb(128, 128, 128)',
					      hover: 'rgb(150,150,150)',
					    },
					    active: {
					      base: 'rgb(0, 0, 0)',
					      hover: 'rgb(50,50,50)',
					    }
					  }}
					  activeLabel="black"
  					  inactiveLabel="white"
					  value={ true }
					  thumbStyle={{ borderRadius: 2 }}
					  trackStyle={{ borderRadius: 2 }}
					  onToggle={this.handleToggleBlindfield.bind(this, c, true)} />
				</span>
				<span>
					 : {c}
				</span>
			</li>
		))
	}
	renderBlindfieldType(){
		return config.settings.blindfield.types.map((type, k) => (
			<li key={k}>
				<span style={{display: "inline-block"}}>
					<ToggleButton
					  colors={{
					  	inactive: {
					      base: 'rgb(128, 128, 128)',
					      hover: 'rgb(150,150,150)',
					    },
					    active: {
					      base: 'rgb(0, 0, 0)',
					      hover: 'rgb(50,50,50)',
					    }
					  }}
					  activeLabel="black"
  					  inactiveLabel="white"
					  value={ this.props.settings.blindfield.types.includes(type.value) }
					  thumbStyle={{ borderRadius: 2 }}
					  trackStyle={{ borderRadius: 2 }}
					  onToggle={this.handleToggleBlindfield.bind(this, type.value, false)} />
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
	
	render() {
		return (
			<div className="page__content">
				{/*<LiveStream type="private"/>*/}
				<form className="login-user">
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
									value = {this.state.email}
									disabled = "true"
							/>
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label>
								<T>userprofile.blacklist</T>
							</label>
							<ul>
							{
								this.props.isReady && this.renderBlacklist()
							}
							</ul>
						</div>	
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label>
								<T>userprofile.blindfield.type</T>
							</label>
							<ul>
							{
								this.props.isReady && this.renderBlindfieldType()
							}
							</ul>	
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label>
								<T>userprofile.blindfield.class</T>
							</label>
							<ul>
								{
									this.props.isReady && this.renderBlindfieldClass()
								}
								<li>
									<input type="text" onBlur={this.handleBlindfieldClassBlur.bind(this)}/>
								</li>
							</ul>	
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label htmlFor = "email">
								<T>userprofile.changePassword</T>
							</label>
							<button	onClick = {this.handleResetPassword.bind(this)}>
								<T>userprofile.resetPassword</T>
							</button>
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label htmlFor = "email">
								<T>userprofile.archive</T>
							</label>
							<button	onClick = {this.handleDeleteArchive.bind(this)}>
								<T>userprofile.deleteArchive</T>
							</button>
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<label htmlFor = "email">
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
	let isReady = FlowRouter.subsReady("settings.private");
	let currentUser = Meteor.user();
	let userMail = currentUser ? currentUser.emails[0].address : null;
	let userId = currentUser ? currentUser._id : null;
	let settings = Settings.findOne({owner : Meteor.userId()});
	return {
		isReady,
		userId,
		currentUser,
		userMail,
		settings
	};
})(UserProfile);
