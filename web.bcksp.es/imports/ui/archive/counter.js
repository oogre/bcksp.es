/*----------------------------------------*\
  bcksp.es - counter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-25 22:28:53
  @Last Modified time: 2018-11-26 07:51:08
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import { config } from './../../startup/config.js';
import T from './../../i18n/index.js';

class ArchiveCounter extends Component {
	constructor(props){
		super(props);
	}
	getCharLeft(){
		return config.book.getMaxChar() - this.props.archive.count;
	}
	getPerCent(){
		return (config.book.getMaxChar() / this.props.archive.count) * 100 ;
	}
	render() {
		return (
			<div>
				{
					this.props.isReady &&
						<div>
							<h1><T>archive.counter.title</T></h1>
							<div>
								<span>
									<T value={this.getCharLeft()}>archive.counter.left</T>
								</span>
								<div>
									<div style={{
										width : this.getPerCent()+"%"
									}}></div>
								</div>
							</div>
						</div>
				}
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



