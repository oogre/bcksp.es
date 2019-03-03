/*----------------------------------------*\
  bcksp.es - counter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-25 22:28:53
  @Last Modified time: 2019-03-02 13:41:25
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
			<div>
				{
					this.props.isReady &&
						<div>
							<h1><T>archive.counter.title</T></h1>
							<div>
								<div>
									<span>
										<T count={this.getCharCount()}>archive.counter.now</T>
									</span>
									<meter value={this.getPerCent()} max="100"></meter>
									<span>{this.getPerCent()+"%"}</span>
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



