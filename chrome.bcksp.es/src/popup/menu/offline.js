/*----------------------------------------*\
  bcksp.es - offline.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-05-09 18:13:46
  @Last Modified time: 2019-05-09 18:16:15
\*----------------------------------------*/
import { MDText } from 'i18n-react';
import React, { Component } from 'react';
import { log, info, warn, error } from './../../utilities/log.js';

const T = new MDText(JSON.parse(localStorage.getItem("translation")), { MDFlavor: 1 });;

export default class OfflineMenu extends Component {
	constructor(props) {
		super(props);
		
	}
	render() {
		return (
			<div>
				OFFLINE menu
			</div>
		);
	}
}