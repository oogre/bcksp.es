/*----------------------------------------*\
  bcksp.es - manager.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 21:44:38
  @Last Modified time: 2019-12-19 23:15:16
\*----------------------------------------*/
import React, { Component } from 'react';
import  MessageError from "./error.js";
import  MessageSuccess from "./success.js";
import { getMessageFromError } from "./../../utilities/ui.js";

export default class MessageManager extends Component {
	constructor(props){
		super(props);
		this.state = {
			error : false,
			success : false,
			errorMessage : "",
			successMessage : ""
		};
	}
	
	reset(){
		this.setState({
			error : false,
			success : false,
			errorMessage : "",
			successMessage : ""
		});
		this.props.onChange("");
	}

	setError(flag, message=""){
		if(flag){
			this.setState({
				error : true,
				success : false,
				errorMessage : getMessageFromError(message)
			});
		}else{
			this.setState({
				error : false,
			});
		}
		this.props.onChange(flag?"error":(this.state.success?"success" : ""));
	}

	setSuccess(flag, message=""){
		if(flag){
			this.setState({
				error : false,
				success : true,
				successMessage : message
			});
		}else{
			this.setState({
				success : false,
			});
		}
		this.props.onChange(flag?"success":(this.state.error?"error" : ""));
	}

	render() {
		if(this.state.error){
			return (
				<MessageError messages={this.state.errorMessage}/>
			);
		}else if(this.state.success){
			return (
				<MessageSuccess messages={this.state.successMessage}/>
			);
		}else{
			return (null);
		}
	}
}