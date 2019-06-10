/*----------------------------------------*\
  bcksp.es - MyToggleButton.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-26 13:38:23
  @Last Modified time: 2019-04-18 17:43:14
\*----------------------------------------*/
import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button'

// App component - represents the whole app
class ThumbIcon extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<span style={{
				    width: "100%",
					textAlign: 'center',
					textTransform: 'uppercase',
					paddingTop: '4px'
			}}>
				{this.props.value ? this.props.label[1] : this.props.label[0]}
			</span>
		);
	}
}

class LabelIcon extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<span style={{
				width: "100%",
				display: "block",
				textAlign: "center",
				textTransform: "uppercase",
				paddingTop: "6px"
			}}>
				{this.props.value}
			</span>
		);
	}
}

export default class MyToggleButton extends Component {
	constructor(props){
		super(props);
	}
	render() {
		let activeLabel = this.props.activeLabel || "whitelisted";
		let inactiveLabel = this.props.inactiveLabel || "blacklisted";
		return (
			<form className="wrapper__toggle-button">
				<ToggleButton
					value={this.props.value}
					onToggle={this.props.onToggle.bind(this)}
					activeLabel={ <LabelIcon value={activeLabel}/> }
					inactiveLabel={ <LabelIcon value={inactiveLabel}/> }
					thumbIcon={ <ThumbIcon value={this.props.value} label={[activeLabel, inactiveLabel]}/> }
					thumbAnimateRange={[3, 125]}
					colors={{
						activeThumb: {
							base: '#e9000f',
							hover: '#e9000f',
	    				},
	    				inactiveThumb: {
	      					base: '#14c402',
	      					hover: '#14c402',
	    				},
						inactive: {
							base: '#ffffff',
							hover: '#ffffff',
						},
						active: {
							base: '#ffffff',
							hover: '#ffffff',
						}
					}}
					containerStyle={{
						width: '250px',
						height: '40px',
					}}
					thumbStyle={{ 
						borderRadius: "1px",
						color : "#ffffff",
						border : "none",
						boxShadow : "none",
						width: '122px',
						height: '34px',
					}}
					trackStyle={{ 
						borderRadius: "1px",
						border : "solid 1px black",
						background : "white",
						width: '250px',
	  					height: '40px',
					 }}
					trackStyleHover={{
						borderRadius: "1px",
						border : "solid 1px black",
						backgroundColor : "white"
					}}
					activeLabelStyle={{
						color : "#000000",
						fontSize: "inherit",
						fontFamily:"inherit",
						position: "inherit",
						marginTop:0,
						marginBottom:0,
						lineHeight: "inherit",
						opacity: "1",
						display: "inline-block",
						width: "50%",
						height: "100%"
					}}
					inactiveLabelStyle={{
						color : "#000000",
						fontSize: "inherit",
						fontFamily:"inherit",
						position: "inherit",
						marginTop:0,
						marginBottom:0,
						lineHeight: "inherit",
						opacity: "1",
						display: "inline-block",
						width: "50%",
						height: "100%"
					}}
				/>
			</form>
		);
	}
}