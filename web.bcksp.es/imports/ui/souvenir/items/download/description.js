/*----------------------------------------*\
  bcksp.es - description.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 14:40:21
  @Last Modified time: 2019-12-21 14:54:15
\*----------------------------------------*/

import saveAs from 'file-saver';
import React, { Component } from 'react';
import T from './../../../../i18n/index.js';
import FixeWait from './../../../fixe/wait.js'
import FixeError from './../../../fixe/error.js'
import FixeSuccess from './../../../fixe/success.js'
import { getMessageFromError } from "./../../../../utilities/ui.js";

export default class SouvenirItemDownLoadDescription extends Component {

	constructor(props){
		super(props);
		this.state = {
			error : false,
			success : false,
			loading : false,
			errors : {}
		};
	}

	async downloadArchive(){
		return new Promise((resolve, reject)=>{
			this.setState({
				error : false,
				success : false,
				loading : true,
			});
			Meteor.call("Archives.methods.download", (error, data)=>{
				this.setState({
					loading : false,
				});
				if(error){
					console.log(error);
					this.setState({
						error : getMessageFromError(error),
						success : false,
					});
					reject();
					return;
				}
				this.setState({
					'success' : data,
				});
				let blob = new Blob(data, {type: "text/plain;charset=utf-8"});
				saveAs(blob, i18n.__("souvenir.item.download.file.name")+".txt");
				resolve();
			});
		});
	}

	render() {
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title">
							<T>souvenir.item.download.title</T>
						</h1>
					</div>
					<div className="shop">
						<div className="shop__example-illustration">
							<img className="shop__example-illustration-img" src={i18n.__("souvenir.item.download.img")} alt="" />
						</div>
						<div className="shop__example-detail">
							<p className="shop__example-description"><T>souvenir.item.download.description</T></p>
							<p className="shop__example-price"><T>souvenir.item.download.price</T></p>
							<button className="button button--primary" onClick={this.downloadArchive.bind(this)}>
								<T>souvenir.item.download.button.create</T>
							</button>
						</div>
					</div>
					{
						this.state.error &&
							<FixeError>
								<span dangerouslySetInnerHTML={
									{
										__html: this.state.error
									}
								}></span>
							</FixeError>
					}
					{
						this.state.success &&
							<FixeSuccess>
								<span dangerouslySetInnerHTML={
									{
										__html : i18n.__(
											"souvenir.item.download.confirmation.result", {
											orderID : this.state.success
										})
									}
								}></span>
							</FixeSuccess>
					}
					{
						this.state.loading &&
							<FixeWait/>
					}
				</div>
			</div>
		);
	}
}