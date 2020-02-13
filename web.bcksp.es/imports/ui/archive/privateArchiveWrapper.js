/*----------------------------------------*\
  bcksp.es - PrivateArchiveWrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 15:22:27
  @Last Modified time: 2020-02-13 23:59:38
\*----------------------------------------*/

import LiveFrame from './LiveFrame.js';
import ArchiveBook from './book.js';
import React, { useEffect, useRef } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import { config } from './../../startup/config.js';
import { intro, preface } from './../../api/books/intro.js';
import { ReactiveVar } from 'meteor/reactive-var';



const PrivateArchiveWrapper = ({resetSubscription, seeMore, handle, archive = {}, raw = false, ...other}) => {
	archive.count = archive?.count || 0;
	archive.stream = archive?.stream || [];
	archive.blocks = archive?.blocks || [];
	archive.blockLength = archive?.blockLength || 0;
	
	const blocksRef = useRef([]);
	const streamRef = useRef([]);
	const timerRef = useRef([]);
	const reset = () => {
		blocksRef.current = [];
		streamRef.current = [];
		resetSubscription();
	}
	
	blocksRef.current = _.uniq(blocksRef.current.concat(archive.blocks), false, item => item._id);
	streamRef.current = _.uniq(archive.stream.concat(streamRef.current), false, item => item._id);	
	const blocks = _.uniq(streamRef.current.concat(blocksRef.current), false, item => item._id);

	if(handle.ready()){
		if( blocks.length < archive.blockLength){
			timerRef.current = Meteor.setTimeout(seeMore, 100);
		}
	}
	
	useEffect(() => {//componentDidMount
		resetSubscription();
		return () => {//componentWillUnmount
			handle.stop();
			Meteor.clearTimeout(timerRef.current);
		}
	}, []); 

	if(raw) {
		return ( 
			<ArchiveBook 
				intro={ intro } 
				preface={ preface } 
				blocks={ blocks }
				{ ...other }
			/>
		);
	}
	
	return (
		<LiveFrame	
			public={ false }
			blocks={ blocks }
			reset={ reset }
			{ ...other }
		/>
	);
};

const startAt = new ReactiveVar(0);

export default withTracker(self => {
	const handle = Meteor.subscribe('archive.private', { 
		startAt : startAt.get(), 
		count : 10, 
		live : true
	});
	const seeMore = () => {
		startAt.set(startAt.get() + 10);
	};
	const resetSubscription = () => {
		startAt.set(0);
	};
	const archive = Archives.find({
		type : Archives.Type.PRIVATE,
		owner : Meteor.userId()
	}).fetch().pop();

	return {
		resetSubscription : resetSubscription,
		seeMore : seeMore,
		archive : archive,
		handle : handle
	};
})(PrivateArchiveWrapper);
