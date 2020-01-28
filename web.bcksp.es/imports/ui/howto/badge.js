/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-31 15:37:49
  @Last Modified time: 2020-01-28 21:54:51
\*----------------------------------------*/
import React from 'react';

// App component - represents the whole app
const HowtoBadge = ({url}) => {
	return (
		<div className="howto__item-picture" style={{
			backgroundImage : "url('"+url+"')",
			display: "block",
			width: "256px",
			height: "256px",
			backgroundSize: "contain",
			backgroundPosition: "50% 50%",
			backgroundRepeat: "no-repeat",
			borderRadius: "50%",
			//border: "solid 1px #aaa",
			boxShadow: "rgba(35, 30, 32, 0.2) 0px 0px 50px"
		}}></div>
	)
}

export default HowtoBadge;