/*----------------------------------------*\
  bcksp.es - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:56:40
  @Last Modified time: 2020-03-04 18:45:37
\*----------------------------------------*/



import React from 'react';
import HowtoStep from './step.js';
import HowtoBadge from './badge.js';
import { getTranslations } from "./../../i18n/index.js";
import { installExtension } from "./../../utilities/ui.js";

// App component - represents the whole app
const HowtoList = ({}) => {
	const {C, C1} = getTranslations("howto", "menus");
	return (
		<div className="container">
			<ul id="howto" className="howto">
				<li className="howto__item">
					<HowtoStep k={0}>
						<HowtoBadge url="/images/download.light.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">1.</span> <C>step.download.title</C></h3>
							<div className="step__content">
								<p><C>step.download.desc</C></p>
								<button onClick={installExtension} className="button button--primary"><C1>download</C1></button>
							</div>
						</div>
					</HowtoStep>
				</li>
				<li className="howto__item">
					<HowtoStep k={1}>
						<HowtoBadge url="/images/login.3.light.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">2.</span> <C>step.connect.title</C></h3>
							<div className="step__content">
								<p><C>step.connect.desc</C></p>
							</div>
						</div>
					</HowtoStep>
				</li>

				<li className="howto__item">
					<HowtoStep k={2}>
						<HowtoBadge url="/images/bcksp.es.gif"/>
						<div className="step__content">
							<h3 className="step__title"><span className="step__number">3.</span> <C>step.continue.title</C></h3>
							<div className="step__content">
								<p><C>step.continue.desc</C></p>
							</div>
						</div>
					</HowtoStep>
				</li>
				<li className="howto__item">
					<HowtoStep k={3}>
						<HowtoBadge url="/images/backsapce.2.light.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">4.</span> <C>step.souvenir.title</C></h3>
							<div className="step__content">
								<p><C>step.souvenir.desc</C></p>
							</div>
						</div>
					</HowtoStep>
				</li>
			</ul>
		</div>
	);
}

export default HowtoList;