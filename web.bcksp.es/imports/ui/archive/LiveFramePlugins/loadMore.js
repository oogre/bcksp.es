/*----------------------------------------*\
  bcksp.es - loadMore.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 17:51:35
  @Last Modified time: 2020-04-09 12:54:21
\*----------------------------------------*/
import React from 'react';

export const ArchiveLoadMore = ({seeMore, children, available})=>{
	if(!available) return children;
	
	const loadMoreHandler = event => {
		event.preventDefault();
		seeMore(10);
		return false;
	}
	
	return (
		<div className="bckspes-archive-load-more">
			{
				React.Children.map(children, child => child)
			}

			<button className="bcksp-load-more" onClick={loadMoreHandler}> >>> </button>
		</div>
	);
}