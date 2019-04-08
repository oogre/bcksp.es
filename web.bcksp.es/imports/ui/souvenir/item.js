/*----------------------------------------*\
  bcksp.es - download.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-26 16:22:51
  @Last Modified time: 2019-03-03 14:10:13
\*----------------------------------------*/

import saveAs from 'file-saver';
import T from './../../i18n/index.js';
import FixeWait from './../fixe/wait.js'
import React, { Component } from 'react';
import FormBook from "./../form/book.js";
import FixeError from './../fixe/error.js'
import FormPoster from "./../form/poster.js";
import FixeSuccess from './../fixe/success.js'
import FormContact from "./../form/contact.js";
import { withTracker } from 'meteor/react-meteor-data';
import { getMessageFromError } from "./../../utilities/ui.js";
import { OrderPoster, OrderBook, Contact } from "./../../api/souvenirs/methods.js";

class SouvenirItem extends Component {

	constructor(props){
		super(props);
		this.state = {
			error : false,
			success : false,
			loading : false,
			displayForm : false
		};
	}

	async downloadArchive(){
		return new Promise((resolve, reject)=>{
			if(!this.props.isConnected) {
				reject();
				return false;
			}
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

	async orderBook(){
		return new Promise((resolve, reject)=>{
			let data = this.getFormContent();
			this.setState({
				error : false,
				success : false,
				loading : true,
			});

			OrderBook.call(data, (error, data)=>{
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
					success : data
				});
				resolve();
			});
		});
	}

	async orderPoster(){
		return new Promise((resolve, reject)=>{
			let data = this.getFormContent();
			data["poster.data"] = JSON.parse($("[data-design-poster]").attr("data-design-poster"));

			this.setState({
				error : false,
				success : false,
				loading : true,
			});

			OrderPoster.call(data, (error, data)=>{
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
					'success' : data
				});
				resolve();
			});
		});
	}

	async contact(){
		return new Promise((resolve, reject)=>{
			let data = this.getFormContent();
			this.setState({
				error : false,
				success : false,
				loading : true,
			});
			Contact.call(data, (error, data)=>{
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
					'success' : data
				});
				resolve();
			});
		});
	}

	action(event){
		event.preventDefault();
		switch(this.props.type){
			case "book" :
				this.orderBook().then(()=>this.setState({ displayForm : false }));
			break;
			case "poster" :
				this.orderPoster().then(()=>this.setState({ displayForm : false }));
			break;
			case "contact" :
				this.contact().then(()=>this.setState({ displayForm : false }));
			break;
		}
		return false;
	}

	firstAction(event){
		event.preventDefault();
		switch(this.props.type){
			case "download" :
				this.downloadArchive().then(()=>this.setState({ displayForm : false }));
			break;
			case "book" :
				this.setState({ displayForm : "deliveryBook" });
			break;
			case "poster" :
				this.setState({ displayForm : "deliveryPoster" });
			break;
			case "contact" :
				this.setState({ displayForm : "contact" });
			break;
		}
		return false;
	}

	render() {
		const currentItem = i18n.createTranslator("souvenir.item."+this.props.type);
		const T2 = i18n.createComponent(currentItem);
		return (
			<div className="page__content">
				<div className="container">
					<div className="page__header">
						<h1 className="page__title">
							<T2>title</T2>
						</h1>
					</div>
					<div className="shop">
						{
							this.state.displayForm != "deliveryPoster" &&
								<div className="shop__example-illustration">
									<img className="shop__example-illustration-img" src={currentItem("img")} alt="" />
								</div>
						}
						{
							!this.state.success &&
							this.state.displayForm === false &&
								<div className="shop__example-detail">
									<p className="shop__example-description"><T2>description</T2></p>
									<p className="shop__example-price"><T2>price</T2></p>
									<button className="button button--primary" onClick={this.firstAction.bind(this)}>
										<T2>button</T2>
									</button>
								</div>
						}
						{
							!this.state.success &&
							this.state.displayForm == "deliveryBook" &&
								<FormBook onSubmit={this.action.bind(this)}/>
						}
						{
							!this.state.success &&
							this.state.displayForm == "deliveryPoster" &&
								<FormPoster onSubmit={this.action.bind(this)}/>
						}
						{
							!this.state.success &&
							this.state.displayForm == "contact" &&
								<FormContact onSubmit={this.action.bind(this)}/>
						}
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
											"souvenir.item."+this.props.type+".confirmation.result", {
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

	getFormContent(){
		let data = $("input[name^="+this.props.type+"], textarea[name^="+this.props.type+"]")
					.get()
					.reduce((acc, e)=>{
						if(e.type=="radio") {
							if(e.checked){
								acc[e.name] = e.value;
							}
						}
						else if(e.type=="checkbox") {
							acc[e.name] = e.checked;
						}
						else {
							acc[e.name] = e.value;
						}
						return acc;
					}, {

					});
		return data;
	}
}
export default withTracker(self => {
	return {
		isConnected : Meteor.userId(),
	};
})(SouvenirItem);
