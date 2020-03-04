/*----------------------------------------*\
  bcksp.es - share.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 17:45:05
  @Last Modified time: 2020-03-04 18:29:59
\*----------------------------------------*/
import React from 'react';
import { getTranslations } from "./../../i18n/index.js";

const ButtonShare = ({onShare, content, top, left}) => {
	const {C} = getTranslations("archive");
	const onClickHandler = event => {
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
					top: top+"px",
					zIndex: "1000"
				}}
		>
			<button className="button livefeed-share__button" onClick={ onClickHandler }>
				<C>share.button</C>
				<div className="livefeed-share__button-decoration"></div>
			</button>
		</div>
	);
}


export default ButtonShare;