/*----------------------------------------*\
  bcksp.es - baseline.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 15:37:26
  @Last Modified time: 2019-03-03 14:23:33
\*----------------------------------------*/
import React, { Component } from 'react';
import T from './../../i18n/index.js';

import SelfWrittenTemplate from "./../template/selfwritten.js";

export default class BannerBaseline extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div className="punchline">
				<div className="container">
					<h1>
						{ 	!this.props.isConnected &&
								<SelfWrittenTemplate text={i18n.__("offline.baseline")}/>
						}
						{
							this.props.isConnected &&
								_.sample(i18n.__("online.baseline"))
						}
					</h1>
				</div>
			</div>
		);
	}
}
