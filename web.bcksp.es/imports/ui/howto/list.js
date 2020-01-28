/*----------------------------------------*\
  bcksp.es - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:56:40
  @Last Modified time: 2020-01-28 21:57:57
\*----------------------------------------*/



import React from 'react';
import HowtoStep from './step.js';
import HowtoBadge from './badge.js';
import { installExtension } from "./../../utilities/ui.js";

// App component - represents the whole app
const HowtoList = ({}) => {
	const T = i18n.createComponent("howto");
	const T2 = i18n.createComponent("menus");

	return (
		<div className="container">
			<ul id="howto" className="howto">
				<li className="howto__item">
					<HowtoStep k={0}>
						<HowtoBadge url="/images/download.light.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">1.</span> <T>step.download.title</T></h3>
							<div className="step__content">
								<p><T>step.download.desc</T></p>
								<button onClick={installExtension} className="button button--primary"><T2>download</T2></button>
							</div>
						</div>
					</HowtoStep>
				</li>
				<li className="howto__item">
					<HowtoStep k={1}>
						<HowtoBadge url="/images/login.3.light.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">2.</span> <T>step.connect.title</T></h3>
							<div className="step__content">
								<p><T>step.connect.desc</T></p>
							</div>
						</div>
					</HowtoStep>
				</li>

				<li className="howto__item">
					<HowtoStep k={2}>
						<HowtoBadge url="/images/bcksp.es.gif"/>
						<div className="step__content">
							<h3 className="step__title"><span className="step__number">3.</span> <T>step.continue.title</T></h3>
							<div className="step__content">
								<p><T>step.continue.desc</T></p>
							</div>
						</div>
					</HowtoStep>
				</li>
				<li className="howto__item">
					<HowtoStep k={3}>
						<HowtoBadge url="/images/backsapce.2.light.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">4.</span> <T>step.souvenir.title</T></h3>
							<div className="step__content">
								<p><T>step.souvenir.desc</T></p>
								<a href={FlowRouter.path("souvenir")} ><T2>souvenir</T2></a>
							</div>
						</div>
					</HowtoStep>
				</li>
			</ul>
		</div>
	);
}

export default HowtoList;