/*----------------------------------------*\
  bcksp.es - footer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:15:55
  @Last Modified time: 2018-09-13 19:25:34
\*----------------------------------------*/
import React, { Component } from 'react';

//import { FacebookIcon, TwitterIcon } from 'react-share';

export default class MenuFooter extends Component {
	constructor(props){
		super(props);
	}

	render() {
			return (
			<footer className="main-footer">
				<div className="container">
					<nav className="main-footer__nav">
						<div className="column">
							<div className="column__content">
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("about")}>about</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("contact")}>contact</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("authors")}>authors</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("download")}>download</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("signup")}>signup</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="column">
							<div className="column__content">
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("about")}>facebook</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("contact")}>twitter</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="column">
							<div className="column__content">
								<p className="menu--footer__title">Supported by</p>
								<ul className="buttons-list buttons-list--footer">
									<li className="buttons-list__item buttons-list__item--fsoa">
										<a className="buttons-list__link--fsoa" target="_blank" href="http://www.kunstenenerfgoed.be/">
											fwb
										</a>
									</li>
									<li className="buttons-list__item">
										<a className="buttons-list__link buttons-list__link" target="_blank" href="http://www.vgc.be/ondersteuning/subsidies/cultuur/subsidies-kunsten">
											want to help us?
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</footer>
		);
	}
}
