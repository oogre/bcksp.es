/*----------------------------------------*\
  bcksp.es - loadMore.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 17:51:35
  @Last Modified time: 2020-02-16 15:33:29
\*----------------------------------------*/
import React from 'react';
import { isVisible } from './../../../utilities/ui.js';

export default ArchiveLoadMore = ({seeMore, children, available})=>{
	if(!available) return children;
	const loadMoreElement = React.useRef();
	const loadMoreHandler = event => {
		event.preventDefault();
		seeMore();
		return false;
	}

	if(!(loadMoreElement.current) || isVisible(loadMoreElement.current)){
		seeMore();
	}

	React.useEffect(() => {//componentDidMount
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
			<a href="#" className="bcksp-load-more" onClick={loadMoreHandler}> >>> </a>
		</div>
	);
}