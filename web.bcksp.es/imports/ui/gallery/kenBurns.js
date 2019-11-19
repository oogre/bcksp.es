/*----------------------------------------*\
  bcksp.es - kenBurns.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:24:50
  @Last Modified time: 2019-11-19 19:19:31
\*----------------------------------------*/
import raf from 'raf';//requestAnimationFrame
import ReactDom from 'react-dom';
import rectCrop from "rect-crop";
import bezierEasing from "bezier-easing";
import React, { Component } from 'react';
import KenBurnsDOM from "kenburns/lib/DOM";
import { lerp, random, randomCeil, randomAround } from "./../../utilities/math.js";

var defaultOptions = {
	
};

export default class GalleryKenBurns extends Component {
	static defaultProps = {
		samplePath:"",
		style: {width:256, height :256, borderRadius: "50%"},
		idmin: 0,
		idmax: 100,
		timer: 10000,
		zoom: 0.5,
		zoomDivergeance: 0.1,
		pos: {x:0.33, y:0.33},
		posDivergeance: 0.1
	}
	constructor(props){
		super(props);
		this.state = {
			'imageID' : this.getRandomID()
		};
	}
	componentDidMount(){
		this.isPlaying = true;
		this.kenBurns = new KenBurnsDOM(ReactDom.findDOMNode(this.refs.KenBurnsParent));
	}
	componentWillUnmount(){
		this.isPlaying = false;
	}
	animate(source, fromCrop, toCrop, duration){
		return new Promise((resolve, reject) => {
				let start;
				const render = (now: number) => {
					if(!this.isPlaying)return resolve(this.isPlaying);
					if (!start) start = now;
					var p = Math.min((now - start) / duration, 1);
					if (p < 1) {
			  			raf(render);
					} else {
						return resolve(this.isPlaying);
					}
					this.kenBurns.animateStep(source, fromCrop, toCrop, p);
				};
				raf(render);
			});
	}

	loaded(event){
		let oZoom = this.props.zoom;
		let oPos = [this.props.pos.x, this.props.pos.y];
		let dZoom = randomAround(oZoom, this.props.zoomDivergeance);
		let dPos = [randomAround(oPos[0], this.props.posDivergeance), randomAround(oPos[1], this.props.posDivergeance)];
		this.animate(
			ReactDom.findDOMNode(this.refs.KenBurnsImg),
			rectCrop(oZoom, oPos),
			rectCrop(dZoom, dPos),
			this.props.timer
		).then(hasToLoadAnotherOne=>{
			if(hasToLoadAnotherOne){
				this.setState({
					'imageID' : this.getRandomID()
				})	
			}
		});
	}
	getImageURI(id){
		return this.props.samplePath.replace("[ID]", id)
	}
	getRandomID(){
		return randomCeil(this.props.idmin, this.props.idmax);
	}
	render() {
		return (
			<div className="container" ref="KenBurnsParent" style={this.props.style}>
				<img  
					ref="KenBurnsImg" 
					onLoad={this.loaded.bind(this)} 
					src={this.getImageURI(this.state.imageID)}
				/>
			</div>
		);
	}
}
