/*----------------------------------------*\
  bcksp.es - PrivateArchiveWrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 15:22:27
  @Last Modified time: 2020-02-15 21:51:23
\*----------------------------------------*/

import ArchiveBook from './book.js';
import React, { useEffect, useRef } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import { config } from './../../startup/config.js';
import { ReactiveVar } from 'meteor/reactive-var';



const PrivateArchiveWrapper = ({Renderer, resetSubscription, seeMore, handle, archive = {}, ...other}) => {
	archive.count = archive?.count || 0;
	archive.stream = archive?.stream || [];
	archive.blocks = archive?.blocks || [];
	archive.blockIds = archive?.blockIds || [];
	archive.blockLength = archive?.blockLength || 0;
	
	const blocksRef = useRef([]);
	const streamRef = useRef([]);
	//const timerRef = useRef([]);
	const reload = () => {
		blocksRef.current = [];
		streamRef.current = [];
		resetSubscription();
		handle.stop();
	}
	blocksRef.current = _.uniq(blocksRef.current.concat(archive.blocks), false, item => item._id);
	streamRef.current = _.uniq(archive.stream.concat(streamRef.current), false, item => item._id);	
	const blocks =	_.uniq(streamRef.current.concat(blocksRef.current), false, item => item._id)
					.sort(function(a, b) {
							return archive.blockIds.indexOf(a._id) - archive.blockIds.indexOf(b._id);
					});

	useEffect(() => {//componentDidMount
		resetSubscription();
		return () => {//componentWillUnmount
			handle.stop();
			//Meteor.clearTimeout(timerRef.current);
		}
	}, []); 


	
	return (
		<Renderer	
			blockMaxLength={ archive.blockIds.length }
			blocks={ blocks }
			reload={ reload }
			seeMore={ ()=> {
				if(handle.ready()){
					seeMore();
				}
			}}
			{ ...other }
		/>
	);
};

const startAt = new ReactiveVar(0);

export default withTracker(self => {
	const handle = Meteor.subscribe('archive.private', { 
		startAt : startAt.get(), 
		count : 10, 
		live : false
	});
	const seeMore = () => {
		startAt.set(startAt.get() + 10);
	};
	const resetSubscription = () => {
		handle.stop();
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
