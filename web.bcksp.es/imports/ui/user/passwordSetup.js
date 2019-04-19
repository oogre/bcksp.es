/*----------------------------------------*\
  dev - enrollment.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-20 13:29:36
  @Last Modified time: 2019-04-19 14:17:46
\*----------------------------------------*/

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';

import MessageError from '../message/error.js';
import FixeWait from '../fixe/wait.js';

import T from './../../i18n/index.js';
import { config } from '../../startup/config.js';
import { checkValidPassword, asyncIt} from './../../utilities/validation.js';
import { resetPassword } from './../../utilities/meteor.js';



ReactModal.setAppElement('body');

export default class UserPasswordSetup extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'is-loading' : false,
			'has-success' : false
		};
		this.closeCallBack = null;
	}
	handleSetPwd (event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'is-loading' : true,
			'has-success' : false
		});

		asyncIt(
			checkValidPassword, 
			ReactDom.findDOMNode(this.refs.password).value,
			ReactDom.findDOMNode(this.refs["password-check"]).value
		)
		.then(password => resetPassword(this.props.token, password))
		.then(() => {
			this.setState({
				'has-success' : true
			});

			if (_.isFunction(this.props.onComplete)) {
				alert( i18n.__("forms.resetPassword.success"));
				this.props.onComplete();
			}
		})
		.catch( error => {
			if(_.isArray(error.details)){
				this.setState({
					error : error.details.map(e=>e.details.value).join(", ")
				});	
			}else{
				this.setState({
					error : error.reason || error.message
				});	
			}
			
		})
		.finally(()=>{
			this.setState({
				'is-loading' : false,
			});
		});
		
		
		return false;
	}
	render() {
		const modalStyle = {
			overlay : {
				position          : 'fixed',
				top               : 0,
				left              : 0,
				right             : 0,
				bottom            : 0,
				backgroundColor   : 'rgba(40, 40, 40, 0.9)',
				zIndex            : 9999
			},
			content : {
				position                   : 'absolute',
				top                        : '50%',
				left                       : '50%',
				minWidth				   : '300px',
				maxWidth				   : '460px',
				width				   	   : '50% ',
				right                      : 'auto',
				bottom                     : 'auto',
				marginRight           	   : '-50%',
				transform                  : 'translate(-50%, -50%)',
				border                     : '0',
				backgroundColor   		   : 'rgba(255, 255, 255, 0.9)',
				color                      : '#342e30',
				overflow                   : 'auto',
				WebkitOverflowScrolling    : 'touch',
				borderRadius               : '0',
				outline                    : 'none',
				padding                    : '20px'
			}
		}

		return (
			<div className="container">
				<ReactModal
					isOpen={true}
					style={modalStyle}
					className="modal--tiny"
				>
					<div className="modal__wrapper">
						<div className="modal__container">
							<form className="login-user" onSubmit={this.handleSetPwd.bind(this)}>
								<div className="fields-row">
									<input
										type="password"
										ref="password"
										name="password"
										placeholder={i18n.__("forms.resetPassword.password")}
									/>
								</div>
								<div className="fields-row">
									<input
										type="password"
										ref="password-check"
										name="password-check"
										placeholder={i18n.__("forms.resetPassword.passwordConfirm")}
									/>
								</div>
								<div className="fields-row">
									<input
										className={
											"button--primary--fw " +
											(this.state['is-loading'] ? "loading " : "") +
											(this.state['has-success'] ? "success " : "") +
											(this.state['has-error'] ? "error " : "")
										}
										type="submit"
										value={i18n.__("forms.resetPassword.submit")}
									/>
								</div>
								{ 
									this.state["error"] && 
										<MessageError 
											messages={this.state["error"]} 
										/>
								}
								{
									this.state['is-loading'] &&
										<FixeWait />
								}
							</form>
						</div>
					</div>
				</ReactModal>
			</div>
		);
	}
}
