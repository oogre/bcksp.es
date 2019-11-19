/*----------------------------------------*\
  web.bitRepublic - profile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-21 00:58:47
  @Last Modified time: 2019-11-19 17:51:40
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { needConfirmation } from './../../utilities/ui.js';
import { ResetPassword, UpdateEmail } from '../../api/users/methods.js';
import {
	SettingsBlacklistRemove,
	SettingsBlindFieldAdd,
	SettingsBlindFieldRemove,
	SettingsTogglePublishToPublicFeed
} from '../../api/settings/methods.js';
import { getEmailOfCurrentUser } from '../../utilities/meteor.js';
import { checkValidEmail } from '../../utilities/validation.js';
import T from './../../i18n/index.js';
import { Settings } from './../../api/settings/settings.js';
import { config } from '../../startup/config.js'
import MyToggleButton from "./../shared/MyToggleButton.js";

class UserProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			email : "",
			submitNewEmailVisible : false
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
	handleTogglePublishToPublicFeed(){
		SettingsTogglePublishToPublicFeed.call((err, res) =>{
			console.log(err, res);
		});
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
	renderRublishToPublicFeed(){
		if(!this.props.isSettingsReady)return;
		return (
			<div>
					<h2><T>userprofile.publishToPublicFeed.title</T></h2>
					<ul className="toggle-list">
						<li>
							<span className="input-wrapper--inline">
								<MyToggleButton
									value={ !this.props.settings.publishToPublicFeed }
									onToggle={flag=>{this.handleTogglePublishToPublicFeed()}}
									activeLabel={i18n.__("userprofile.yes")}
									inactiveLabel={i18n.__("userprofile.no")}
								/>
							</span>
							<span className="input-wrapper--inline">
								 :
							</span>
						</li>
						<li>
							<span className="input-wrapper--inline">
								<T maxCounter={config.archives.public.longBuffer.maxMaxLen}>userprofile.publishToPublicFeed.desc</T>
							</span>
						</li>
					</ul>
			</div>
		);
	}
	renderBlacklist(){
		if(!this.props.isSettingsReady)return;
		return (
			<div>
				<h2>{
					_.isEmpty(this.props.settings.blacklist) ?
						<T>userprofile.noBlacklist.title</T>
					:
						<T>userprofile.blacklist.title</T>
				}</h2>
				<ul className="toggle-list">
					<li>
						<span className="input-wrapper--inline">
							<T>userprofile.noBlacklist.desc</T>
						</span>
					</li>
					{
						!_.isEmpty(this.props.settings.blacklist) &&
						this.props.settings.blacklist.map((url, k) => (
							<li key={k}>
								<span className="input-wrapper--inline">
									{url}
								</span>
								<span className="input-wrapper--inline">
									<MyToggleButton
										value={ true }
										onToggle={flag=>{this.handleToggleBlacklist(url, flag)}}
										activeLabel={i18n.__("userprofile.whitelisted")}
										inactiveLabel={i18n.__("userprofile.blacklisted")}
									/>
								</span>
							</li>
						))
					}
				</ul>
			</div>
		);
	}
	renderBlindfieldClass(){
		if(!this.props.isSettingsReady)return;
		return (
			<div>
				<h2><T>userprofile.blindfield.class.title</T></h2>
				<ul className="toggle-list">
					<li>
						<span className="input-wrapper--inline">
							<T>userprofile.blindfield.class.desc</T>
						</span>
					</li>
					{
						this.props.settings.blindfield.class.map((c, k) => (
							<li key={k}>
								<span className="input-wrapper--inline">
									 <span>{c} :</span>
								</span>
								<span className="input-wrapper--inline">
									<MyToggleButton
										value={ true }
										onToggle={flag=>{this.handleToggleBlindfield(c, true, flag)}}
										activeLabel={i18n.__("userprofile.whitelisted")}
										inactiveLabel={i18n.__("userprofile.blacklisted")}
									/>
								</span>
							</li>
						))
					}
					<li>
						<div className="field field--profile">
							<input className="input--text" type="text" onBlur={this.handleBlindfieldClassBlur.bind(this)}/>
						</div>
					</li>
				</ul>
			</div>
		);
	}
	renderBlindfieldType(){
		if(!this.props.isSettingsReady)return;
		return (
			<div>
				<h2><T>userprofile.blindfield.type.title</T></h2>
				<ul className="toggle-list">
					<li>
						<span className="input-wrapper--inline">
							<T>userprofile.blindfield.type.desc</T>
						</span>
					</li>
					{
						config.settings.blindfield.available.types.map((type, k) => (
							<li className="field" key={k}>
								<label className="field__label" htmlFor="">
									{type.value}
								</label>
								<span className="input-wrapper--inline">
									<input className="input--text" type={type.value} defaultValue={type.placeholder} disabled/>
								</span>
								<span className="input-wrapper--inline">
									<MyToggleButton
										value={ this.props.settings.blindfield.types.includes(type.value) }
										onToggle={ flag => this.handleToggleBlindfield(type.value, false, flag) }
										activeLabel={ i18n.__("userprofile.whitelisted") }
										inactiveLabel={ i18n.__("userprofile.blacklisted") }
									/>
								</span>
							</li>
						))
					}
				</ul>
			</div>
		);
	}
	updateEmail(event){
		event.preventDefault();
		if(!this.state.submitNewEmailVisible)return false;
		let newValue = $("input#email").val();
		UpdateEmail.call({email : newValue}, (err, res) =>{
			if (err) {
				if(_.isArray(err.details)){
					err.details.forEach((fieldError) => {
						console.log(fieldError.details.value);
					});
				}else{
					console.log(err);
				}
			}else{
			console.log(res);
			}
		});
		return false;
	}
	changeEmail(event){
		event.preventDefault();
		let newValue = event.target.value;
		let defaultValue = this.state.email;
		if(newValue != defaultValue){
			try{
				checkValidEmail(newValue, false);
				this.setState({
					submitNewEmailVisible : true
				})
			}catch(error){
				this.setState({
					submitNewEmailVisible : false
				})
			}
		}else{
			this.setState({
				submitNewEmailVisible : false
			})
		}
		return false;
	}

	renderUserInfo(){
		if(!this.props.isSettingsReady)return;
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
								placeholder="email"
								className="input--text"
								defaultValue={this.state.email}
								onChange={this.changeEmail.bind(this)}
						/>
					</span>
					{
						this.state.submitNewEmailVisible &&
							<span className="input-wrapper--inline">
								<input className="button button--primary" type="submit" value={i18n.__("userprofile.userInfo.submit")}/>
							</span>
					}
				</div>
			</form>
		)
	}
	renderResetPassword(){
		return (
			<form  onSubmit={this.handleResetPassword.bind(this)}>
				<div className="field">
					<label className="field__label">
						<T>userprofile.userInfo.resetpassword</T>
					</label>
					<input className="button button--primary" type="submit" value={i18n.__("userprofile.userInfo.submit")}/>
				</div>
			</form>
		)
	}
	render() {
		if(!this.state.email){
			getEmailOfCurrentUser()
			.then(email=>{
				this.setState({email : email});
			})
			.catch(error=>{})
		}
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title"><T>userprofile.title</T></h1>
					</div>
					<h2 className="page__subtitle">vie privée</h2>
					{ this.renderRublishToPublicFeed() }
					<hr className="field-separator" />
					{ this.renderBlacklist() }
					<hr className="field-separator" />
					{ this.renderBlindfieldType() }
					<hr className="field-separator" />
					{ this.renderBlindfieldClass() }
					<hr className="field-separator" />
					<h2 className="page__subtitle">Votre identification</h2>
					{ this.renderUserInfo() }
					<hr className="field-separator" />
					{ this.renderResetPassword() }
					<hr className="field-separator" />
					<h2 className="page__subtitle">Espace dangereux</h2>
					<form  onSubmit={this.handleDeleteArchive.bind(this)}>
						<div className="field">
							<label className="field__label">
								<T>userprofile.archive</T>
							</label>
							<input className="button button--secondary" type="submit" value={i18n.__("userprofile.deleteArchive")}/>
						</div>
					</form>

					<hr className="field-separator" />

					<form  onSubmit={this.handleDeleteAccount.bind(this)}>
						<div className="field">
							<label className="field__label">
								<T>userprofile.account</T>
							</label>
							<input className="button button--secondary" type="submit" value={i18n.__("userprofile.deleteAccount")}/>
						</div>
					</form>
				</div>
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
