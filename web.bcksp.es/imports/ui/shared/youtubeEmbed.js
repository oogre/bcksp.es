/*----------------------------------------*\
  bcksp.es - youtubeEmbed.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-27 15:38:20
  @Last Modified time: 2019-03-27 15:49:49
\*----------------------------------------*/
import React, { Component } from 'react';

export default class YoutubeEmbed extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<iframe title="" className={this.props.className} src={"https://www.youtube-nocookie.com/embed/"+this.props.youtubeID+"?modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&theme=light&fs=0&color=white&controls=0&disablekb=1"}
					width={ this.props.width || "560" }
					height={ this.props.height || "315" }
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					frameBorder="0">
			</iframe>
		);
	}
}