/*----------------------------------------*\
  bcksp.es - privacy.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:14:26
  @Last Modified time: 2019-11-26 14:17:53
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';

// App component - represents the whole app
export default class AboutPrivacy extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div id="aboutPrivacy" className="about">
				<div className="container about__container">
					<h2 className="about__title"><T>privacy.title</T></h2>
					<div className="about__content">
						<T about={FlowRouter.path("about")} privacy={FlowRouter.path("about")+"#privacy"}>privacy.short</T>
						<span>
							<a href={FlowRouter.path("about")}>
								<T>privacy.link</T>
							</a>
						</span>
					</div>
				</div>
			</div>
		);
	}
}