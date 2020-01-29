/*----------------------------------------*\
  bcksp.es - posterConfirm.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-27 23:40:25
  @Last Modified time: 2020-01-28 22:56:29
\*----------------------------------------*/

import React, { useState, useEffect } from 'react';
import SignatureMailTemplate from './signature.js';
import { Email, Item, Span, renderEmail } from 'react-html-email';



const MailTemplate = (props) => {
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T2 = i18n.createTranslator("email");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const textDefaults = {
		fontFamily: 'monospace',
		fontSize: 15,
		color: 'black'
	};
	return (
		<Email title={T2(props.type+".subject", props)} align="left">
			<Item>
				<Span  {...textDefaults} >
					<p dangerouslySetInnerHTML={
						{
							__html: T2(props.type+".content", props) 
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

export const getMail = function(type, data){
	return renderEmail(<MailTemplate type={type} url={data.url} orderID={data.orderID}/>);
}