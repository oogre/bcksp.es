/*----------------------------------------*\
  bcksp.es - Souvenir.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-17 08:17:22
  @Last Modified time: 2019-03-04 22:20:17
\*----------------------------------------*/
/*----------------------------------------*\
  bcksp.es - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:21:49
  @Last Modified time: 2019-01-15 12:18:17
\*----------------------------------------*/

import moment from 'moment';
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { config } from './../../startup/config.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import ProgressTemplate from "./../template/progress.js";

// App component - represents the whole app
class Souvenir extends Component {
	constructor(props){
		super(props);
		this.state={
			percent : 0.33
		}
	}

	getPerCent(){
		return this.state.percent;
		if(!this.props.archive || !this.props.isPrivateReady)return 0 ;
		return (this.props.archive.count / config.book.getMaxChar());
	}

	getCharLeft(){
		if(!this.props.archive || !this.props.isPrivateReady)return 0 ;
		return config.book.getMaxChar() - this.props.archive.count;
	}

	render() {
		return (
			<div className="page__content">
				<div className="container">
					<h2 className="page__title"><T>souvenir.title2</T></h2>
					<h2 className="page__subtitle"><T>souvenir.subtitle</T></h2>
					<ul className="souvenir">
						{
							this.props.isConnected &&
							<li className="souvenir__item">
								<a className="souvenir__link" href={FlowRouter.path("item", {type : "download"})}>
									<img className="souvenir__link-image" src="#" src="/images/souvenirs/archive.svg" alt="" />
									<span className="souvenir__link-title"><T>souvenir.item.download.title</T></span>
									<span className="souvenir__link-badge"><T>souvenir.item.download.price</T></span>
								</a>
							</li>
						}
						{
							this.props.isConnected &&
								<li className="souvenir__item">
									<a className="souvenir__link" href={FlowRouter.path("item", {type : "book"})}>
										<ProgressTemplate //souvenir__counter-label
											percent={this.getPerCent()}
											colorFg="#fff123"
											colorBg="#000000"
											diameter={250}
											thickness={15}
											thicknessRatio={0.5}
										>
											<img src="/images/souvenirs/book.png"/>
										</ProgressTemplate>
										<span className="souvenir__link-title"><T>souvenir.item.book.title</T></span>
										<span className="souvenir__link-badge"><T>souvenir.item.book.price</T></span>
									</a>
								</li>
						}
						<li className="souvenir__item">
							<a className="souvenir__link" href={FlowRouter.path("item", {type : "poster"})}>
								<div className="wrapper">
									<img className="souvenir__link-image" src="/images/souvenirs/poster.png" alt=""/>
								</div>
								<span className="souvenir__link-title"><T>souvenir.item.poster.title</T></span>
								<span className="souvenir__link-badge"><T>souvenir.item.poster.price</T></span>
							</a>
						</li>

						<li className="souvenir__item">
							<a className="souvenir__link" href={FlowRouter.path("item", {type : "contact"})}>
								<div className="wrapper">
									<img className="souvenir__link-image" src="#" alt=""/>
								</div>
								<span className="souvenir__link-title"><T>souvenir.item.contact.title</T></span>
							</a>
						</li>

						<li className="souvenir__item">
							<a href={FlowRouter.path("item", {type : "almanach"})}>
								<div className="wrapper">
									<img className="souvenir__link-image" src="#"/>
								</div>
								<span className="souvenir__link-title"><T>souvenir.item.almanach.title</T></span>
								<span className="souvenir__link-badge"><T>souvenir.item.almanach.price</T></span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
export default withTracker(self => {
	let handle = Meteor.userId() && Meteor.subscribe('archive.private.counter');
	return {
		isConnected : Meteor.userId(),
		isPrivateReady : handle && handle.ready(),
		archive : Archives.findOne({}, {fields : {count : 1}})
	};
})(Souvenir);
