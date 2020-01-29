/*----------------------------------------*\
  bcksp.es - PrivateArchiveWrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 15:22:27
  @Last Modified time: 2020-01-29 11:50:50
\*----------------------------------------*/

import LiveFrame from './LiveFrame.js';
import ArchiveBook from './book.js';
import React, { useEffect, useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import { config } from './../../startup/config.js';
import { intro, preface } from './../../api/books/intro.js';
let privateStreamedContent = "";


const PrivateArchiveWrapper = ({handle, isReady, archive, raw = false, author, ...other}) => {
	if(!isReady)return (null);
	
	privateStreamedContent = archive.stream ? (archive.stream + privateStreamedContent) : "";
	archive.content = privateStreamedContent + archive.content;

	useEffect(() => {//componentDidMount
		return () => {//componentWillUnmount
			handle.stop();
		}
	}, []); 

	if(raw) {
		return ( 
			<ArchiveBook 
				intro={intro} 
				preface={preface} 
				content={archive.content} 
				author={author}
			/>
		);
	}
	
	return (
		<LiveFrame	
			public={ false }
			content={ archive.content }
			{ ...other }
		/>
	);
};

export default withTracker(self => {
	let handle = Meteor.subscribe('archive.private');
	return {
		handle : handle,
		isReady : handle.ready(),
		archive : Archives.find({
			type : Archives.Type.PRIVATE,
			owner : Meteor.userId()
		}).fetch().map(archive=>archive.populate()).pop()
	};
})(PrivateArchiveWrapper);