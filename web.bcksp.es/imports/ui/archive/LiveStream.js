/*----------------------------------------*\
  web.bitRepublic - LiveStream.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 15:17:52
  @Last Modified time: 2018-12-19 19:55:26
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { PublicArchive } from './../../api/archives/archives.js';
import { PrivateArchive } from './../../api/archives/archives.js';
import { streamer } from './../../api/streamer.js';
import LiveFrame from './LiveFrame.js';
import T from './../../i18n/index.js';

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

	handleSwitchStream(streamName){
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
	
	render() {
		return (
			<div>
				<ul>
					<li>
						<button onClick={this.handleSwitchStream.bind(this, "public")}>
							public live stream
						</button>
					</li>
					{ 
						this.props.isConnected && 
							<li>
								<button onClick={this.handleSwitchStream.bind(this, "private")}>
									your live stream
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
				/>
			</div>
		);
	}
}

export default withTracker(self => {
	let handle = Meteor.userId() && Meteor.subscribe('archive.private');
	return {
		isConnected : !!Meteor.userId(),

		isPublicReady  : FlowRouter.subsReady("archive.public"),
		publicArchive  : PublicArchive.findOne({}),

		isPrivateReady : handle && handle.ready() && Meteor.userId(),
		privateArchive : PrivateArchive.find({}, {sort : {_id : -1}}).fetch()
	};
})(LiveStream);
