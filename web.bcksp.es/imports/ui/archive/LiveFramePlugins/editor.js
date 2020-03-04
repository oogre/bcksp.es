/*----------------------------------------*\
  bcksp.es - editor.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 16:35:54
  @Last Modified time: 2020-03-02 18:06:42
\*----------------------------------------*/

import React from 'react';
import { successHandler, errorHandler } from './../../../utilities/ui.js';;

export default ArchiveEditor = ({reload, children, caret, blocks, available, debug=false}) => {
	const [ loading, setLoading ] = React.useState(false);
	React.useEffect(() => {//componentDidMount
		document.querySelector(".bckspes-archive-editor").addEventListener("keydown", bckspEditHandler, true);
		return () => {//componentWillUnmount
			document.querySelector(".bckspes-archive-editor").removeEventListener("keydown", bckspEditHandler, true);
		}
	}, []);
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
	const bckspEditHandler = event => {
		if(		available
			&&	event.keyCode == 8 // BACKSPACE
			&& !event.metaKey
			&& !event.altKey
			&& !event.ctrlKey
		){ 
			let text = caret().getSelectedText();
			if(_.isString(text) && !_.isEmpty(text)){
				handleArchiveEdit({
					text : text, 
					startAt : caret().startAt, 
					stopAt : caret().stopAt
				});
			}
			event.preventDefault();
			return false;
		}

		if(		event.metaKey 
			 || event.ctrlKey
			 || event.key == "F5" // F5
			 || event.keyCode == 9 // TAB
			 || event.keyCode == 37 // LEFT
			 || event.keyCode == 38 // UP
			 || event.keyCode == 39 // RIGHT
			 || event.keyCode == 40 // DOWN
		){
			return true;
		}
		event.preventDefault();
		return false;
	}

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