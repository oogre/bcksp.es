/*----------------------------------------*\
  web.bitRepublic - profile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-21 00:58:47
  @Last Modified time: 2019-12-19 21:01:46
\*----------------------------------------*/
import T from './../../i18n/index.js';
import Blacklist from "./blacklist.js";
import React, { Component } from 'react';
import DeleteArchive from "./deleteArchive.js";
import DeleteAccount from "./deleteAccount.js";
import BlindfieldType from "./blindfieldType.js";
import Identification from "./identification.js";
import ResetPasswordUI from "./resetPassword.js";
import BlindfieldClass from "./blindfieldClass.js";
import { withTracker } from 'meteor/react-meteor-data';
import PublishToPublicFeed from "./publishToPublicFeed.js";
import { Settings } from './../../api/settings/settings.js';

class UserProfile extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title"><T>userprofile.title</T></h1>
					</div>
					<h2 className="page__subtitle">Votre identification</h2>
					{
						this.props.isSettingsReady &&
							<div>
								<Identification/>
								<hr className="field-separator" />
								<ResetPasswordUI/>
								<hr className="field-separator" />
							</div>
					}
					<h2 className="page__subtitle">vie privée</h2>
					{
						this.props.isSettingsReady &&
							<div>
								<PublishToPublicFeed settings={this.props.settings}/>
								<hr className="field-separator" />
								<Blacklist settings={this.props.settings}/>
								<hr className="field-separator" />
								<BlindfieldType settings={this.props.settings}/>
								<hr className="field-separator" />
								<BlindfieldClass settings={this.props.settings}/>
								<hr className="field-separator" />
							</div>
					}	
					<h2 className="page__subtitle">Espace dangereux</h2>
					{
						this.props.isSettingsReady &&
							<div>
								<DeleteArchive/>
								<hr className="field-separator" />
								<DeleteAccount/>
							</div>
					}
				</div>
			</div>
		);
	}
}
export default withTracker(self => {
	return {
		isSettingsReady : Meteor.userId() && FlowRouter.subsReady("settings.private"),
		settings : Settings.findOne({owner : Meteor.userId()})
	};
})(UserProfile);
