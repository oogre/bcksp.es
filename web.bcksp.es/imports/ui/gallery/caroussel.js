/*----------------------------------------*\
  bcksp.es - caroussel.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:24:50
  @Last Modified time: 2018-09-13 19:33:24
\*----------------------------------------*/
import React, { Component } from 'react';

export default class GalleryCaroussel extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="">
				<div className="container">
					{
						this.props.children ?
							<ul className="">
								{
									React.Children.map(this.props.children, (child, k) =>(
										<li className="">
											<a className="" href={child.props.src} key={k} target="blank">
												{child}
											</a>
										</li>
									))
								}
							</ul>
						:
							null
					}
				</div>
			</div>
		);
	}
}
