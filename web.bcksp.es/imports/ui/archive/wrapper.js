/*----------------------------------------*\
  bcksp.es - wrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-12 21:36:19
  @Last Modified time: 2020-01-31 12:38:18
\*----------------------------------------*/


import React, { useEffect, useState } from 'react';
import Tooltip from './../shared/tooltip.js';
import Dropdown from './../shared/dropdown.js';
import { withTracker } from 'meteor/react-meteor-data';
import PrivateArchiveWrapper from './privateArchiveWrapper.js';
import PublicArchiveWrapper from './publicArchiveWrapper.js';
import { Archives } from './../../api/archives/archives.js';

const ArchiveWrapper = ({ isConnected, type, ...other }) => {
	const [ locale, setLocale ] = useState(i18n.getLocale());
	const [flux, setFlux] = useState(Archives.Type.PUBLIC);
	const fluxName = Archives.Type.getName(flux);
	const otherFluxName = Archives.Type.getName(1-flux);
	const fullScreen = FlowRouter.getRouteName() == "livefeed";

	const switchFlux = event => {
		event.preventDefault();
		if(flux == Archives.Type.PRIVATE){
			setFlux(Archives.Type.PUBLIC)
		}else if(isConnected && flux == Archives.Type.PUBLIC){
			setFlux(Archives.Type.PRIVATE)
		}
		return false;
	}

	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 
	const T2 = i18n.createTranslator("archive");
	const T = i18n.createComponent(T2);
	

	return (
		<div className={ `livestream-container ${(type ? " livestream-container--" + type : "")} ${(fullScreen ? " fullscreen" : "")} ${(isConnected ? " livestream-container--connected" : "")}` }>
			<div className={ `livestream ${(type ? "livestream--" + type : "") }` }>
				<div className="livestream__content">
					<Dropdown active={isConnected} className="dropdown--livestream" label={T2(fluxName+".button")} data-tip data-for="dropdown-tooltip">
						<ul className="dropdown__list">
							<li className="dropdown__list-item">
								<button className="dropdown__list-button" onClick={switchFlux}>
									<span className="dropdown__list-button-label">
										<T>{otherFluxName+".button"}</T>
									</span>
								</button>
							</li>
						</ul>
					</Dropdown>
					{
						flux == Archives.Type.PUBLIC && 
							<PublicArchiveWrapper {...other} /> 
					}
					{
						flux == Archives.Type.PRIVATE && isConnected && 
							<PrivateArchiveWrapper {...other} /> 
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
				<T>{fluxName+".tooltip"}</T>
			</Tooltip>
		</div>
	);
	
}

export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
	};
})(ArchiveWrapper);
