import { Caret } from 'caret-pos';
import React, { useState, useEffect, useRef } from 'react';
import { log } from './../../utilities/log.js';
import { isVisible } from './../../utilities/ui.js';

import { mobileAndTabletcheck, successHandler, errorHandler } from './../../utilities/ui.js';;
import ArchiveEditor from "./LiveFramePlugins/editor.js";
import ArchiveShare from "./LiveFramePlugins/share.js";
import ArchiveLoadMore from "./LiveFramePlugins/loadMore.js";
import ArchiveFullscreen from "./LiveFramePlugins/fullscreen.js";

const LiveFrame = ({reload, seeMore, onSelect, onShare, fullscreenAvailable = true, content, blocks, blockMaxLength=1}) =>  {
	
	const blocksRef = useRef(blocks);
	const caretRef = useRef();

	const getCarret = () => caretRef.current ;
	const getBlocks = () => blocksRef.current ;

	blocksRef.current = blocks;
	
	useEffect(() => {//componentDidMount
		caretRef.current = new Caret(document.querySelector(".stream"));
		return () => {//componentWillUnmount
		}
	}, []);
	
	return (
		<div className="liveframe">
			<ArchiveFullscreen available={fullscreenAvailable}>
				<ArchiveShare available={_.isFunction(onShare)} caret={getCarret} onShare={onShare} onSelect={onSelect}>
					<ArchiveEditor available={_.isFunction(reload)} caret={getCarret} blocks={getBlocks} reload={reload}>
						<ArchiveLoadMore available={_.isFunction(seeMore) && blocksRef.current && blocksRef.current.length < blockMaxLength} seeMore={seeMore} >
							<div className="liveframe__stream stream bcksp-es-disabled"
								contentEditable={ (!mobileAndTabletcheck()) && _.isFunction(reload) }
								suppressContentEditableWarning={true}
								spellCheck={false}
							>
								{
									_.isArray(blocks) ? _.pluck(blocks, 'content').join(" ") : content
								}
							</div>
						</ArchiveLoadMore>
					</ArchiveEditor>
				</ArchiveShare>
			</ArchiveFullscreen>
		</div>
	);
}

export default LiveFrame;