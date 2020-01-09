/*----------------------------------------*\
  bcksp.es - creation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:16:52
  @Last Modified time: 2019-12-22 15:46:06
\*----------------------------------------*/
/*----------------------------------------*\
  bcksp.es - download.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-26 16:22:51
  @Last Modified time: 2019-12-21 14:19:52
\*----------------------------------------*/

import T from './../../../../i18n/index.js';
import FixeWait from './../../../fixe/wait.js'
import React, { Component } from 'react';
import FixeError from './../../../fixe/error.js'
import FormPoster from "./../../../form/poster.js";
import FixeSuccess from './../../../fixe/success.js'
import { withTracker } from 'meteor/react-meteor-data';
import { getMessageFromError } from "./../../../../utilities/ui.js";
import { CreatePoster } from "./../../../../api/souvenirs/methods.js";
import LiveStream from './../../../archive/LiveStream.js';
import GeneratorPoster from './../../../generator/poster.js';

export default class SouvenirItemPosterCreation extends Component {

	constructor(props){
		super(props);
		this.state = {
			sentence : false,
			shapes : {}
		}
	}
	
	onSelect (data){
		if(!_.isEmpty(data)){
			this.setState({ sentence : data });
		}
	}
	
	shapeHandler(shapes){
		this.setState({ shapes : shapes });
	}

	createPoster(event){
		event.preventDefault();
		
		let designData = JSON.parse($("[data-design-poster]").attr("data-design-poster"));
		CreatePoster.call({
			sentence : this.state.sentence,
			shapes : this.state.shapes,
			fontSize : designData.fontSize,
			lineHeight : designData.lineHeight,

		}, (err, res) => {
			if(err){
				return alert(err);
			}
			FlowRouter.go('posterOrder', {id : res.data});
		});
		return false;
	}

	render() {
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title">
							<T>souvenir.item.poster.title</T>
						</h1>
					</div>
					<div className="shop">
						<form className="shop-creation" onSubmit={this.createPoster.bind(this)}>
							<div className="shop-creation__order">
								<LiveStream
									type="shop"
									fullscreenAvailable={false}
									shareAvailable={false}
									onSelect={this.onSelect.bind(this)}
									onLoad={this.onSelect.bind(this)}
								/>
							</div>
							<div>
								<GeneratorPoster sentence={this.state.sentence} onShapes={this.shapeHandler.bind(this)}/>
								<input type="submit" value={i18n.__("souvenir.item.poster.button.continue")} className="button button--primary"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
