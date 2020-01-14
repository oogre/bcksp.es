/*----------------------------------------*\
  bcksp.es - wrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-12 21:36:19
  @Last Modified time: 2020-01-13 15:25:59
\*----------------------------------------*/


import T from './../../i18n/index.js';
import React, { useState } from 'react';
import Tooltip from './../shared/tooltip.js';
import Dropdown from './../shared/dropdown.js';
import { withTracker } from 'meteor/react-meteor-data';
import PrivateArchiveWrapper from './privateArchiveWrapper.js';
import PublicArchiveWrapper from './publicArchiveWrapper.js';

const ArchiveWrapper = ({fullscreen, isConnected, type}) => {
	const [flux, setFlux] = useState("public");
	let other = flux == "public" ? "private" : "public";
	let isPublic = flux == "public";
	return (
		<div className={ `livestream-container ${(type ? " livestream-container--" + type : "")} ${(fullScreen ? " fullscreen" : "")} ${(isConnected ? " livestream-container--connected" : "")}` }>
			<div className={ `livestream ${(type ? "livestream--" + type : "") }` }>
				<div className="livestream__content">
					<Dropdown active={isConnected} className="dropdown--livestream" label={i18n.__("archive."+flux+".button")} data-tip data-for="dropdown-tooltip">
						<ul className="dropdown__list">
							<li className="dropdown__list-item">
								<button className="dropdown__list-button" onClick={()=>setFlux(other)}>
									<span className="dropdown__list-button-label">
										<T>{"archive."+other+".button"}</T>
									</span>
								</button>
							</li>
						</ul>
					</Dropdown>
					{
						isPublic && <PublicArchiveWrapper/> 
					}
					{
						!isPublic && isConnected && <PrivateArchiveWrapper/>
					}
				</div>

				<div className="livestream__border-decoration-container" aria-hidden="true">
					<div className="livestream__border-decoration"></div>
					<div className="livestream__border-decoration"></div>
					<div className="livestream__border-decoration"></div>
					<div className="livestream__border-decoration"></div>
				</div>

			</div>
			<Tooltip id="dropdown-tooltip">
				<T>{"archive."+flux+".tooltip"}</T>
			</Tooltip>
		</div>
	);
}

export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
	};
})(ArchiveWrapper);
