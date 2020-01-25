/*----------------------------------------*\
  bcksp.es - error.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 16:20:01
  @Last Modified time: 2020-01-24 14:52:28
\*----------------------------------------*/
import React, { Component } from 'react';

const FixeError = ({children}) => {
	return (
		<div className="message error-message">
			{
				React.Children.map(children, child => child)
			}
		</div>
	);
}

export default FixeError;