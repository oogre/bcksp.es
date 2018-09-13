/*----------------------------------------*\
  bcksp.es - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:56:40
  @Last Modified time: 2018-09-13 19:08:57
\*----------------------------------------*/
import React, { Component } from 'react';

import HowtoStep from './step.js';

// App component - represents the whole app
export default class HowtoList extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<ul className="howto">
				<li>
					<HowtoStep k={0}>
						<img className="logo--header__picture" src="/images/logo-animated.gif" />
						<div>
							<h3>1. get extension</h3>
							<p>dslfkj;dslfkj sdlkfj dsflkjdfsl;kj fdsl</p>
							<button>download</button>
						</div>
					</HowtoStep>
				</li>
				<li>
					<HowtoStep k={1}>
						<img className="logo--header__picture" src="/images/logo-animated.gif" />
						<div>
							<h3>2. backspace your life</h3>
							<p>dslfkj;dslfkj sdlkfj dsfdlskj dslfkjd sflkjdslkjdfslkdjsf llkjdfsl;kj fdsl</p>
						</div>
					</HowtoStep>
				</li>
				<li>
					<HowtoStep k={2}>
						<img className="logo--header__picture" src="/images/logo-animated.gif" />
						<div>
							<h3>3. see your archive grow</h3>
							<p>dsflkj dsl;kj; sdf;dslfkj sdlkfj dsflkjdfsl;kj fdsl</p>
						</div>
					</HowtoStep>
				</li>
				<li>
					<HowtoStep k={3}>
						<img className="logo--header__picture" src="/images/logo-animated.gif" />
						<div>
							<h3>4. get your souvenir back</h3>
							<p>dslfkj;sdlkj sdflkjdsf lkjdsflkdjfslkdsfjlkdsjf dslfkj sdlkfj dsflkjdfsl;kj fdsl</p>
							<a href={FlowRouter.path("souvenir")}>Souvenir</a>
						</div>
					</HowtoStep>
				</li>
			</ul>
		);
	}
}