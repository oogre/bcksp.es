/*----------------------------------------*\
  bcksp.es - editor.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 16:35:54
  @Last Modified time: 2020-02-15 21:52:17
\*----------------------------------------*/

import React, { useState, useEffect } from 'react';
import { successHandler, errorHandler } from './../../../utilities/ui.js';;

export default ArchiveEditor = ({reload, children, caret, blocks, available, debug=false}) => {
	if(!available) return children;

	const [ loading, setLoading ] = useState(false);
	
	const handleArchiveEdit = data => {
		if(loading)return;
		setLoading(true);
		data = getBlockRepresentation(data);
		Meteor.call("Archives.methods.edit", data, (error, res)=> {
			setLoading(false);
			if(errorHandler(error))return;
			successHandler(res);
			setTimeout(reload, 500);
			reload();

		});
	}

	const getBlockRepresentation = ({text, startAt, stopAt}) => {
		let selectedBlocks = [];
		let charCounter = 0;
		for(let block of blocks()){
			let charCounterInBlock = 0
			while(charCounterInBlock < block.content.length && charCounter < stopAt){
				if(charCounter >= startAt && charCounter < stopAt ){
					let currentBlock = _.findWhere(selectedBlocks, {_id : block._id});
					if(!currentBlock){
						selectedBlocks.push({
							_id : block._id,
							startAt : charCounterInBlock,
							count : 1,
							text : block.content.charAt(charCounterInBlock),
							expend : function(){
								this.text+=block.content.charAt(this.startAt+this.count);
								this.count++;
							}
						});
					}else{
						currentBlock.expend();
					}
				}
				charCounterInBlock ++;
				charCounter++
			}
			charCounter++;//inc for th space inserted between blocks
			if(charCounter > stopAt) break;
		}
		selectedBlocks = selectedBlocks.map(selectedBlock => _.omit(selectedBlock, "expend"));
		return selectedBlocks;
	}

	const handleKey = event => {
		if(		event.type == "keydown" 
			&&	event.keyCode == 8 // BACKSPACE
			&& !event.metaKey
			&& !event.altKey
			&& !event.ctrlKey
		){ 
			event.preventDefault();
			let text = caret().getSelectedText();
			_.isString(text) && !_.isEmpty(text) && handleArchiveEdit({
				text : text, 
				startAt : caret().startAt, 
				stopAt : caret().stopAt
			});
			return false;
		}

		if(		event.metaKey 
			 || event.ctrlKey
			 || event.key == "F5" // F5
			 || event.keyCode == 9 // TAB
		){
			return true;
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

	useEffect(() => {//componentDidMount
		document.querySelector(".bckspes-archive-editor").addEventListener("keydown", handleKey, true);
		document.querySelector(".bckspes-archive-editor").addEventListener("keyup", handleKey, true);
		
		return () => {//componentWillUnmount
			document.querySelector(".bckspes-archive-editor").removeEventListener("keydown", handleKey, true);
			document.querySelector(".bckspes-archive-editor").removeEventListener("keyup", handleKey, true);
		}
	}, []);

	return (
		<div className="bckspes-archive-editor">
			{
				debug && <button onClick={reload}>reload</button>
			}
			{
				React.Children.map(children, child => child)
			}
		</div>
	);
}