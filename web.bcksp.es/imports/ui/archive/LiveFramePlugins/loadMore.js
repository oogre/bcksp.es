/*----------------------------------------*\
  bcksp.es - loadMore.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 17:51:35
  @Last Modified time: 2020-02-15 18:30:33
\*----------------------------------------*/
import React, { useEffect, useRef } from 'react';
import { isVisible } from './../../../utilities/ui.js';

export default ArchiveLoadMore = ({seeMore, children, available})=>{
	if(!available) return children;

	const loadMoreElement = useRef();
	
	if(!(loadMoreElement.current) || isVisible(loadMoreElement.current)){
		seeMore();		
	}
	
	useEffect(() => {//componentDidMount
		if(!available) return () => {}
		loadMoreElement.current = document.querySelector(".bcksp-load-more");
		return () => {//componentWillUnmount
		}
	}, []);

	return (
		<div className="bckspes-archive-load-more">
			{
				React.Children.map(children, child => child)
			}
			<button className="bcksp-load-more" onClick={seeMore}>More</button>
		</div>
	);
}