/*----------------------------------------*\
  web.bitRepublic - LiveStream.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 15:17:52
  @Last Modified time: 2019-01-29 19:42:47
\*----------------------------------------*/

import T from './../../i18n/index.js';
import LiveFrame from './LiveFrame.js';
import React, { Component } from 'react';
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
		};
	}

	handleSwitchStream(streamName, event){
		event.preventDefault();
		if(streamName == "public" && this.state.streamFrom != streamName){
			this.setState({
				streamFrom : streamName,
				public : true,
			});
		} else if(streamName == "private" && this.props.isConnected && this.state.streamFrom != streamName){
			this.setState({
				streamFrom : streamName,
				public : false
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
				publicBackspaces : 	message.content + this.state.publicBackspaces
			});
		});
	}

	getPublicArchive(){
		if(!this.props.isPublicReady || !this.props.publicArchive)return "";
		return this.state.publicBackspaces+this.props.publicArchive.content;
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

	onButtonClick(data){
		if(_.isFunction(this.props.action)){
			this.props.action(data);
		}else{
			console.log(data);
		}
	}

	render() {
		return (
			<div className="livestream">
				<div className="livestream__content">
					<nav role="navigation" className="dropdown-switcher">
						<ul className="dropdown-switcher__list">
							<li>
								<button className="dropdown-switcher__button" onClick={this.handleSwitchStream.bind(this, "public")}>
									<T>archive.public.button</T>
									<svg className="dropdown-switcher__button-icon" width="18" height="7" viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><title>Slice 1</title><path d="M9 6.962c-.271.076-.593.038-.813-.116L.22 1.269c-.293-.205-.293-.538 0-.743L.751.154a.993.993 0 0 1 1.062 0L9 5.184l7.187-5.03a.993.993 0 0 1 1.062 0l.531.372c.293.205.293.538 0 .743L9.813 6.846c-.22.154-.542.192-.813.116z" fill="#231F20" fillRule="nonzero"/></svg>
								</button>
							</li>
							{
								this.props.isConnected &&
									<li>
										<button className="dropdown-switcher__button" onClick={this.handleSwitchStream.bind(this, "private")}>
											<T>archive.private.button</T>
											<svg className="dropdown-switcher__button-icon" width="18" height="7" viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><title>Slice 1</title><path d="M9 6.962c-.271.076-.593.038-.813-.116L.22 1.269c-.293-.205-.293-.538 0-.743L.751.154a.993.993 0 0 1 1.062 0L9 5.184l7.187-5.03a.993.993 0 0 1 1.062 0l.531.372c.293.205.293.538 0 .743L9.813 6.846c-.22.154-.542.192-.813.116z" fill="#231F20" fillRule="nonzero"/></svg>
										</button>
									</li>
							}
						</ul>
					</nav>

					<LiveFrame	public={ this.state.public }
								content={
									this.state.public ?
										this.getPublicArchive()
									:
										this.getPrivateArchive()
								}
								action={this.onButtonClick.bind(this)}
					/>
				</div>

				<div className="livestream__border-decoration-container" aria-hidden="true">
					<div className="livestream__border-decoration"></div>
					<div className="livestream__border-decoration"></div>
					<div className="livestream__border-decoration"></div>
					<div className="livestream__border-decoration"></div>
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
