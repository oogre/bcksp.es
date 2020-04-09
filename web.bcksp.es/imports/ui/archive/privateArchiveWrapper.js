/*----------------------------------------*\
  bcksp.es - PrivateArchiveWrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 15:22:27
  @Last Modified time: 2020-04-09 13:39:03
\*----------------------------------------*/

import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import { config } from './../../startup/config.js';
import { ReactiveVar } from 'meteor/reactive-var';

const PrivateArchiveWrapper = ({Renderer, charToLoad = 200, resetSubscription, seeMore, ready, seeMoreWrap, handle, archive = {}, ...other}) => {
	archive.count = archive?.count || 0;
	archive.stream = archive?.stream || [];
	archive.blocks = archive?.blocks || [];
	archive.blockIds = archive?.blockIds || [];
	archive.blockLength = archive?.blockLength || 0;

	const blocksRef = React.useRef([]);
	const streamRef = React.useRef([]);
	
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

	// load from the archive at least 200 char if available
	React.useEffect(() => {//blocksUpdate
		if(handle.ready()){
			const loadedLength = blocks.map(({content})=>content).join(" ").length;
			if(loadedLength < charToLoad && loadedLength < archive.count){
				seeMore();
			}
			else if(loadedLength >= charToLoad && _.isEmpty(seeMoreWrap)){
				ready();
			}
		}
	}, [blocks, handle.ready()]); 

	React.useEffect(() => {//componentDidMount
		resetSubscription();
		return () => {//componentWillUnmount
			handle.stop();
		}
	}, []); 

	return (
		<Renderer	
			loading={!handle.ready()}
			blockMaxLength={ archive.blockIds.length }
			blocks={ blocks }
			reload={ reload }
			{ ...seeMoreWrap }
			{ ...other }
		/>
	);
};

const seeMoreWrap = new ReactiveVar({});
const request = new ReactiveVar({
	startAt : 0, 
	count : 1, 
});

export default withTracker(self => {
	const handle = Meteor.subscribe('archive.private', { 
		...(request.get()),
		live : true
	});
	const seeMore = (newCount = 1) => {
		let {startAt, count} = request.get();
		startAt += count;
		count = newCount;
		request.set({startAt , count});
	};
	const ready = () => {
		seeMoreWrap.set({
			seeMore : count => seeMore(count)
		});
	}
	const resetSubscription = () => {
		handle.stop();
		request.set({
			startAt : 0, 
			count : 1, 
		});
		seeMoreWrap.set({});
	};
	const archive = Archives.find({
		type : Archives.Type.PRIVATE,
		owner : Meteor.userId()
	}).fetch().pop();

	return {
		resetSubscription : resetSubscription,
		seeMore : seeMore,
		ready : ready,
		seeMoreWrap : seeMoreWrap.get(),
		archive : archive,
		handle : handle
	};
})(PrivateArchiveWrapper);
