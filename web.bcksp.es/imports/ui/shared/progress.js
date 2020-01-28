/*----------------------------------------*\
  bcksp.es - progress.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-04 06:26:10
  @Last Modified time: 2020-01-28 23:44:43
\*----------------------------------------*/
import React from 'react';

// App component - represents the whole app
const Progress = ({percent, diameter, colorBg, colorFg, thickness, thicknessRatio, children}) => {
	const step = 0.01;
	const TWO_PI =  Math.PI * 2;
	const HALF_PI = Math.PI * 0.5;
	
	const width = diameter;
	const angle = percent * TWO_PI;
	const offset = width * 0.5;

	let pointsBg = [];
	const thicknessBg = thickness * thicknessRatio;
	const radiusBg = (width - thicknessBg) * 0.5;
	
	let pointsFg = [];
	const thicknessFg = thickness;
	const radiusFg = (width - thicknessFg) * 0.5;
	

	for(let a = TWO_PI ; a >= angle - step ; a -= step){
		const x = offset + radiusBg * Math.cos(a-HALF_PI);
		const y = offset + radiusBg * Math.sin(a-HALF_PI);
		pointsBg.push(x+","+y);	
	}
	
	for(let a = 0 ; a <= angle ; a += step){
		const x = offset + radiusFg * Math.cos(a-HALF_PI);
		const y = offset + radiusFg * Math.sin(a-HALF_PI);
		pointsFg.push(x+","+y);
	}
	
	return(
		<div style={{
			width:width,
			height:width,
			position:"relative"
		}}>
			<span style={{
				fontFamily: "GT Pressura Mono Trial, monospace",
				top: "33%",
				left: "33%",
				position: "absolute",
				padding: 5,
				fontSize: "1.3em",
				transform: "translate(-50%, 0)",
				backgroundColor:colorFg,
				color:colorBg
			}}>{(percent * 100).toFixed(2)}%</span>
    		<svg width={width} height={width}>
				<polyline points={pointsBg.join(" ")}
					fill="none" stroke={colorBg} strokeWidth={thicknessBg}/>
				<polyline points={pointsFg.join(" ")}
					fill="none" stroke={colorFg} strokeWidth={thicknessFg}/>
			</svg>
			{
				React.Children.map(children, child =>
					React.cloneElement(child, {
						style: {
							top: 1,
							left: 1,
			    			zIndex: -1,
							position: "absolute",
							maxWidth: "calc(100% - 2px)",
							height: "calc(100% - 2px)",
							borderRadius: "50%"
						}
					})
				)
			}
		</div>
	);	
}

export default Progress;