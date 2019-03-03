/*----------------------------------------*\
  bcksp.es - long.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:23:21
  @Last Modified time: 2019-02-12 16:15:37
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';


// App component - represents the whole app
export default class AboutLong extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let about = i18n.createTranslator("about");
		return (
			<div className="about">
				<div className="container">
					<h2 className="about__title"><T>about.title</T></h2>
					<div className="about__content">
						<T download={FlowRouter.path("item", {type:"download"})}>about.long</T>
					</div>
				</div>
			</div>
		);
	}
}