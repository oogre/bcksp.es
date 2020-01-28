/*----------------------------------------*\
  bcksp.es - step.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:07:16
  @Last Modified time: 2020-01-28 22:00:13
\*----------------------------------------*/
import React from 'react';
// App component - represents the whole app
const HowtoStep = ({children, k}) => {
	return (
		<div className="step card card--step">
			{
				children && children.length == 2 ?
					<div className="card__content">
						{
							React.Children.map(children, (child, n) =>(
								<div key={n} className={(k + n)%2==0 ? "left" : "right"} >
									{child}
								</div>
							))
						}
					</div>
				:
					null
			}
		</div>
	);
}

export default HowtoStep;