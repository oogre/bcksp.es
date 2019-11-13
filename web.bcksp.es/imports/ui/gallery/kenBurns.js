/*----------------------------------------*\
  bcksp.es - kenBurns.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:24:50
  @Last Modified time: 2019-11-13 18:16:31
\*----------------------------------------*/
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
	getRandomID(){
		return randomCeil(this.props.idmin, this.props.idmax);
	}
	
	loaded(event){
		var kenBurns = new KenBurnsDOM(ReactDom.findDOMNode(this.refs.KenBurnsParent));
		let oZoom = this.props.zoom;
		let oPos = [this.props.pos.x, this.props.pos.y];
		let dZoom = randomAround(oZoom, this.props.zoomDivergeance);
		let dPos = [randomAround(oPos[0], this.props.posDivergeance), randomAround(oPos[1], this.props.posDivergeance)];
		kenBurns.animate(
			ReactDom.findDOMNode(this.refs.KenBurnsImg),
			rectCrop(oZoom, oPos),
			rectCrop(dZoom, dPos),
			this.props.timer,
			bezierEasing(0, 0, 1, 1)
		);
		Meteor.setTimeout(()=>{
			this.setState({
				'imageID' : this.getRandomID()
			})
		}, this.props.timer);
	}
	getImageURI(id){
		return this.props.samplePath.replace("[ID]", id)
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
