/*----------------------------------------*\
  bcksp.es - baseline.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 15:37:26
  @Last Modified time: 2020-03-12 12:44:19
\*----------------------------------------*/
import React from 'react';
import SelfWritten from "./../shared/selfwritten.js";
import { getTranslations } from "./../../i18n/index.js";
import { getNameOfCurrentUser } from './../../utilities/meteor.js';

const BannerBaseline = ({isConnected}) => {
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("baseline");
	React.useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 
	let baseLines = Object.values(T("offline.baseline"));
	if(isConnected){
		const userName = getNameOfCurrentUser();
		baseLines = Object.values(T("online.baseline"));
		baseLines = baseLines.map(baseLine=>baseLine.replace("[USER_NAME]", userName));
	}
	return (
		<div className="punchline">
			<div className="container">	
				<h1 className="punchline__title" >
					<SelfWritten textArray={ baseLines } />
				</h1>
			</div>
		</div>
	);	
}

export default BannerBaseline;