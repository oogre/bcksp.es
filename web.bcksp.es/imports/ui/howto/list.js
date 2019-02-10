/*----------------------------------------*\
  bcksp.es - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:56:40
  @Last Modified time: 2019-01-17 08:11:10
\*----------------------------------------*/



import HowtoStep from './step.js';
import HowtoBadge from './badge.js';
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { installExtension } from "./../../utilities/ui.js";

// App component - represents the whole app
export default class HowtoList extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
		<div className="container">
			<ul className="howto">
				<li className="howto__item">
					<HowtoStep k={0}>
						<HowtoBadge url="/images/logo-animated.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">1.</span> <T>howto.step.download.title</T></h3>
							<div className="step__content">
								<p><T>howto.step.download.desc</T></p>
								<button onClick={installExtension} className="button button--primary"><T>menus.download</T></button>
							</div>
						</div>
					</HowtoStep>
				</li>
				<li className="howto__item">
					<HowtoStep k={1}>
						<HowtoBadge url="/images/logo-animated.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">2.</span> <T>howto.step.connect.title</T></h3>
							<div className="step__content">
								<p><T>howto.step.connect.desc</T></p>
							</div>
						</div>
					</HowtoStep>
				</li>
				
				<li className="howto__item">
					<HowtoStep k={2}>
						<HowtoBadge url="/images/logo-animated.gif"/>
						<div className="step__content">
							<h3 className="step__title"><span className="step__number">3.</span> <T>howto.step.continue.title</T></h3>
							<div className="step__content">
								<p><T>howto.step.continue.desc</T></p>
							</div>
						</div>
					</HowtoStep>
				</li>
				<li className="howto__item">
					<HowtoStep k={3}>
						<HowtoBadge url="/images/logo-animated.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">4.</span> <T>howto.step.souvenir.title</T></h3>
							<div className="step__content">
								<p><T>howto.step.souvenir.desc</T></p>
								<a href={FlowRouter.path("souvenir")} ><T>menus.souvenir</T></a>
							</div>
						</div>
					</HowtoStep>
				</li>
			</ul>
		</div>
		);
	}
}
