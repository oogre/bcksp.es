/*----------------------------------------*\
  bcksp.es - short.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:01:42
  @Last Modified time: 2019-02-12 15:07:56
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
				<div className="container about__container">
					<h2 className="about__title"><T>about.title</T></h2>
					<div className="about__content">
						<T 
							about={FlowRouter.path("about")} 
							souvenir={FlowRouter.path("souvenir")}
						>
							about.short
						</T>
					</div>
				</div>
			</div>
		);
	}
}