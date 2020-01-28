/*----------------------------------------*\
  bcksp.es - share.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 17:45:05
  @Last Modified time: 2020-01-28 21:21:20
\*----------------------------------------*/
import React from 'react';

const ButtonShare = ({onShare, content, top, left}) => {
	
	const T = i18n.createComponent("archive");

	const onClick = event => {
		event.preventDefault();	
		if(_.isFunction(onShare)){
			onShare(content);
		}
		return false;
	}

	return (
		<div	className="livefeed-share"
				style={{
					left: left+"px",
					top: top+"px"
				}}
		>
			<button className="button livefeed-share__button" onClick={ onClick }>
				<T>share.button</T>
				<div className="livefeed-share__button-decoration"></div>
			</button>
		</div>
	);
}


export default ButtonShare;