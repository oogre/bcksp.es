/*----------------------------------------*\
  bcksp.es - long.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:23:21
  @Last Modified time: 2019-11-13 16:06:25
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';


// App component - represents the whole app
export default class AboutLong extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="about--long">
					<T download={FlowRouter.path("item", {type:"download"})}>about.long</T>

					
			</div>
		);
	}
}