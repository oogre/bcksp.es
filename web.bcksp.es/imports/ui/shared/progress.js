/*----------------------------------------*\
  bcksp.es - progress.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-04 06:26:10
  @Last Modified time: 2019-03-27 15:32:23
\*----------------------------------------*/
import React, { Component } from 'react';

// App component - represents the whole app
export default class Progress extends Component {
	constructor(props){
		super(props);
	}
	componentDidUpdate() {
		//this.update();
	}
	componentDidMount(){
		//this.update();
	}
	update(){
		var percent = parseInt(this.props.percent);
		var deg = 360*percent/100 ;
		var element = document.querySelector(".ppc-progress-fill");
		element.style.transform = 'rotate(-'+ deg +'deg)';
  	}
  	render() {
		let step = 0.01;
		let twoPi =  Math.PI * 2;
    	let halfPi =  Math.PI * 0.5;
		let width = this.props.diameter;
		let angle = this.props.percent * twoPi;
		let offset = width * 0.5;

		let pointsBg = [];
		let colorBg = this.props.colorBg;
		let thicknessBg = this.props.thickness * this.props.thicknessRatio;
		let radiusBg = (width - thicknessBg) * 0.5;
		for(let a = twoPi ; a >= angle - step ; a -= step){
			let x = offset + radiusBg * Math.cos(a-halfPi);
			let y = offset + radiusBg * Math.sin(a-halfPi);
			pointsBg.push(x+","+y);	
		}
		
		let pointsFg = [];
		let colorFg = this.props.colorFg;
		let thicknessFg = this.props.thickness;
		let radiusFg = (width - thicknessFg) * 0.5;
		for(let a = 0 ; a <= angle ; a += step){
			let x = offset + radiusFg * Math.cos(a-halfPi);
			let y = offset + radiusFg * Math.sin(a-halfPi);
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
    			}}>{(this.props.percent * 100).toFixed(2)}%</span>
	    		<svg width={width} height={width}>
					<polyline points={pointsBg.join(" ")}
						fill="none" stroke={colorBg} strokeWidth={thicknessBg}/>
					<polyline points={pointsFg.join(" ")}
						fill="none" stroke={colorFg} strokeWidth={thicknessFg}/>
				</svg>
				{
					React.Children.map(this.props.children, child =>
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
}
