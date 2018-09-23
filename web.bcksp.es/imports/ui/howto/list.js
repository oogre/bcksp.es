/*----------------------------------------*\
  bcksp.es - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:56:40
  @Last Modified time: 2018-09-23 19:04:43
\*----------------------------------------*/
import React, { Component } from 'react';

import T from './../../i18n/index.js';
import HowtoStep from './step.js';

// App component - represents the whole app
export default class HowtoList extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<ul className="howto">
				<li>
					<HowtoStep k={0}>
						<img className="logo--header__picture" src="/images/logo-animated.gif" />
						<div>
							<h3>1. <T>howto.step.0.title</T></h3>
							<p><T>howto.step.0.desc</T></p>
							<button><T>menus.download</T></button>
						</div>
					</HowtoStep>
				</li>
				<li>
					<HowtoStep k={1}>
						<img className="logo--header__picture" src="/images/logo-animated.gif" />
						<div>
							<h3>2. <T>howto.step.1.title</T></h3>
							<p><T>howto.step.1.desc</T></p>
						</div>
					</HowtoStep>
				</li>
				<li>
					<HowtoStep k={2}>
						<img className="logo--header__picture" src="/images/logo-animated.gif" />
						<div>
							<h3>3. <T>howto.step.2.title</T></h3>
							<p><T>howto.step.2.desc</T></p>
						</div>
					</HowtoStep>
				</li>
				<li>
					<HowtoStep k={3}>
						<img className="logo--header__picture" src="/images/logo-animated.gif" />
						<div>
							<h3>4. <T>howto.step.3.title</T></h3>
							<p>
								<T>howto.step.3.desc</T>
							</p>
							<a href={FlowRouter.path("souvenir")}>
								<T>menus.souvenir</T>
							</a>
						</div>
					</HowtoStep>
				</li>
			</ul>
		);
	}
}