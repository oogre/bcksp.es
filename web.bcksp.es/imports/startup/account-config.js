/*----------------------------------------*\
  bitRepublic - account-config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 01:13:47
  @Last Modified time: 2019-04-07 21:26:05
\*----------------------------------------*/
import React from 'react';
import T from './../i18n/index.js';
import { render } from 'react-dom';
import { config } from './config.js';
import { Accounts } from 'meteor/accounts-base';
import { getMail } from './../ui/template/mail.js';
import UserPasswordSetup from './../ui/user/passwordSetup.js'



if(Meteor.isServer){
	Accounts.emailTemplates.siteName = 'bcksp.es';
	Accounts.emailTemplates.from = process.env.MAIL_ADDRESS;
	Accounts.emailTemplates.resetPassword = {
		subject(user) {
			return i18n.__("email.resetPassword.subject");
		},
		html(user, url) {
			return getMail("resetPassword", {"url" : url});
		}
	};
	Accounts.emailTemplates.verifyEmail = {
		subject(user) {
			return i18n.__("email.verifyEmail.subject");
		},
		html(user, url) {
			return getMail("verifyEmail", {"url" : url});
		}
	};
}else{
	Accounts.onEmailVerificationLink((token, done) => {
		if(!Meteor.user()){
			alert("need to be connected")
		}else{
			done();	
		}
	});
	Accounts.onResetPasswordLink((token, done) => {
		Meteor.setTimeout(() => {
			const onComplete = () => {
				done();
				FlowRouter.go('home');
				Meteor.logout();
				FlowRouter.reload();
			};
			render(
				<UserPasswordSetup token={token} onComplete={onComplete}/>, 
				document.getElementById('render-target')
			);
		}, 100);
	});
}
