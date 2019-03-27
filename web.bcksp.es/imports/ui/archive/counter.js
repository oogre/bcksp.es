/*----------------------------------------*\
  bcksp.es - counter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-25 22:28:53
  @Last Modified time: 2019-03-27 14:55:42
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { Component } from 'react';
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
		return (this.props.archive.count / config.book.getMaxChar()) * 100 ;
	}
	render() {
		return (
			<div className="counter">
				<span className="counter__total-character">
					<T count={this.getCharCount()}>archive.counter</T>
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
				<svg width="100%" height="24px">
					<rect rx="3" ry="3" x="0" y="0" width="100%" height="100%" fill={"#D8D8D8"} />
					<rect rx="3" ry="3" x="0" y="0" width={this.getPerCent()+"%"} height="100%" fill={"#fff123"} />
				</svg>
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



