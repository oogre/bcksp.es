/*----------------------------------------*\
  bcksp.es - publishToPublicFeed.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 19:51:28
  @Last Modified time: 2019-12-19 21:00:48
\*----------------------------------------*/
import React, { Component } from 'react';
import { SettingsTogglePublishToPublicFeed } from '../../api/settings/methods.js';
import T from './../../i18n/index.js';
import { Settings } from './../../api/settings/settings.js';
import { config } from '../../startup/config.js'
import MyToggleButton from "./../shared/MyToggleButton.js";

export default class PublishToPublicFeed extends Component {
	constructor(props){
		super(props);
	}
	handleTogglePublishToPublicFeed(){
		SettingsTogglePublishToPublicFeed.call((err, res) =>{
			console.log(err, res);
		});
		return false;
	}
	render(){
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
}