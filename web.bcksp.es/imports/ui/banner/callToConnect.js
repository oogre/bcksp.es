/*----------------------------------------*\
  bcksp.es - callToConnect.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-24 19:41:50
  @Last Modified time: 2018-12-07 21:58:46
\*----------------------------------------*/
import React, { Component } from 'react';
import T from './../../i18n/index.js';


export default class CallToConnect extends Component {
	constructor(props){
		super(props);
	}

	render() {
			return (
			<div>
				<div>
					<h1><T>extension.login.call.action</T></h1>
				</div>
			</div>
		);
	}
}
