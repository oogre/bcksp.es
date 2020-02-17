/*----------------------------------------*\
  bcksp.es - full.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-03 20:46:10
  @Last Modified time: 2020-02-16 14:09:58
\*----------------------------------------*/
import React from 'react';
import MenuFooter from './../menu/footer.js';
import CallToConnect from './../banner/callToConnect.js';


const TemplateMini = ({children}) => {
	return (
		<div className="page page--home">
			<CallToConnect /> 
			{
				React.Children.map(children, child => child)
			}
		</div>
	);
}
export default TemplateMini;