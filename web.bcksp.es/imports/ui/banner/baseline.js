/*----------------------------------------*\
  bcksp.es - baseline.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 15:37:26
  @Last Modified time: 2020-02-03 15:26:18
\*----------------------------------------*/
import React, { useEffect, useState } from 'react';
import SelfWritten from "./../shared/selfwritten.js";

const BannerBaseline = ({isConnected}) => {
	
	const [ locale, setLocale ] = useState(i18n.getLocale());
	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	
	const T2 = i18n.createTranslator("baseline");
	const T = i18n.createComponent(T2);
	
	return (
		<div className="punchline">
			<div className="container">	
				{ 	
					!isConnected &&
					<h1 className="punchline__title" >
						<SelfWritten textArray={ Object.values(T2("offline.baseline")) } />
					</h1>
				}
				{
					isConnected &&
						<h1 className="punchline__title" >
							<SelfWritten textArray={ Object.values(T2("online.baseline")) } />
						</h1>
						
				}
			</div>
		</div>
	);
	
}

export default BannerBaseline;
/*



				*/