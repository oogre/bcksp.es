/*----------------------------------------*\
  bcksp.es - caroussel.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:24:50
  @Last Modified time: 2020-01-28 21:33:54
\*----------------------------------------*/
import React from 'react';

const GalleryCaroussel = ({children}) => {
	return (
		<div className="">
			<div className="container">
				{
					children &&
						<ul className="">
							{
								React.Children.map(children, (child, k) =>(
									<li className="">
										<a className="" href={child.props.src} key={k} target="blank">
											{child}
										</a>
									</li>
								))
							}
						</ul>
				}
			</div>
		</div>
	);
}

export default GalleryCaroussel;