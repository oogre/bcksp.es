/*----------------------------------------*\
  bcksp.es - profile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-21 00:58:47
  @Last Modified time: 2020-03-07 10:39:30
\*----------------------------------------*/
import React from 'react';
import Blacklist from "./blacklist.js";
import FixeWait from "./../fixe/wait.js";
import DeleteArchive from "./deleteArchive.js";
import DeleteAccount from "./deleteAccount.js";
import BlindfieldType from "./blindfieldType.js";
import Identification from "./identification.js";
import ResetPasswordUI from "./resetPassword.js";
import BlindfieldClass from "./blindfieldClass.js";
import { getTranslations } from "./../../i18n/index.js";
import { withTracker } from 'meteor/react-meteor-data';
import PublishToPublicFeed from "./publishToPublicFeed.js";
import { Settings } from './../../api/settings/settings.js';

const UserProfile = ({isSettingsReady, settings})=>{
	const {C} = getTranslations("userprofile");
	const displaySetting = ()=>(
		<div>
			<PublishToPublicFeed settings={settings}/>
			<hr className="field-separator" />
			<Blacklist settings={settings}/>
			<hr className="field-separator" />
			<BlindfieldType settings={settings}/>
			<hr className="field-separator" />
			<BlindfieldClass settings={settings}/>
			<hr className="field-separator" />
		</div>
	);

	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<C>title</C>
					</h1>
				</div>
				<a id="settings" href="#settings" className="text-block__link--title">
					<h2 className="page__subtitle">
						<C>settings.title</C>
					</h2>
				</a>
				{ isSettingsReady ? displaySetting() : <FixeWait/> }
				<a id="identification" href="#identification" className="text-block__link--title">
					<h2 className="page__subtitle">
						<C>identification.title</C>
					</h2>
				</a>
				<Identification/>
				<hr className="field-separator" />
				<ResetPasswordUI/>
				<hr className="field-separator" />
				<a id="danger" href="#danger" className="text-block__link--title">
					<h2 className="page__subtitle">
						<C>danger.title</C>
					</h2>
				</a>
				<DeleteArchive/>
				<hr className="field-separator" />
				<DeleteAccount/>
			</div>
		</div>
	);
}

export default withTracker(self => {
	return {
		isSettingsReady : FlowRouter.subsReady("settings.private"),
		settings : Settings.findOne({owner : Meteor.userId()})
	};
})(UserProfile);
