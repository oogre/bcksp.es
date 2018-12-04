/*----------------------------------------*\
  web.bitRepublic - LiveStream.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 15:17:52
  @Last Modified time: 2018-11-27 15:09:53
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import { PublicArchive } from './../../api/archives/archives.js';
import { PrivateArchive } from './../../api/archives/archives.js';
import { streamer } from './../../api/streamer.js';
import { config } from './../../startup/config.js';
import ButtonShare from './../button/share.js';
import T from './../../i18n/index.js';


// LiveStream component
class LiveStream extends Component {
	constructor(props){
		super(props);
		this.state = {
			streamFrom : "public",
			public : true,
			publicBackspaces : "",
			selectContent:"",
			shareContent:"",
			position : [-1000, -1000],
			fullscreen : false
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
	onSelected(event){
		let content = event.target.ownerDocument.getSelection().toString();
		let boundingBox = event.target.ownerDocument.getSelection().getRangeAt(0).getBoundingClientRect()
		if(!_.isEmpty(content)){
			this.setState({
				selectContent : content,
				shareContent : this.state.selectContent,
				position : [
					(boundingBox.left + boundingBox.right)/2 , 
					boundingBox.top + document.scrollingElement.scrollTop
				]
			});
		}else{
			this.setState({
				selectContent : "",
				shareContent : this.state.selectContent,
				position : [-1000, -1000]
			});
		}
	}
	onBlur(){
		setTimeout(()=>{
			this.setState({
				selectContent : "",
				shareContent : this.state.selectContent,
				position : [-1000, -1000]
			});
		}, 333);
	}
	componentWillUnmount(){
		streamer.stop("publicBackspaces");
	}
	componentDidMount(){
		streamer.on('publicBackspaces', message =>{
			this.setState({
				publicBackspaces : 	this.state.publicBackspaces + message.content
			});
		});
		document.querySelector(".stream2").onkeydown = this.handleKey.bind(this);
		document.querySelector(".stream2").onkeyup = this.handleKey.bind(this);
	}
	toggleFullscreen(){
		if(!this.state.fullscreen){
			document.querySelector(".stream2").focus();	
		}else{
			document.querySelector(".stream2").blur();	
		}
		this.setState({
			fullscreen : !this.state.fullscreen
		});
	}
	handleKey(event){
		event.preventDefault();
		event.stopPropagation();
		if(27 == event.keyCode /* ESC */ && this.state.fullscreen){
			this.toggleFullscreen();
		}
		return false;
	}
	getPublicArchive(){
		if(!this.props.isPublicReady)return "";
		return this.state.publicBackspaces+this.props.publicArchive.content;
	}
	getPrivateArchive(){
		if(!this.props.isPrivateReady)return "";
		return this.props.privateArchive.map(data=>data.content).join("");
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

				<ButtonShare 	left={this.state.position[0]} 
								top={this.state.position[1]} 
								content={this.state.shareContent}
				/>

				<div 	className={(this.state.fullscreen ? "fullscreen " : "") + "stream2" }
						onBlur={this.onBlur.bind(this)} 
						onSelect={this.onSelected.bind(this)} 
						contentEditable={true}
        				dangerouslySetInnerHTML={{__html: this.state.public ? this.getPublicArchive(): this.getPrivateArchive()}}
				></div>

				<button onClick={this.toggleFullscreen.bind(this)}>
					fullscreen
				</button>
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
