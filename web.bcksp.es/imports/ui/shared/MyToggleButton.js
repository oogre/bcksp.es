/*----------------------------------------*\
  bcksp.es - MyToggleButton.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-26 13:38:23
  @Last Modified time: 2020-01-19 22:16:16
\*----------------------------------------*/
import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button'

// App component - represents the whole app
const ThumbIcon = ({value, label}) => {
	return (
		<span style={{
			    width: "100%",
				textAlign: 'center',
				textTransform: 'uppercase',
				paddingTop: '4px'
		}}>
			{value ? label[1] : label[0]}
		</span>
	);
}

const LabelIcon = ({value}) => {
	return (
		<span style={{
			width: "100%",
			display: "block",
			textAlign: "center",
			textTransform: "uppercase",
			paddingTop: "6px"
		}}>
			{value}
		</span>
	);
}

const MyToggleButton = ({value, activeLabel, inactiveLabel, onToggle, error }) => {
	activeLabel = activeLabel || "whitelisted";
	inactiveLabel = inactiveLabel || "blacklisted";
	return (
		<form className={"wrapper__toggle-button " + ( error?"input-error":"") }>
			<ToggleButton
				value={value}
				onToggle={onToggle}
				activeLabel={ <LabelIcon value={activeLabel}/> }
				inactiveLabel={ <LabelIcon value={inactiveLabel}/> }
				thumbIcon={ <ThumbIcon value={value} label={[activeLabel, inactiveLabel]}/> }
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
					background : "white",
					width: '250px',
  					height: '40px',
				 }}
				trackStyleHover={{
					borderRadius: "1px",
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

export default MyToggleButton;