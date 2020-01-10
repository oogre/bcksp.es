/*----------------------------------------*\
  bcksp.es - baseline.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 15:37:26
  @Last Modified time: 2020-01-10 00:05:43
\*----------------------------------------*/
import React, { Component } from 'react';
import T from './../../i18n/index.js';

import SelfWritten from "./../shared/selfwritten.js";

export default class BannerBaseline extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="punchline">
				<div className="container">
					{ 	
						!this.props.isConnected &&
						<h1 className="punchline__title" >
							<SelfWritten text={ Object.values(i18n.__("offline.baseline")) } />
						</h1>
						
					}
					{
						this.props.isConnected &&
							<h1 className="page__title">
								{ _.sample(Object.values(i18n.__("online.baseline"))) }
							</h1>
					}
				</div>
			</div>
		);
	}
}
