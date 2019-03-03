/*----------------------------------------*\
  bcksp.es - privacy.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:14:26
  @Last Modified time: 2019-02-12 18:02:30
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
			<div className="about">
				<div className="container about__container">
					<h2 className="about__title"><T>privacy.title</T></h2>
					<div className="about__content">
						<T>privacy.short</T>
						<span>
							<a href={FlowRouter.path("about")+"#privacy"}>
								<T>about.link</T>
							</a>
						</span>
					</div>
				</div>
			</div>
		);
	}
}