/*----------------------------------------*\
  bcksp.es - share.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 17:45:05
  @Last Modified time: 2018-12-19 19:52:22
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';

export default class ButtonShare extends Component {
	constructor(props){
		super(props);
	}
	onClick(){
		console.log(this.props.content);
	}
	render() {
		return (
			<div	className="buttonShare"
					style={{	
						left: this.props.left+"px",
						top: this.props.top+"px"
					}}
			>
				<button onClick={this.onClick.bind(this)}>
					<T>menus.share</T>
				</button>
			</div>
		);
	}
}