/*----------------------------------------*\
  bcksp.es - baseline.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 15:37:26
  @Last Modified time: 2020-03-03 15:30:59
\*----------------------------------------*/
import React from 'react';
import SelfWritten from "./../shared/selfwritten.js";
import { getTranslations } from "./../../i18n/index.js";

const BannerBaseline = ({isConnected}) => {
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("baseline");
	React.useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	return (
		<div className="punchline">
			<div className="container">	
				{ 	
					!isConnected &&
					<h1 className="punchline__title" >
						<SelfWritten textArray={ Object.values(T("offline.baseline")) } />
					</h1>
				}
				{
					isConnected &&
						<h1 className="punchline__title" >
							<SelfWritten textArray={ Object.values(T("online.baseline")) } />
						</h1>
						
				}
			</div>
		</div>
	);
	
}

export default BannerBaseline;
/*



				*/