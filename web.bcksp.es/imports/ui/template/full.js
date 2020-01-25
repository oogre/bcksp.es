/*----------------------------------------*\
  bcksp.es - full.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-03 20:46:10
  @Last Modified time: 2020-01-25 18:10:30
\*----------------------------------------*/
import React, { useState } from 'react';
import CallToConnect from './../banner/callToConnect.js';
import ErrorMessage from './../banner/errorMessage.js';
import SuccessMessage from './../banner/successMessage.js';
import HeaderMenu from './../menu/header.js';
import MenuFooter from './../menu/footer.js';
import MutationObserver from 'mutation-observer';

const TemplateFull = ({children}) => {
	return (
		<div className="page page--home">
			<CallToConnect /> 
			<ErrorMessage />
			<SuccessMessage />
			<HeaderMenu/>
			{
				React.Children.map(children, child => child)
			}
			<MenuFooter/>
		</div>
	);
}


export default TemplateFull;
