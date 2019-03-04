
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
						<button onClick={this.toggleFullscreen.bind(this)}>
							<T>archive.fullscreen.button</T>
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

				<div 	className={(this.state.fullscreen ? "fullscreen " : "") + "stream bcksp-es-disabled" }
						contentEditable={true}
						spellCheck={false}
        				dangerouslySetInnerHTML={{__html: this.props.content }}
				></div>
				
				
			</div>
		);
	}
}