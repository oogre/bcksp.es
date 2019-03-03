/*----------------------------------------*\
  bcksp.es - Souvenir.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-17 08:17:22
  @Last Modified time: 2019-01-26 17:53:53
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



// App component - represents the whole app
class Souvenir extends Component {
	constructor(props){
		super(props);
	}

	getPerCent(){
		if(!this.props.archive || !this.props.isPrivateReady)return 0 ;
		return (this.props.archive.count / config.book.getMaxChar()) * 100 ;
	}

	getCharLeft(){
		if(!this.props.archive || !this.props.isPrivateReady)return 0 ;
		return config.book.getMaxChar() - this.props.archive.count;
	}

	render() {
		return (
			<div className="page__content">
				<div className="container">
					<h1 className="page__title">Bring Back <br/> the souvenirs</h1>
					<h2 className="page__subtitle">The shop</h2>
					<ul className="souvenir">

						<li className="souvenir__item">
							<a href={FlowRouter.path("item", {type : "download"})}>
								<img src="#" src="/images/souvenirs/archive.svg" alt="" />
								<span className="souvenir__link-title"><T>souvenir.item.download.title</T></span>
								<span className="souvenir__link-badge"><T>souvenir.item.download.badge</T></span>
							</a>
						</li>

						<li className="souvenir__item">
							<a className="souvenir__link" href={FlowRouter.path("item", {type : "book"})}>
								<div className="souvenir__counter-label">{this.getPerCent()}%</div>
								<div className="wrapper">
									<img src="#" src="/images/souvenirs/book.png" alt="" />
								</div>
								<span className="souvenir__link-title"><T>souvenir.item.book.title</T></span>
								<span className=""><T count={this.getCharLeft()}>souvenir.item.book.countdown</T></span>
								<span className="souvenir__link-badge"><T>souvenir.item.book.price</T></span>
							</a>
						</li>

						<li className="souvenir__item">
							<a class="souvenir__link" href={FlowRouter.path("item", {type : "poster"})}>
								<div className="wrapper">
									<img src="#" src="/images/souvenirs/poster.png" alt=""/>
								</div>
								<span className="souvenir__link-title"><T>souvenir.item.poster.title</T></span>
								<span className="souvenir__link-badge"><T>souvenir.item.poster.price</T></span>
							</a>
						</li>

						<li className="souvenir__item">
							<a class="souvenir__link" href={FlowRouter.path("item", {type : "custom"})}>
								<div className="wrapper">
									<img src="#"/>
								</div>
								<span className="souvenir__link-title"><T>souvenir.item.custom.title</T></span>
							</a>
						</li>

						<li className="souvenir__item">
							<a href={FlowRouter.path("item", {type : "almanach"})}>
								<div className="wrapper">
									<img src="#"/>
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
		isPrivateReady : handle && handle.ready(),
		archive : Archives.findOne({}, {fields : {count : 1}})
	};
})(Souvenir);
