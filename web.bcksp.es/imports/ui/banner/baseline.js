/*----------------------------------------*\
  bcksp.es - baseline.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 15:37:26
  @Last Modified time: 2018-09-23 19:00:45
\*----------------------------------------*/
import React, { Component } from 'react';
import T from './../../i18n/index.js';


export default class BannerBaseline extends Component {
	constructor(props){
		super(props);
	}

	render() {
			return (
			<div className="punchline">
				<div className="container">
					<h1 class="punchline__title"><T>baseline</T></h1>
				</div>
			</div>
		);
	}
}
