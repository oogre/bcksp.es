/*----------------------------------------*\
	web.bitRepublic - LiveStream.js
	@author Evrard Vincent (vincent@ogre.be)
	@Date:   2018-05-20 15:17:52
	@Last Modified time: 2019-03-05 10:56:43
\*----------------------------------------*/

import T from './../../i18n/index.js';
import LiveFrame from './LiveFrame.js';
import React, { Component } from 'react';
import Dropdown from './../shared/dropdown.js';
import { config } from './../../startup/config.js';
import { streamer } from './../../api/streamer.js';
import { withTracker } from 'meteor/react-meteor-data';
import { PublicArchive } from './../../api/archives/archives.js';
import { PrivateArchive } from './../../api/archives/archives.js';



// LiveStream component
class LiveStream extends Component {
	constructor(props){
		super(props);
		this.state = {
			streamFrom : "public",
			public : true,
			publicBackspaces : "",
			livestreamTypeLabel: i18n.__("archive.public.button")
		};
		this.loaded = false;
	}

	handleSwitchStream(event){
		let streamName = this.state.public ? "private" : "public"
		event.preventDefault();
		if(streamName == "public" && this.state.streamFrom != streamName){
			this.setState({
				streamFrom : streamName,
				public : true,
				livestreamTypeLabel: i18n.__("archive.public.button")
			});
		} else if(streamName == "private" && this.props.isConnected && this.state.streamFrom != streamName){
			this.setState({
				streamFrom : streamName,
				public : false,
				livestreamTypeLabel: i18n.__("archive.private.button")
			});
		}
		return false;
	}
	componentWillUnmount(){
		streamer.stop("publicBackspaces");
	}
	componentDidMount(){
		streamer.on('publicBackspaces', message =>{
			this.setState({
				publicBackspaces : message.content + this.state.publicBackspaces
			});
		});
	}

	getPublicArchive(){
		if(!this.props.isPublicReady || !this.props.publicArchive)return "";
		return (this.state.publicBackspaces+this.props.publicArchive.content).substr(0, config.archives.public.longBuffer.maxMaxLen);
	}

	getPrivateArchive(){
		if(!this.props.isPrivateReady || !this.props.privateArchive)return "";
		let content = "";
		for(let data of this.props.privateArchive){
			content += data.content;
			if(data.invalidateOlder){
				break;
			}
		}
		return content;
	}

	componentDidUpdate(){
		if(!this.loaded && this.props.isPublicReady){
			if(_.isFunction(this.props.onLoad)){
				this.props.onLoad(this.getPublicArchive().substr(0, 40));
			}
			this.loaded = true;
		}
	}

	render() {
		let fullScreen = FlowRouter.getRouteName() == "livefeed";

		return (
		  <div className={ `livestream-container ${(this.props.type ? " livestream-container--" + this.props.type : "")} ${(fullScreen ? " fullscreen" : "")}` }>
				<div className={ `livestream ${(this.props.type ? "livestream--" + this.props.type : "") }` }>
					<div className="livestream__content">
						<Dropdown active={this.props.isConnected} className="dropdown--livestream" label={this.state.livestreamTypeLabel}>
							<ul className="dropdown__list">
								<li className="dropdown__list-item">
									<button className="dropdown__list-button" onClick={this.handleSwitchStream.bind(this)}>
										<span className="dropdown__list-button-label">
											{
												this.state.public ?
													<T>archive.private.button</T>
												:
													<T>archive.public.button</T>
											}
										</span>
									</button>
								</li>
							</ul>
						</Dropdown>

						<LiveFrame	public={ this.state.public }
								content={ this.state.public ? this.getPublicArchive() : this.getPrivateArchive() }
								onSelect={_.isFunction(this.props.onSelect) && this.props.onSelect.bind(this)}
								onShare={_.isFunction(this.props.onShare) && this.props.onShare.bind(this)}
								fullscreenAvailable={this.props.fullscreenAvailable}
								shareAvailable={this.props.shareAvailable}
						/>
					</div>

					<div className="livestream__border-decoration-container" aria-hidden="true">
						<div className="livestream__border-decoration"></div>
						<div className="livestream__border-decoration"></div>
						<div className="livestream__border-decoration"></div>
						<div className="livestream__border-decoration"></div>
					</div>
				</div>
		  </div>
		);
	}
}

export default withTracker(self => {
	let publicHandle = Meteor.subscribe('archive.public');
	let privateHandle = Meteor.userId() && Meteor.subscribe('archive.private');
	return {
		isConnected : !!Meteor.userId(),

		isPublicReady  : publicHandle && publicHandle.ready(),
		publicArchive  : PublicArchive.findOne({}),

		isPrivateReady : privateHandle && privateHandle.ready(),
		privateArchive : PrivateArchive.find({}, {sort : {_id : -1}}).fetch()
	};
})(LiveStream);
