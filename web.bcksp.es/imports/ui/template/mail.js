/*----------------------------------------*\
  bcksp.es - posterConfirm.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-27 23:40:25
  @Last Modified time: 2019-03-02 16:51:38
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { SignatureMailTemplate } from './signature.js';
import { Email, Item, Span, renderEmail } from 'react-html-email';



class MailTemplate extends Component {
	constructor(props){
		super(props);
	}
	render(){
		const textDefaults = {
			fontFamily: 'monospace',
			fontSize: 15,
			color: 'black'
		};
		return (
			<Email title={i18n.__("email."+this.props.type+".subject", this.props)} align="left">
				<Item>
					<Span  {...textDefaults} >
						<p dangerouslySetInnerHTML={
							{
								__html: i18n.__("email."+this.props.type+".content", this.props) 
							}
						}></p>
					</Span>
				</Item>
				<Item>
					<SignatureMailTemplate/>
				</Item>
			</Email>
		);
	}
}

export const getMail = function(type, data){
	return renderEmail(<MailTemplate type={type} url={data.url} orderID={data.orderID}/>);
}