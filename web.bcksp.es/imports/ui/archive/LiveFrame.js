import { Caret } from 'caret-pos';
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import Tooltip from './../shared/tooltip.js';
import { log } from './../../utilities/log.js';
import ButtonShare from './../button/share.js';

// LiveStream component
export default class LiveFrame extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectContent:"",
			position : [-1000, -1000],
			fullscreen : FlowRouter.getRouteName() == "livefeed"
		};
		this.handleKey = this.handleKey.bind(this);
	}
	hideShareButton(){
		return false;
		if(this.cancelHideShareButton === true)return;
		this.hideShareButtonTimer = Meteor.setTimeout(()=>{
			this.setState({
				selectContent : "",
				position : [-1000, -1000],
			});
		}, 333)
	}
	componentWillUnmount(){
		Meteor.clearTimeout(this.hideShareButtonTimer);
		this.cancelHideShareButton = true;
		document.removeEventListener("keydown", this.handleKey, true);
		document.removeEventListener("keyup", this.handleKey, true);
		
	}
	componentDidMount(){
		document.addEventListener("keydown", this.handleKey, true);
		document.addEventListener("keyup", this.handleKey, true);
		this.caret = new Caret(document.querySelector(".stream"));
		this.caret.onCaretOff(event=>{
			this.hideShareButton()
		});
		this.caret.onCaretChange(event=>{
			let content = event.selectedText || "";
			if(_.isFunction(this.props.onSelect)){
				this.props.onSelect(content);
			}
			this.setState({
				selectContent : content,
			});
			if(content != ""){
				Meteor.clearTimeout(this.hideShareButtonTimer);
				let offset = event.caret.getOffset();
				offset.top -= document.querySelector(".livestream-container").offsetTop;
				offset.left -= document.querySelector(".livestream").offsetLeft
				this.setState({
					position : [offset.left, offset.top]
				});
			}else{
				this.hideShareButton();
			}
		});
	}
	
	handleKey(event){
		if(	   event.keyCode == 27 // ESC
			&& this.state.fullscreen
		){
			FlowRouter.go("home");
			event.preventDefault();
			return false;
		}
		if(		event.metaKey 
			 || event.ctrlKey
			 || event.key == "F5" // F5
			 || event.keyCode == 9 // TAB
		){
			return true;
		}
		
		if(this.props.public){
			event.preventDefault();
			return false;
		}else{
			if(		event.type == "keydown" 
				&&	event.keyCode == 8 // BACKSPACE
				&& !event.metaKey
				&& !event.altKey
				&& !event.ctrlKey
			){ 
				let text = this.caret.getSelectedText()
				if(text){
					event.preventDefault();
					Meteor.call("Archives.methods.edit", {
						text : text,
						startAt : this.caret.startAt,
						stopAt : this.caret.stopAt
					}, error => {
						if(error) log(error)
					});
					return true;
				}
			}
			switch(event.keyCode){
				case 37 : // LEFT
				case 38 : // UP
				case 39 : // RIGHT
				case 40 : // DOWN
					return true;
				break;
				default :
					event.preventDefault();
					return false;
			}
		}
	}

	render(){
		return (
			<div className="liveframe">
				{
					this.props.fullscreenAvailable!==false &&
						<a 	href={FlowRouter.path(this.state.fullscreen ? "home" : "livefeed")} 
							className="liveframe__fullscreen button--unstyled" 
						>
							<span className="sr-only">
								<T>archive.fullscreen.button</T>
							</span>
							<svg className="liveframe__fullscreen-icon" width="30" height="30" viewBox="0 0 41 40" xmlns="http://www.w3.org/2000/svg">
								<g fill="#000" fillRule="nonzero">
									<path d="M2 0h11.724a2 2 0 0 1 1.364 3.462L3.365 14.404A2 2 0 0 1 0 12.942V2a2 2 0 0 1 2-2zM2 39.942h11.724a2 2 0 0 0 1.364-3.462L3.365 25.538A2 2 0 0 0 0 27v10.942a2 2 0 0 0 2 2zM38.024 0H26.3a2 2 0 0 0-1.365 3.462L36.66 14.404a2 2 0 0 0 3.365-1.462V2a2 2 0 0 0-2-2zM38.024 39.942H26.3a2 2 0 0 1-1.365-3.462L36.66 25.538A2 2 0 0 1 40.024 27v10.942a2 2 0 0 1-2 2z"/><path d="M9.04 6.419L33.08 30.46l-2.12 2.121L6.918 8.54z"/>
									<path d="M9.04 32.581L33.08 8.54l-2.12-2.121L6.918 30.46z"/>
								</g>
							</svg>
						</a>
				}
				{
					this.props.shareAvailable!==false &&
						<ButtonShare 	left={this.state.position[0]}
										top={this.state.position[1]}
										content={this.state.selectContent}
										onShare={this.props.onShare && this.props.onShare.bind(this)}
						/>
				}
				<div className="liveframe__stream stream bcksp-es-disabled"
					contentEditable={true}
					suppressContentEditableWarning={true}
					spellCheck={false}
				>
					{
						this.props.content
					}
				</div>
			</div>
		);
	}
}