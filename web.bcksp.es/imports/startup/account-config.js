/*----------------------------------------*\
  bitRepublic - account-config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 01:13:47
  @Last Modified time: 2020-01-28 23:29:20
\*----------------------------------------*/
import React from 'react';
import { render } from 'react-dom';
import { config } from './config.js';
import { Accounts } from 'meteor/accounts-base';
import { getMail } from './../ui/template/mail.js';
import UserPasswordSetup from './../ui/user/passwordSetup.js'
import { getMessageFromError } from './../utilities/ui.js';



if(Meteor.isServer){
	Accounts.emailTemplates.siteName = 'bcksp.es';
	Accounts.emailTemplates.from = process.env.MAIL_ADDRESS;
	Accounts.emailTemplates.resetPassword = {
		subject(user) {
			
			return i18n.createTranslator("email.resetPassword")("subject");
		},
		html(user, url) {
			return getMail("resetPassword", {"url" : url});
		}
	};
	Accounts.emailTemplates.verifyEmail = {
		subject(user) {
			return i18n.createTranslator("email.verifyEmail")("subject");
		},
		html(user, url) {
			return getMail("verifyEmail", {"url" : url});
		}
	};
}else{
	delete Accounts._accountsCallbacks['verify-email'];
	Accounts.onEmailVerificationLink((token, done) => {
		Accounts.verifyEmail(token, function (error) {
			if (error) {
				console.log(getMessageFromError(error));
			}else{
				done();	
			}
		});
	});
	delete Accounts._accountsCallbacks["reset-password"];
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
