/*----------------------------------------*\
  bcksp.es - download.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-26 16:22:51
  @Last Modified time: 2019-01-29 19:23:17
\*----------------------------------------*/

import saveAs from 'file-saver';
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import FormBook from "./../form/book.js";
import FormPoster from "./../form/poster.js";
import { withTracker } from 'meteor/react-meteor-data';


class SouvenirItem extends Component {

	constructor(props){
		super(props);
	}
	
	downloadArchive(){
		if(!this.props.isConnected) return false;
		Meteor.call("Archives.methods.download", (e, r)=>{
			if(e)return console.error(e);
			let blob = new Blob([i18n.__("souvenir.item.download.file.content", {
				createdAt : moment(r.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
				updatedAt : moment(r.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
				content : r.content,
				count : r.count
			})], {
				type: "text/plain;charset=utf-8"
			});
			saveAs(blob, i18n.__("souvenir.item.download.file.name")+".txt");
		});
	}

	orderBook(){
		let data = $("input[name^=book]").get().reduce((acc, e)=>{
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
		}, {});
		Meteor.call("Books.methods.order", data, (e, r)=>{
			if(e)return console.error(e);
			console.log(r);
		});
	}

	orderPoster(){
		let data = $("input[name^=poster]").get().reduce((acc, e)=>{
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
		}, {});
		Meteor.call("Poster.methods.order", data, (e, r)=>{
			if(e)return console.error(e);
			console.log(r);
		});
	}

	action(){
		switch(this.props.type){
			case "download" : 
				this.downloadArchive();
			break;
			case "book" : 
				this.orderBook();
			break;
			case "poster" : 
				this.orderPoster();
			break;
		}
	}

	render() {
		const currentItem = i18n.createTranslator("souvenir.item."+this.props.type);
		const T2 = i18n.createComponent(currentItem);
		return (
			<div className="page__content">
				<div className="container">
					<h1><T2>title</T2></h1>
					<div>
						<div>
							<img src={currentItem("img")}/>
						</div>
						<div>
							<T2>description</T2>
							{
								this.props.type == "book" && 
									<FormBook/>
							}
							{
								this.props.type == "poster" && 
									<FormPoster/>
							}
						</div>
					</div>
					<button onClick={this.action.bind(this)}><T2>button</T2></button>
				</div>
			</div>
		);
	}
}
export default withTracker(self => {
	return {
		isConnected : Meteor.userId(),
	};
})(SouvenirItem);
