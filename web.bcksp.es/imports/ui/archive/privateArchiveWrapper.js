/*----------------------------------------*\
  bcksp.es - PrivateArchiveWrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 15:22:27
  @Last Modified time: 2020-01-14 08:30:29
\*----------------------------------------*/

import T from './../../i18n/index.js';
import LiveFrame from './LiveFrame.js';
import ArchiveBook from './book.js';
import React, { useEffect, useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import { config } from './../../startup/config.js';
import { intro, preface } from './../../api/books/intro.js';
let privateStreamedContent = "";


const PrivateArchiveWrapper = ({handle, isReady, archive, raw = false}) => {
	if(!isReady)return (null);
	if(archive.stream){
		privateStreamedContent = archive.stream + privateStreamedContent;
	}else{
		privateStreamedContent = "";
	}

	archive.content = privateStreamedContent + archive.content;

	useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			handle.stop();
		}
	}, []); 
	if(raw) return ( <ArchiveBook intro={intro} preface={preface} content={archive.content}/> );
	
	return (
		<LiveFrame	
			public={ false }
			content={ archive.content }
			onSelect={ null }
			onShare={ null }
			fullscreenAvailable={ false }
			shareAvailable={ false }
		/>
	);
};

export default withTracker(self => {
	let handle = Meteor.subscribe('archive.private.2');
	return {
		handle : handle,
		isReady : handle.ready(),
		archive : Archives.find({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId()
		}).fetch().map(archive=>archive.populate()).pop()
	};
})(PrivateArchiveWrapper);