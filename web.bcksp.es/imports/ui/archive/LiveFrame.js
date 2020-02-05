import { Caret } from 'caret-pos';
import React, { useState, useEffect } from 'react';
import Tooltip from './../shared/tooltip.js';
import { log } from './../../utilities/log.js';
import ButtonShare from './../shared/shareButton.js';
import { mobileAndTabletcheck, successHandler, errorHandler } from './../../utilities/ui.js';;

let hideShareButtonTimer;
let caret;

const LiveFrame = ({onSelect, onShare, public, fullscreenAvailable = true, content}) =>  {
	const [ loading, setLoading ] = useState(false);
	const [ selectContent , setSelectContent ] = useState("")
	const [ position , setPosition ] = useState([-1000, -1000]);
	const fullscreen = FlowRouter.getRouteName() == "livefeed";
	const fullscreenLink = FlowRouter.path(fullscreen ? "home" : "livefeed");

	const handleArchiveEdit = data => {
		if(loading)return;
		setLoading(true);
		Meteor.call("Archives.methods.edit", data, (error, res)=> {
			setLoading(false);
			if(errorHandler(error))return;
			successHandler(res)
		});
	}
	
	const caretChangeHandler = event => {
		let content = event.selectedText || "";
		if(_.isFunction(onSelect)){
			onSelect(content);
		}
		setSelectContent(content);

		if(content != ""){
			Meteor.clearTimeout(hideShareButtonTimer);
			let offset = event.caret.getOffset();
			offset.top -= document.querySelector(".livestream-container").offsetTop;
			offset.left -= document.querySelector(".livestream").offsetLeft
			setPosition([offset.left, offset.top]);
		}else{
			hideShareButton();
		}
	}

	const hideShareButton = () => {
		hideShareButtonTimer = Meteor.setTimeout(()=>{
			setSelectContent("");
			setPosition([-1000, -1000]);
		}, 333)
	}


	const handleKey = event => {
		if(	   event.keyCode == 27 // ESC
			&& fullscreen
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
		
		if(public){
			event.preventDefault();
			return false;
		}else{
			if(		event.type == "keydown" 
				&&	event.keyCode == 8 // BACKSPACE
				&& !event.metaKey
				&& !event.altKey
				&& !event.ctrlKey
			){ 
				let text = caret.getSelectedText()
				if(text){
					event.preventDefault();
					handleArchiveEdit({
						text : text,
						startAt : caret.startAt,
						stopAt : caret.stopAt
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

	useEffect(() => {//componentDidMount
		document.addEventListener("keydown", handleKey, true);
		document.addEventListener("keyup", handleKey, true);
		caret = new Caret(document.querySelector(".stream"));
		caret.onCaretOff( hideShareButton );
		caret.onCaretChange( caretChangeHandler );

		return () => {//componentWillUnmount
			Meteor.clearTimeout(hideShareButtonTimer);
			document.removeEventListener("keydown", handleKey, true);
			document.removeEventListener("keyup", handleKey, true);
		}
	}, []);

	const T = i18n.createComponent("archive");

	return (
		<div className="liveframe">
			{
				fullscreenAvailable &&
					<a 	href={fullscreenLink} 
						className="liveframe__fullscreen button--unstyled" 
					>
						<span className="sr-only">
							<T>fullscreen.button</T>
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
				_.isFunction(onShare) &&
					<ButtonShare 	
						left={position[0]}
						top={position[1]}
						content={selectContent}
						onShare={onShare}
					/>
			}
			
			<div className="liveframe__stream stream bcksp-es-disabled"
				contentEditable={ !mobileAndTabletcheck() }
				suppressContentEditableWarning={true}
				spellCheck={false}
			>
				{
					content
				}
			</div>
		</div>
	);
}

export default LiveFrame;