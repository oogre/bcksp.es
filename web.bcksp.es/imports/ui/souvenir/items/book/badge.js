/*----------------------------------------*\
  bcksp.es - badge.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:27:09
  @Last Modified time: 2020-01-11 17:44:44
\*----------------------------------------*/

import T from './../../../../i18n/index.js';
import React, { Component } from 'react';
import { config } from './../../../../startup/config.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../../../api/archives/archives.js';
import Progress from "./../../../shared/progress.js";

// App component - represents the whole app
class SouvenirItemBookBadge extends Component {
	constructor(props){
		super(props);
	}
	componentWillUnmount(){
		this.props.handle && this.props.handle.stop();
	}
	getPerCent(){
		if(!this.props.archive || !this.props.isPrivateReady)return 0 ;
		return (this.props.archive.count / config.book.getMaxChar());
	}

	render() {
		return (
			<li className="souvenir__item">
				<a className="souvenir__link" href={FlowRouter.path("bookDescription")}>
					<Progress //souvenir__counter-label
						percent={this.getPerCent()}
						colorFg="#fff123"
						colorBg="#000000"
						diameter={250}
						thickness={15}
						thicknessRatio={0.5}
					>
						<img src="/images/souvenirs/book.png"/>
					</Progress>
					<span className="souvenir__link-title"><T>souvenir.item.book.title</T></span>
					<span className="souvenir__link-badge"><T>souvenir.item.book.price</T></span>
				</a>
			</li>
	
		);
	}
}

export default withTracker(self => {
	let handle = Meteor.userId() && Meteor.subscribe('archive.private.counter');
	return {
		isPrivateReady : handle && handle.ready(),
		handle : handle,
		archive : Archives.findOne({}, {fields : {count : 1}})
	};
})(SouvenirItemBookBadge);
