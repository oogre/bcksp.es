/*----------------------------------------*\
  bcksp.es - share.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 17:45:05
  @Last Modified time: 2019-02-10 15:01:47
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';

export default class ButtonShare extends Component {
	constructor(props){
		super(props);
	}
	onClick(event){
		event.preventDefault();
		if(_.isFunction(this.props.onShare)){
			this.props.onShare(this.props.content);
		}else{
			console.log(this.props.content);	
		}
		return false;
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