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
			<div>
				<ul>
					<li>
						<button onClick={this.handleSwitchStream.bind(this, "public")}>
							<T>archive.public.button</T>
						</button>
					</li>
					{ 
						this.props.isConnected && 
							<li>
								<button onClick={this.handleSwitchStream.bind(this, "private")}>
									<T>archive.private.button</T>
								</button>
							</li>
					}
				</ul>

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
