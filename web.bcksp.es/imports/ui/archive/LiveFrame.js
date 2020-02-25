import React from 'react';
import { Caret } from 'caret-pos';
import FixeWait from "./../fixe/wait.js";
import ArchiveEditor from "./LiveFramePlugins/editor.js";
import ArchiveSelector from "./LiveFramePlugins/selector.js";
import {ArchiveLoadMore} from "./LiveFramePlugins/loadMore.js";
import ArchiveFullscreen from "./LiveFramePlugins/fullscreen.js";
import { mobileAndTabletcheck, successHandler, errorHandler } from './../../utilities/ui.js';;


const LiveFrame = ({reload, seeMore, onSelect, autoSelect, fullscreenAvailable = true, content, blocks, blockMaxLength=1, loading}) =>  {
	const blocksRef = React.useRef(blocks);
	const caretRef = React.useRef();
	const childRef = React.useRef()
	const getCarret = () => caretRef.current ;
	const getBlocks = () => blocksRef.current ;
	blocksRef.current = blocks;
	content = _.isArray(blocks) ? _.pluck(blocks, 'content').join(" ") : content;

	React.useEffect(() => {//componentDidMount
		caretRef.current = new Caret(document.querySelector(".stream"));
		childRef.current.setCaret(caretRef.current);
		return () => {//componentWillUnmount
		}
	}, []);

	return (
		<div className="liveframe">
			<ArchiveFullscreen available={fullscreenAvailable}>
				<ArchiveSelector ref={childRef} available={_.isFunction(onSelect)} caret={getCarret} onSelect={onSelect} autoSelect={autoSelect}>
					<ArchiveEditor available={_.isFunction(reload)} caret={getCarret} blocks={getBlocks} reload={reload}>
						<ArchiveLoadMore available={_.isFunction(seeMore) && blocksRef.current && blocksRef.current.length < blockMaxLength} seeMore={seeMore} >
							<div className="liveframe__stream stream bcksp-es-disabled"
								contentEditable={ (!mobileAndTabletcheck()) }
								suppressContentEditableWarning={true}
								spellCheck={false}
							>
								{
									content
								}
							</div>
							{ loading && <FixeWait/> }
						</ArchiveLoadMore>
					</ArchiveEditor>
				</ArchiveSelector>
			</ArchiveFullscreen>
		</div>
	);
}

export default LiveFrame;