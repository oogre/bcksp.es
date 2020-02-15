/*----------------------------------------*\
  bcksp.es - share.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 17:16:05
  @Last Modified time: 2020-02-15 19:04:16
\*----------------------------------------*/
import React, { useState, useEffect, useRef } from 'react';
import ButtonShare from './../../shared/shareButton.js';

export default ArchiveShare = ({caret, onSelect, onShare, children, available}) => {
	if(!available) return children;

	const hideShareButtonTimerRef = useRef();
	const [ selectContent , setSelectContent ] = useState("")
	const [ position , setPosition ] = useState([-1000, -1000]);

	const caretChangeHandler = event => {
		let content = event.selectedText || "";
		if(_.isFunction(onSelect)){
			onSelect(content);
		}
		setSelectContent(content);

		if(content != ""){
			Meteor.clearTimeout(hideShareButtonTimerRef.current);
			let offset = event.caret.getOffset();
			offset.top -= document.querySelector(".livestream-container").offsetTop;
			offset.left -= document.querySelector(".livestream").offsetLeft
			setPosition([offset.left, offset.top]);
		}else{
			hideShareButton();
		}
	}

	const hideShareButton = () => {
		hideShareButtonTimerRef.current = Meteor.setTimeout(()=>{
			setSelectContent("");
			setPosition([-1000, -1000]);
		}, 333)
	}

	useEffect(() => {//componentDidMount
		if(!available) return () => {}
		setTimeout(()=>{
			caret().onCaretOff( hideShareButton );
			caret().onCaretChange( caretChangeHandler );
		}, 100);
		
		return () => {//componentWillUnmount
			Meteor.clearTimeout(hideShareButtonTimerRef.current);
		}
	}, []);

	return (
		<div className="bckspes-archive-share">
			{
				<ButtonShare 	
					left={position[0]}
					top={position[1]}
					content={selectContent}
					onShare={onShare}
				/>
			}
			{
				React.Children.map(children, child => child)
			}
		</div>
	);
};