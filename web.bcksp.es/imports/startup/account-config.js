/*----------------------------------------*\
  bitRepublic - account-config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 01:13:47
  @Last Modified time: 2019-01-03 16:30:39
\*----------------------------------------*/
import React from 'react';
import { render } from 'react-dom';

import { Accounts } from 'meteor/accounts-base';
import UserPasswordSetup from './../ui/user/passwordSetup.js'

import T from './../i18n/index.js';

if(Meteor.isServer){
	Accounts.emailTemplates.siteName = 'bcksp.es';
	Accounts.emailTemplates.from = 'bcksp.es <info@bcksp.es>';
	Accounts.emailTemplates.resetPassword = {
		subject(user) {
			return i18n.createTranslator("mail")("resetPassword.subject");
		},
		text(user, url) {
			return i18n.createTranslator("mail")("resetPassword.message").replace("[URL]", url);
		}
	};
}else{
	Accounts.onResetPasswordLink((token, done) => {
		Meteor.setTimeout(() => {
			const onComplete = () => {
				done();
				FlowRouter.go('home');
				Meteor.logout();
				FlowRouter.reload();
			};
			render(<UserPasswordSetup token={token} onComplete={onComplete}/>, document.getElementById('render-target'));
		}, 100);
	});
}
