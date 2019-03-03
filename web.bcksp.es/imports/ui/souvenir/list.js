/*----------------------------------------*\
  bcksp.es - Souvenir.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-17 08:17:22
  @Last Modified time: 2019-03-03 15:02:05
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
					<ul className="souvenir">
						{
							this.props.isConnected &&
							<li className="souvenir__item">
								<a href={FlowRouter.path("item", {type : "download"})}>
									<div className="wrapper">
										<div className="badge"><T>souvenir.item.download.badge</T></div>
										<img src="#"/>
									</div>
									<h3><T>souvenir.item.download.title</T></h3>
								</a>
							</li>
						}
						{
							this.props.isConnected &&
								<li className="howto__item">
									<a href={FlowRouter.path("item", {type : "book"})}>
										<div className="wrapper">
											<div className="jauge">{(this.getPerCent()).toFixed(3)}%</div>
											<img src="#"/>
										</div>
										<h3><T>souvenir.item.book.title</T></h3>
										<p><T count={this.getCharLeft()}>souvenir.item.book.countdown</T></p>
										<p><T>souvenir.item.book.price</T></p>
									</a>
								</li>
						}
						<li className="howto__item">
							<a href={FlowRouter.path("item", {type : "poster"})}>
								<div className="wrapper">
									<img src="#"/>
								</div>
								<h3><T>souvenir.item.poster.title</T></h3>
								<p><T>souvenir.item.poster.price</T></p>
							</a>
						</li>

						<li className="howto__item">
							<a href={FlowRouter.path("item", {type : "contact"})}>
								<div className="wrapper">
									<img src="#"/>
								</div>
								<h3><T>souvenir.item.contact.title</T></h3>
							</a>
						</li>

						<li className="howto__item">
							<a href={FlowRouter.path("item", {type : "almanach"})}>
								<div className="wrapper">
									<img src="#"/>
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
