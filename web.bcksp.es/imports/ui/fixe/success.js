/*----------------------------------------*\
  bcksp.es - success.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 16:20:09
  @Last Modified time: 2020-01-28 21:23:02
\*----------------------------------------*/
import React from 'react';

const FixeSuccess = ({children}) => {
	return (
		<div className="message success-message">
			{
				React.Children.map(children, child => child)
			}
		</div>
	);
}

export default FixeSuccess;