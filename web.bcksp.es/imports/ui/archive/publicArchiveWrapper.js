/*----------------------------------------*\
  bcksp.es - publicArchiveWrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 15:24:29
  @Last Modified time: 2020-01-13 15:25:20
\*----------------------------------------*/

import LiveFrame from './LiveFrame.js';
import React, { useState, useEffect } from 'react';
import { streamer } from './../../api/streamer.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';

const PublicArchiveWrapper = ({handle, isReady, archive}) => {
	if(!isReady)return (null);
	const [publicStreamedContent, setPublicStreamedContent] = useState("");
	archive.content = publicStreamedContent + archive.content;
	useEffect(() => {//componentDidMount
		streamer.on('publicBackspaces', message => {
			setPublicStreamedContent(message.content + publicStreamedContent);
		});
		return () => {//componentWillUnmount
			streamer.stop("publicBackspaces");
			handle.stop();
		}
	}, []); 
	return (
		<LiveFrame	
			public={ true }
			content={ archive.content }
			onSelect={ null }
			onShare={ null }
			fullscreenAvailable={ false }
			shareAvailable={ false }
		/>
	)
};

export default withTracker(self => {
	let handle = Meteor.subscribe('archive.public');
	return {
		handle : handle,
		isReady : handle.ready(),
		archive : Archives.find({
			type : Archives.Type.PUBLIC
		}).fetch().map(archive=>archive.populate()).pop()
	};
})(PublicArchiveWrapper);