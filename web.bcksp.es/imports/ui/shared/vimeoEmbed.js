/*----------------------------------------*\
  bcksp.es - vimeoEmbed.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2021-12-21 16:52:13
  @Last Modified time: 2021-12-21 17:01:29
\*----------------------------------------*/
import React from 'react';

const VimeoEmbed = ({className, vimeoID, width, height}) => {
	return (
		<iframe 
			src={"https://player.vimeo.com/video/"+vimeoID+"?h=8a8c3745e5&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479"} 
			width={ width || "560" }
			height={ height || "315" }
			className={className} 
			frameBorder="0" 
			allow="autoplay; fullscreen; picture-in-picture" 
			allowFullScreen 
			title="bcksp.es"
		></iframe>
	);
}

export default VimeoEmbed;
