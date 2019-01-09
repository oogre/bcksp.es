/*----------------------------------------*\
  bcksp.es - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:56:40
  @Last Modified time: 2019-01-09 19:53:56
\*----------------------------------------*/



import HowtoStep from './step.js';
import HowtoBadge from './badge.js';
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { installExtension, isExtensionInstalled } from "./../../utilities/ui.js";

// App component - represents the whole app
class HowtoList extends Component {
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
							<h3 className="step__title"><span className="step__number">1.</span> <T>howto.step.0.title</T></h3>
							<div className="step__content">
								<p><T>howto.step.0.desc</T></p>
								<button onClick={installExtension} className="button button--primary"><T>menus.download</T></button>
							</div>
						</div>
					</HowtoStep>
				</li>
				<li className="howto__item">
					<HowtoStep k={1}>
						<HowtoBadge url="/images/logo-animated.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">2.</span> <T>howto.step.1.title</T></h3>
							<div className="step__content">
								<p><T>howto.step.1.desc</T></p>
							</div>
						</div>
					</HowtoStep>
				</li>
				
				<li className="howto__item">
					<HowtoStep k={2}>
						<HowtoBadge url="/images/logo-animated.gif"/>
						<div className="step__content">
							<h3 className="step__title"><span className="step__number">3.</span> <T>howto.step.2.title</T></h3>
							<div className="step__content">
								<p><T>howto.step.2.desc</T></p>
							</div>
						</div>
					</HowtoStep>
				</li>
				<li className="howto__item">
					<HowtoStep k={3}>
						<HowtoBadge url="/images/logo-animated.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">4.</span> <T>howto.step.3.title</T></h3>
							<div className="step__content">
								<p>
									<T>howto.step.3.desc</T>
								</p>
							</div>
						</div>
					</HowtoStep>
				</li>
				<li className="howto__item">
					<HowtoStep k={4}>
						<HowtoBadge url="/images/logo-animated.gif"/>
						<div>
							<h3 className="step__title"><span className="step__number">5.</span> <T>howto.step.4.title</T></h3>
							<div className="step__content">
								<p>
									<T>howto.step.4.desc</T>
								</p>
								<a href={FlowRouter.path("souvenir")}>
									<T>menus.souvenir</T>
								</a>
							</div>
						</div>
					</HowtoStep>
				</li>
			</ul>
		</div>
		);
	}
}
export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
		extensionInstalled : Session.get("extensionInstalled")
	};
})(HowtoList);
