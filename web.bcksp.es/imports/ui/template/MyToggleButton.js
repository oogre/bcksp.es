/*----------------------------------------*\
  bcksp.es - MyToggleButton.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-26 13:38:23
  @Last Modified time: 2018-11-26 13:55:01
\*----------------------------------------*/
import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button'

// App component - represents the whole app
export default class MyToggleButton extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<ToggleButton
				colors={{
					inactive: {
						base: 'rgb(128, 128, 128)',
						hover: 'rgb(150,150,150)',
					},
					active: {
						base: 'rgb(0, 0, 0)',
						hover: 'rgb(50,50,50)',
					}
				}}
				activeLabel="black"
				inactiveLabel="white"
				value={this.props.value}
				thumbStyle={{ borderRadius: 2 }}
				trackStyle={{ borderRadius: 2 }}
				onToggle={this.props.onToggle.bind(this)} />
		);
	}
}