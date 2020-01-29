/*----------------------------------------*\
  bcksp.es - tooltip.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-05-05 13:07:57
  @Last Modified time: 2020-01-28 22:32:30
\*----------------------------------------*/
import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({id, children}) => {
	return (
		<ReactTooltip id={id} className="tooltip" type="dark" delayShow={250} effect="solid">
			{ children }
		</ReactTooltip>
	);
}

export default Tooltip;