/*----------------------------------------*\
  bitRepublic - wait.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 00:30:58
  @Last Modified time: 2019-01-04 17:32:05
\*----------------------------------------*/
import React, { Component } from 'react';
// App component - represents the whole app
export default class FixeWait extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="container" style={{textAlign: "center"}}>
				<img src="/images/loader.old.gif" />
			</div>
		);
	}
}
