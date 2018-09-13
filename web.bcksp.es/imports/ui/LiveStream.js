/*----------------------------------------*\
  web.bitRepublic - LiveStream.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 15:17:52
  @Last Modified time: 2018-09-13 17:54:28
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../api/archives/archives.js';
import { streamer } from '../api/streamer.js';
import { config } from './../startup/config.js';
import ButtonShare from './button/share.js';



// LiveStream component
class LiveStream extends Component {
	constructor(props){
		super(props);
		this.state = {
			liveBackspaces : "",
			selectContent:"",
			shareContent:"",
			position : [0, 0]
		};
	}
	onSelected(event){
		let content = event.target.ownerDocument.getSelection().toString();
		let boundingBox = event.target.ownerDocument.getSelection().getRangeAt(0).getBoundingClientRect()
		if(!_.isEmpty(content)){
			this.setState({
				selectContent : content,
				shareContent : this.state.selectContent,
				position : [boundingBox.right, boundingBox.top]
			});
		}else{
			this.setState({
				selectContent : "",
				shareContent : this.state.selectContent,
				position : [0, 0]
			});
		}
	}
	onBlur(){
		this.setState({
			selectContent : "",
			shareContent : this.state.selectContent,
			position : [0, 0]
		});
	}
	componentDidMount(){
		if(this.props.public){
			streamer.on('liveBackspaces', message => {
				this.setState({
					liveBackspaces : message + " " + this.state.liveBackspaces
				});
			});
		}
		$(".stream2").attr("contenteditable", true);
	}
	componentWillUnmount(){
		if(this.props.public){
			streamer.stop("liveBackspaces");
		}
	}
	render() {
		return (
			<div>
				
				<div 	className="stream2" 
						onBlur={this.onBlur.bind(this)} 
						onSelect={this.onSelected.bind(this)} 
				>
					<ButtonShare left={this.state.position[0]} top={this.state.position[1]} content={this.state.shareContent}/>
					{this.state.liveBackspaces + " " + this.props.archive} 	
				</div>
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
