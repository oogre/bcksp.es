/*----------------------------------------*\
  web.bitRepublic - LiveStream.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 15:17:52
  @Last Modified time: 2018-11-25 23:22:16
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../api/archives/archives.js';
import { PublicArchive } from './../api/archives/archives.js';
import { PrivateArchive } from './../api/archives/archives.js';
import { streamer } from '../api/streamer.js';
import { config } from './../startup/config.js';
import ButtonShare from './button/share.js';
import T from './../i18n/index.js';


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
		} else if(streamName == "private" && Meteor.userId() && this.state.streamFrom != streamName){
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
		$(".stream2").attr("contenteditable", true);
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
		if(27 == event.keyCode /* ESC */ && this.state.fullscreen){
			this.toggleFullscreen();
		}
		if(8 == event.keyCode){

		}
		return false;
	}
	
	render() {
		return (
			<div>
				<ul>
					<li>
						<button onClick={this.handleSwitchStream.bind(this, "public")}>public live stream</button>
					</li>
					{ 
						Meteor.userId() ? 
							<li>
								<button onClick={this.handleSwitchStream.bind(this, "private")}>your live stream</button>
							</li>
						:
							null
					}
				</ul>
				<div 	className={(this.state.fullscreen ? "fullscreen " : "") + "stream2" }
						onBlur={this.onBlur.bind(this)} 
						onKeyPress={this.handleKey.bind(this)}
						onKeyUp={this.handleKey.bind(this)}
						onSelect={this.onSelected.bind(this)} 
				>
					<ButtonShare left={this.state.position[0]} top={this.state.position[1]} content={this.state.shareContent}/>
					{
						this.state.public ? (this.state.publicBackspaces+this.props.publicArchive) : this.props.privateArchive
					} 	
				</div>
				<button onClick={this.toggleFullscreen.bind(this)}>fullscreen</button>
			</div>
		);
	}
}

export default withTracker(self => {
	let publicArchive = "";
	if(FlowRouter.subsReady("archive.public")){
		publicArchive = PublicArchive.findOne({}).content
	}
	let privateArchive = "";
	if(FlowRouter.subsReady("archive.private")){
		privateArchive = PrivateArchive.find({}, {
							sort : {
								_id : -1
							}
						}).fetch()
						.map(data=>data.content)
						.join("");
	}

	return {
		publicArchive : publicArchive,
		privateArchive : privateArchive
	};
})(LiveStream);
