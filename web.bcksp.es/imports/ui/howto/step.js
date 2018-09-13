/*----------------------------------------*\
  bcksp.es - step.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:07:16
  @Last Modified time: 2018-09-13 18:58:59
\*----------------------------------------*/
import React, { Component } from 'react';


// App component - represents the whole app
export default class HowtoStep extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="step">
				{
					this.props.children && this.props.children.length == 2 ?
						<div className="container">
							{
								React.Children.map(this.props.children, (child, k) =>(
									<div className={(this.props.k + k)%2==0 ? "left" : "right"} key={k}> {child} </div>
								))
							}
						</div>
					:
						null
				}
			</div>
		);
	}
}