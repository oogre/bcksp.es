/*----------------------------------------*\
  web.bitRepublic - LiveStream.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 15:17:52
  @Last Modified time: 2018-05-21 01:53:48
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
	}
	componentDidMount(){
		if(this.props.public){
			streamer.on('liveBackspaces', message => {
				this.setState({
					liveBackspaces : message + " " + this.state.liveBackspaces
				});
			});
		}
	}
	componentWillUnmount(){
		if(this.props.public){
			streamer.stop("liveBackspaces");
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
	let isReady = false;
	let archive;
	let public = self.type != "private";

	if(public){
		isReady = FlowRouter.subsReady("archive.public");
		if(!isReady)return{ 
			isReady ,
			public
		};
		archive = Archives.findOne({
			type : config.archives.public.type
		},{
			fields : {
				longBuffer : 1
			},
			reactive : false
		});
		archive = archive.longBuffer;
	}else{
		isReady = FlowRouter.subsReady("archive.private");
		if(!isReady)return{ 
			isReady,
			public
		};
	
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
	}
	return {
		public,
		isReady,
		archive
	};
})(LiveStream);
