/*----------------------------------------*\
  bcksp.es - youtubeEmbed.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-27 15:38:20
  @Last Modified time: 2020-01-28 22:33:27
\*----------------------------------------*/
import React from 'react';

const YoutubeEmbed = ({className, youtubeID, width, height}) => {
	return (
		<iframe title="" className={className} src={"https://www.youtube-nocookie.com/embed/"+youtubeID+"?modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&theme=light&fs=0&color=white&controls=0&disablekb=1"}
				width={ width || "560" }
				height={ height || "315" }
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				frameBorder="0">
		</iframe>
	);
}

export default YoutubeEmbed;