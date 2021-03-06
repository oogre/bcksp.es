/*----------------------------------------*\
  bcksp.es - error.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 16:20:01
  @Last Modified time: 2020-01-28 21:22:09
\*----------------------------------------*/
import React from 'react';

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