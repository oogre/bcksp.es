/*----------------------------------------*\
  bcksp.es - publicArchiveWrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 15:24:29
  @Last Modified time: 2020-02-07 22:25:54
\*----------------------------------------*/

import LiveFrame from './LiveFrame.js';
import React, { useState, useEffect } from 'react';
import { streamer } from './../../api/streamer.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';

const PublicArchiveWrapper = ({handle, isReady, archive, ...other}) => {
	if(!isReady)return (null);
	return (
		<LiveFrame	
			public={ true }
			content={ archive.longBuffer }
			{ ...other }
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