/*----------------------------------------*\
  bcksp.es - press.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 19:20:53
  @Last Modified time: 2018-09-23 19:27:36
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';

// App component - represents the whole app
export default class AboutPress extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="press">
				<div className="container">
					<h2><T>press.title</T></h2>
					<ul className="">
						{
							i18n.createTranslator("press")("testimonies").map((testimony, k) =>(
								<li className="" key={k} >	
									<p>« {testimony} »</p>
								</li>
							))
						}
					</ul>
					<a href={FlowRouter.path("contact")}><T>press.callToAction.button</T></a>
					<p><T>press.callToAction.message</T></p>
				</div>
			</div>
		);
	}
}