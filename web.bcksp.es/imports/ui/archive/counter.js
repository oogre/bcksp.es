/*----------------------------------------*\
  bcksp.es - counter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-25 22:28:53
  @Last Modified time: 2019-05-05 16:14:28
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { Component } from 'react';
import Tooltip from './../shared/tooltip.js';
import { lerp, nf } from './../../utilities/math.js';
import { config } from './../../startup/config.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';

class ArchiveCounter extends Component {
	constructor(props){
		super(props);
	}
	getCharCount(){
		if(!this.props.archive || !this.props.isReady)return 0 ;
		return this.props.archive.count;
	}
	getPerCent(){
		if(!this.props.archive || !this.props.isReady)return 0;
		return (this.getCharCount() / config.book.getMaxChar()) * 100 ;
	}
	getJaugeTooltipText(){
		let jaugeTextAbailable = i18n.__("archive.jauge.tooltip.custom");
		let r = this.getCharCount() / config.book.getMaxChar();
		let id = Math.floor(lerp(0, jaugeTextAbailable.length-1, r));
		return (
			<span>
				<strong>
					<T>{"archive.jauge.tooltip.custom."+id}</T>
				</strong>
				<br/>
				<T 	current={nf(this.getCharCount())} 
					target={nf(config.book.getMaxChar())}
				>
					archive.jauge.tooltip.default
				</T>
			</span>
		);
	}
	render() {
		return (
			<div className="counter">
				<span className="counter__total-character">
					<T count={nf(this.getCharCount())}>archive.counter</T>
				</span>
				<span className="counter__total-percentage">
					{
						((this.getPerCent()).toFixed(2)).split(".").shift()
					}
					<span className="counter__total-percentage-float">
					{
						"."+((this.getPerCent()).toFixed(2)).split(".").pop()
					}
					</span>
					%
				</span>
				<svg width="100%" height="24px" data-tip data-for="counter-tooltip">
					<rect rx="3" ry="3" x="0" y="0" width="100%" height="100%" fill={"#D8D8D8"} />
					<rect rx="3" ry="3" x="0" y="0" width={this.getPerCent()+"%"} height="100%" fill={"#fff123"} />
				</svg>
				<Tooltip id="counter-tooltip">
					{ this.getJaugeTooltipText() }
				</Tooltip>
			</div>
		)
	}
}

export default withTracker(self => {
	let handle = Meteor.userId() && Meteor.subscribe('archive.private.counter');
	return {
		isReady : 	handle && handle.ready() && Meteor.userId(),
		archive : 	Archives.findOne({
						type : config.archives.private.type
					})
	};
})(ArchiveCounter);



