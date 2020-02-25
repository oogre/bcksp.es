/*----------------------------------------*\
  bcksp.es - loadMore.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 17:51:35
  @Last Modified time: 2020-02-21 19:44:17
\*----------------------------------------*/
import React from 'react';
import { isVisible } from './../../../utilities/ui.js';

export const ArchiveLoadMoreButton = React.forwardRef( ({seeMore}, ref) => {
	const loadMoreElement = React.useRef();
	
	const loadMoreHandler = event => {
		event.preventDefault();
		seeMore();
		return false;
	}

	React.useEffect(() => {//componentDidMount
		loadMoreElement.current = document.querySelector(".bcksp-load-more");
		return () => {//componentWillUnmount
		}
	}, []);

	React.useImperativeHandle(ref, () => ({
		isVisible: () => {
			return !(loadMoreElement.current) || isVisible(loadMoreElement.current)
		}
	}));

	return (
		<button className="bcksp-load-more" onClick={loadMoreHandler}> >>> </button>
	);
});

export const ArchiveLoadMore = ({seeMore, children, available})=>{
	if(!available) return children;
	const childRef = React.useRef()

	if((!childRef.current) || childRef.current.isVisible()){
		seeMore();
	}
	
	return (
		<div className="bckspes-archive-load-more">
			{
				React.Children.map(children, child => child)
			}
			<ArchiveLoadMoreButton ref={childRef} seeMore={seeMore}/>
		</div>
	);
}