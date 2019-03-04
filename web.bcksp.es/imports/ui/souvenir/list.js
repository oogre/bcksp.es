/*----------------------------------------*\
  bcksp.es - Souvenir.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-17 08:17:22
  @Last Modified time: 2019-03-04 21:26:50
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
			percent : 0
		}
		setInterval(()=>{
			let t = this.state.percent += 0.0029;
			this.setState({percent : t % 1})
		}, 20);
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
					<h2 className="souvenir__title"><T>souvenir.title2</T></h2>
					<ul className="souvenir">
						{
							this.props.isConnected &&
							<li className="souvenir__item">
								<a href={FlowRouter.path("item", {type : "download"})}>
									<div className="wrapper border">
										<img src="/images/logo.svg"/>
									</div>
									<h3><T>souvenir.item.download.title</T></h3>
									<p><T>souvenir.item.download.price</T></p>
								</a>
							</li>
						}
						{
							this.props.isConnected &&
								<li className="souvenir__item">
									<a href={FlowRouter.path("item", {type : "book"})}>
										<ProgressTemplate 
											percent={this.getPerCent()}
											colorFg="#fff123"
											colorBg="#000000"
											diameter={250}
											thickness={15}
											thicknessRatio={0.5}
										>
											<img src="/images/logo.svg"/>
										</ProgressTemplate>
										<h3><T>souvenir.item.book.title</T></h3>
										<p><T>souvenir.item.book.price</T></p>
									</a>
								</li>
						}
						<li className="souvenir__item">
							<a href={FlowRouter.path("item", {type : "poster"})}>
								<div className="wrapper">
									<img src="/images/logo.svg"/>
								</div>
								<h3><T>souvenir.item.poster.title</T></h3>
								<p><T>souvenir.item.poster.price</T></p>
							</a>
						</li>

						<li className="souvenir__item">
							<a href={FlowRouter.path("item", {type : "contact"})}>
								<div className="wrapper">
									<img src="/images/logo.svg"/>
								</div>
								<h3><T>souvenir.item.contact.title</T></h3>
							</a>
						</li>

						<li className="souvenir__item">
							<a href={FlowRouter.path("item", {type : "almanach"})}>
								<div className="wrapper">
									<img src="/images/logo.svg"/>
								</div>
								<h3><T>souvenir.item.almanach.title</T></h3>
								<p><T>souvenir.item.almanach.price</T></p>
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
