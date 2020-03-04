/*----------------------------------------*\
  bcksp.es - posterConfirm.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-27 23:40:25
  @Last Modified time: 2020-03-04 18:47:45
\*----------------------------------------*/

import React from 'react';
import SignatureMailTemplate from './signature.js';
import { getTranslations } from "./../../i18n/index.js";
import { Email, Item, Span, renderEmail } from 'react-html-email';



const MailTemplate = (props) => {
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {T} = getTranslations("email");

  	React.useEffect(() => {//componentDidMount
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
		<Email title={T(props.type+".subject", props)} align="left">
			<Item>
				<Span  {...textDefaults} >
					<p dangerouslySetInnerHTML={
						{
							__html: T(props.type+".content", props) 
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