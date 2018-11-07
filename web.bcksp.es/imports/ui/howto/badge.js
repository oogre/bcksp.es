/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-31 15:37:49
  @Last Modified time: 2018-10-31 15:41:23
\*----------------------------------------*/
import React, { Component } from 'react';

// App component - represents the whole app
export default class HowtoBadge extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="logo--header__picture" style={{
				backgroundImage : "url('"+this.props.url+"')",
				display: "block",
				width: "150px",
				height: "150px",
				backgroundSize: "contain",
				backgroundPosition: "50% 50%",
				backgroundRepeat: "no-repeat",
				borderRadius: "75px",
				border: "solid 1px #aaa",
				boxShadow: "0 0 10px #ccc"
			}}></div>
		)
	}
}