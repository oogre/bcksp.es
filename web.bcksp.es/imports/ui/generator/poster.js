/*----------------------------------------*\
  bcksp.es - poster.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-10 15:11:10
  @Last Modified time: 2019-03-03 14:09:17
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { lerp } from "./../../utilities/math.js";

export default class GeneratorPoster extends Component {
	constructor(props){
		super(props);
		let width = 210 * 2;
		let height = 297 * 2;
		this.state = {
			width,
			height,
			shapes : this.createShapes(width, height)
		};	
	}
	createShapes(width, height){
		return (new Array(10)).fill(0).map((e, k)=>{
			let sw = Math.random();
			let sx = Math.random();
			let sy = Math.random();
			let sz = Math.random();
			return {
				key : k,
				x : width * sx,
				y : height * sy,
				width : width * sx * sw,
				height : height * sy * sz,
				color : "#"+ Math.floor(sx * sy * 16777215).toString(16),
				rotate : 180 * sx * sy
			}
		});
	}
	genAnother(event){
		event.preventDefault();
		this.setState({
			shapes : this.createShapes(this.state.width, this.state.height)
		});
		return false;
	}
	render(){
		let ratio = this.props.sentence.length / 200;
		let size = lerp(100, 20, Math.pow(ratio, 0.35));
		return (
			<div>
				<button onClick={this.genAnother.bind(this)}>another</button>
				<div 
					data-design-poster={JSON.stringify({
						fontSize : size,
						lineHeight : size,
						shapes : this.state.shapes,
						sentence : this.props.sentence 
					})}
					style={{
						position:"relative",
						width : this.state.width,
						height : this.state.height,
						boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
						overflow : "hidden"
					}}
				>
					<svg width="100%" height="100%">
						{
							this.state.shapes.map(shape=>(
								 <rect 
								 	key={shape.key}
								 	width={shape.width} 
								 	height={shape.height}
								 	fill={shape.color}
								 	transform={"translate("+(shape.x + shape.width * 0.5)+", "+(shape.y + shape.height * 0.5)+") rotate("+shape.rotate+" 0 0)"}
								 />
							))
						}
					</svg>
					<div 
						style={{
							position: "absolute",
						    width: "71%",
						    top: "28%",
						    left: "50%",
						    transform: "translate(-50%, -50%)",
						    fontSize: size+"px", 
						    lineHeight: size+"px",
						    textAlign: "center",
						    overflowWrap: "break-word",
						}}
					>
						<div style={{textAlign: "left"}}>«</div>
						{this.props.sentence}
						<div style={{textAlign: "right"}}>»</div>
					</div>
					<div
						style={{
							position: "absolute",
						    width: "71%",
						    bottom: "1%",
						    right: "1%",
						    fontSize: "8px",
						    lineHeight: "8px",
						    textAlign: "right",
						    overflowWrap: "break-word",
						}}
					>
						<T>souvenir.item.poster.text</T>
					</div>
				</div>
			</div>
		);
	}
}