/*----------------------------------------*\
  web.bitRepublic - LiveStream.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 15:17:52
  @Last Modified time: 2018-05-20 23:15:08
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../api/archives/archives.js';
import { streamer } from '../api/streamer.js';
import { config } from './../startup/config.js';

// LiveStream component
class LiveStream extends Component {
	constructor(props){
		super(props);
		this.state = {
			liveBackspaces : ""
		};
		if(this.props.type == "public"){
			let self = this;
			streamer.on('liveBackspaces', function(message) {
				self.setState({
					liveBackspaces : message + " " + self.state.liveBackspaces
				});
			});
		}
	}

	render() {
		return (
			<div className="stream">
				{this.state.liveBackspaces + " " + this.props.archive}
			</div>
		);
	}
}

export default withTracker(self => {
	let isReady = FlowRouter.subsReady("archive.public");
	if(!isReady)return{ isReady };
	let archive;
	if(self.type == "private"){
		archive = Archives.findOne({
			type : config.archives.private.type,
			owner : Meteor.userId()
		},{
			fields : {
				backspaces : 1
			},
			reactive : true
		});
		archive = archive.backspaces.join(" ");
	}else{
		archive = Archives.findOne({
			type : config.archives.public.type
		},{
			fields : {
				longBuffer : 1
			},
			reactive : false
		});
		archive = archive.longBuffer;
	}
	return {
		isReady,
		archive
	};
})(LiveStream);
