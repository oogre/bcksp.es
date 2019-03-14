
import { Caret } from 'caret-pos';
import React, { Component } from 'react';
import T from './../../i18n/index.js';
import { log } from './../../utilities/log.js';
import ButtonShare from './../button/share.js';


// LiveStream component
export default class LiveFrame extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectContent:"",
			position : [-1000, -1000],
			fullscreen : false
		};
	}
	hideShareButton(){
		this.hideShareButtonTimer = setTimeout(()=>{
			this.setState({
				selectContent : "",
				position : [-1000, -1000],
			});
		}, 333)
	}
	componentDidMount(){
		this.streamElement = document.querySelector(".stream");
		this.streamElement.onkeydown = this.handleKey.bind(this);
		this.streamElement.onkeyup = this.handleKey.bind(this);
		this.caret = new Caret(this.streamElement);
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
				clearInterval(this.hideShareButtonTimer);
				let offset = event.caret.getOffset();
				this.setState({
					position : [offset.left, offset.top]
				});
			}else{
				this.hideShareButton();
			}
		});
	}
	toggleFullscreen(){
		if(!this.state.fullscreen){
			this.streamElement.focus();
		}else{
			this.streamElement.blur();
		}
		this.setState({
			fullscreen : !this.state.fullscreen
		});
	}
	handleKey(event){
		if(	   event.keyCode == 27 // ESC
			&& this.state.fullscreen
		){
			this.toggleFullscreen();
		}

		if(	   !this.props.public
			&& event.type == "keydown"
			&& event.keyCode == 8 // BCKSP
			&& !event.metaKey
			&& !event.altKey
			&& !event.ctrlKey
		){
			let text;
			if(text = this.caret.getSelectedText()){
				Meteor.call("Archives.methods.edit", {
					text : text,
					startAt : this.caret.startAt,
					stopAt : this.caret.stopAt
				}, error => {if(error) log(e)});
			}
			return false;
		}
		switch(event.keyCode){
			case 37 :
			case 38 :
			case 39 :
			case 40 :
				return true;
			break;
			default :
				return false;
		}
	}

	render(){
		return (
			<div className="liveframe">
				{
					this.props.fullscreenAvailable!==false &&
						<button className="liveframe__fullscreen button--unstyled" onClick={this.toggleFullscreen.bind(this)}>
							<span className="sr-only">
								<T>archive.fullscreen.button</T>
							</span>
							<svg className="liveframe__fullscreen-icon" width="30" height="30" viewBox="0 0 41 40" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="nonzero"><path d="M2 0h11.724a2 2 0 0 1 1.364 3.462L3.365 14.404A2 2 0 0 1 0 12.942V2a2 2 0 0 1 2-2zM2 39.942h11.724a2 2 0 0 0 1.364-3.462L3.365 25.538A2 2 0 0 0 0 27v10.942a2 2 0 0 0 2 2zM38.024 0H26.3a2 2 0 0 0-1.365 3.462L36.66 14.404a2 2 0 0 0 3.365-1.462V2a2 2 0 0 0-2-2zM38.024 39.942H26.3a2 2 0 0 1-1.365-3.462L36.66 25.538A2 2 0 0 1 40.024 27v10.942a2 2 0 0 1-2 2z"/><path d="M9.04 6.419L33.08 30.46l-2.12 2.121L6.918 8.54z"/><path d="M9.04 32.581L33.08 8.54l-2.12-2.121L6.918 30.46z"/></g></svg>
						</button>
				}
				{
					this.props.shareAvailable!==false &&
						<ButtonShare 	left={this.state.position[0]}
										top={this.state.position[1]}
										content={this.state.selectContent}
										onShare={this.props.onShare && this.props.onShare.bind(this)}
						/>
				}

				<div 	className={(this.state.fullscreen ? "fullscreen " : "") + "liveframe__stream stream bcksp-es-disabled" }
						contentEditable={true}
						spellCheck={false}
        				dangerouslySetInnerHTML={{__html: this.props.content }}
				></div>


			</div>
		);
	}
}