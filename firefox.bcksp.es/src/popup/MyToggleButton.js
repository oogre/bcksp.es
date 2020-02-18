/*----------------------------------------*\
  bcksp.es - MyToggleButton.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-26 13:38:23
  @Last Modified time: 2020-02-18 13:59:36
\*----------------------------------------*/
import React from 'react';
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
			{ value ? label[1] : label[0] }
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

const MyToggleButton = ({onToggle, value, activeLabel="whitelisted", inactiveLabel="blacklisted"}) => {
	return (
		<form className="wrapper__toggle-button">
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

export default MyToggleButton;