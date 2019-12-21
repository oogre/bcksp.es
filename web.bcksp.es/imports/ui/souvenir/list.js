/*----------------------------------------*\
  bcksp.es - Souvenir.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-17 08:17:22
  @Last Modified time: 2019-12-21 00:13:09
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
import Progress from "./../shared/progress.js";

// App component - represents the whole app
class Souvenir extends Component {
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

	getCharLeft(){
		if(!this.props.archive || !this.props.isPrivateReady)return 0 ;
		return config.book.getMaxChar() - this.props.archive.count;
	}
	changePicture(){
		console.log("YO");
	}
	render() {
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title"><T>souvenir.title2</T></h1>
						<h2 className="page__subtitle"><T>souvenir.subtitle</T></h2>
					</div>
					<ul className="souvenir">
						{
							this.props.isConnected &&
							<li className="souvenir__item">
								<a className="souvenir__link" href={FlowRouter.path("item", {type : "download"})}>
									<img className="souvenir__link-image" src="#" src="/images/souvenirs/archive.svg" alt="" />
									<span className="souvenir__link-title"><T>souvenir.item.download.title</T></span>
									<span className="souvenir__link-badge souvenir__link-badge--free"><T>souvenir.item.download.price</T></span>
								</a>
							</li>
						}
						{
							this.props.isConnected &&
								<li className="souvenir__item">
									<a className="souvenir__link" href={FlowRouter.path("item", {type : "book"})}>
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
									<img className="souvenir__link-image" src="/images/souvenirs/contact.1.jpg" alt=""/>
								</div>
								<span className="souvenir__link-title"><T>souvenir.item.contact.title</T></span>
							</a>
						</li>
						{
							config.souvenir.almanach &&
							<li className="souvenir__item">
								<a className="souvenir__link" href={FlowRouter.path("item", {type : "almanach"})}>
									<div className="wrapper">
										<img className="souvenir__link-image" src="#" alt=""/>
									</div>
									<span className="souvenir__link-title"><T>souvenir.item.almanach.title</T></span>
									<span className="souvenir__link-badge"><T>souvenir.item.almanach.price</T></span>
								</a>
							</li>
						}
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
		handle : handle,
		archive : Archives.findOne({}, {fields : {count : 1}})
	};
})(Souvenir);
