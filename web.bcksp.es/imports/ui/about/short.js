/*----------------------------------------*\
  bcksp.es - short.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:01:42
  @Last Modified time: 2018-09-13 18:04:53
\*----------------------------------------*/
import React, { Component } from 'react';


// App component - represents the whole app
export default class AboutShort extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="about">
				<div className="container">
					<h2>description</h2>
					<div>
						sdfjlsdfkj dsflkjds flkdsjf dslkfj dfslkfdjs lfdskj fslkjfs dlfkjs fdlskkjfsldkfkjsd flksjf lskfjsdlfkkjds flkdsjf dlskfjdslfkjdsfldskfj dslfkdsj fldskfj dsflkjds fldskfj dslfkj.
						<span>
							<a href={FlowRouter.path("about")}>
								learn more
							</a>
						</span>
					</div>
				</div>
			</div>
		);
	}
}