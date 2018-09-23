/*----------------------------------------*\
  bcksp.es - short.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:01:42
  @Last Modified time: 2018-09-23 18:59:20
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';

// App component - represents the whole app
export default class AboutShort extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="about">
				<div className="container">
					<h2><T>about.title</T></h2>
					<div>
						<T>about.short</T>
						<span>
							<a href={FlowRouter.path("about")}>
								<T>about.link</T>
							</a>
						</span>
					</div>
				</div>
			</div>
		);
	}
}