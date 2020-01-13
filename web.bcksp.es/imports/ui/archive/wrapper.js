/*----------------------------------------*\
  bcksp.es - wrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-12 21:36:19
  @Last Modified time: 2020-01-13 00:59:52
\*----------------------------------------*/


import T from './../../i18n/index.js';
import LiveFrame from './LiveFrame.js';
import React, { useState, useEffect } from 'react';
import Tooltip from './../shared/tooltip.js';
import Dropdown from './../shared/dropdown.js';
import { config } from './../../startup/config.js';
import { streamer } from './../../api/streamer.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';

let privateStreamedContent = "";

const privateStreamHandler = private => {
	if(private.archive.stream){
		privateStreamedContent = private.archive.stream + privateStreamedContent;
	}else{
		privateStreamedContent = "";
	}
	private.archive.content = privateStreamedContent + private.archive.content;

	useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			private.handle.stop();
		}
	}, []); 
}

const publicStreamHandler = public => {
	const [publicStreamedContent, setPublicStreamedContent] = useState("");
	public.archive.content = publicStreamedContent + public.archive.content;
	useEffect(() => {//componentDidMount
		streamer.on('publicBackspaces', message => {
			setPublicStreamedContent(message.content + publicStreamedContent);
		});
		return () => {//componentWillUnmount
			streamer.stop("publicBackspaces");
			public.handle.stop();
		}
	}, []); 
}

const ArchiveWrapper = ({selector, public, private}) => {
	if(!(selector == "public" || selector == "private" ))return (null);

	if(private.isReady)privateStreamHandler(private);
	if(public.isReady)publicStreamHandler(public);

	let streamToDisplay = null;
	if(selector == "public" && public.isReady) streamToDisplay = public;
	else if(selector == "private" && public.isReady)streamToDisplay = private;
	if(!streamToDisplay)return (null);
	console.log(streamToDisplay.archive.content);
	return (null);
}

export default withTracker(self => {
	let publicHandle = Meteor.subscribe('archive.public');
	let privateHandle = Meteor.userId() && Meteor.subscribe('archive.private.2');
	return {
		public : {
			handle : publicHandle,
			isReady : publicHandle && publicHandle.ready(),
			archive : Archives.find({
				type : Archives.Type.PUBLIC,
			}).fetch().map(archive=>archive.populate()).pop()
		},
		private : {
			handle : privateHandle,
			isReady : privateHandle && privateHandle.ready(),
			archive : Archives.find({
				type : Archives.Type.PRIVATE,
				owner : Meteor.userId()
			}).fetch().map(archive=>archive.populate()).pop()
		}
	};
})(ArchiveWrapper);

