/*----------------------------------------*\
  bcksp.es - wrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-12 21:36:19
  @Last Modified time: 2020-03-03 15:29:55
\*----------------------------------------*/

import React from 'react';
import LiveFrame from './LiveFrame.js';
import Tooltip from './../shared/tooltip.js';
import Dropdown from './../shared/dropdown.js';
import { withTracker } from 'meteor/react-meteor-data';
import PrivateArchiveWrapper from './privateArchiveWrapper.js';
import PublicArchiveWrapper from './publicArchiveWrapper.js';
import { Archives } from './../../api/archives/archives.js';
import { getTranslations } from "./../../i18n/index.js";

const ArchiveWrapper = ({ isConnected, type, ...other }) => {
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("archive");
	const [flux, setFlux] = React.useState(Archives.Type.PUBLIC);
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
	React.useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 
	

	return (
		<div className={ `livestream-container ${(type ? " livestream-container--" + type : "")} ${(fullScreen ? " fullscreen" : "")} ${(isConnected ? " livestream-container--connected" : "")}` }>
			<div className={ `livestream ${(type ? "livestream--" + type : "") }` }>
				<div className="livestream__content">
					<Dropdown active={isConnected} className="dropdown--livestream" label={T(fluxName+".button")} data-tip data-for="dropdown-tooltip">
						<ul className="dropdown__list">
							<li className="dropdown__list-item">
								<button className="dropdown__list-button" onClick={switchFlux}>
									<span className="dropdown__list-button-label">
										<C>{otherFluxName+".button"}</C>
									</span>
								</button>
							</li>
						</ul>
					</Dropdown>
					{
						flux == Archives.Type.PUBLIC && 
							<PublicArchiveWrapper {...other} Renderer={LiveFrame}/> 
					}
					{
						flux == Archives.Type.PRIVATE && isConnected && 
							<PrivateArchiveWrapper {...other} Renderer={LiveFrame}/> 
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
				<C>{fluxName+".tooltip"}</C>
			</Tooltip>
		</div>
	);
	
}

export default withTracker(self => {
	return {
		isConnected : !!Meteor.userId(),
	};
})(ArchiveWrapper);
