/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-31 15:37:49
  @Last Modified time: 2019-02-26 15:32:31
\*----------------------------------------*/
import React, { Component } from 'react';

// App component - represents the whole app
export default class HowtoBadge extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="howto__item-picture" style={{
				backgroundImage : "url('"+this.props.url+"')",
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
}