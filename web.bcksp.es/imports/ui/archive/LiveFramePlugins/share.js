/*----------------------------------------*\
  bcksp.es - share.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 17:16:05
  @Last Modified time: 2020-02-16 15:21:19
\*----------------------------------------*/
import React from 'react';
import ButtonShare from './../../shared/shareButton.js';

export default ArchiveShare = React.forwardRef( ({caret, onSelect, onShare, children, available}, ref) => {
	
	const hideShareButtonTimerRef = React.useRef();
	const [ selectContent , setSelectContent ] = React.useState("")
	const [ position , setPosition ] = React.useState([-1000, -1000]);

	React.useImperativeHandle(ref, () => ({
		setCaret: caret => {
			if(!available) return;
			caret.onCaretOff( hideShareButton );
			caret.onCaretChange( caretChangeHandler );
		}
	}));

	React.useEffect(() => {//componentDidMount
		if(!available) return () => {}
		return () => {//componentWillUnmount
			Meteor.clearTimeout(hideShareButtonTimerRef.current);
		}
	}, []);

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

	if(!available) return children;
	
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
});