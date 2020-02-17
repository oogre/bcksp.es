/*----------------------------------------*\
  bcksp.es - short.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:01:42
  @Last Modified time: 2020-02-17 12:09:53
\*----------------------------------------*/
import React from 'react';
;

// App component - represents the whole app
const AboutShort = () => {
	const T = i18n.createComponent("about");


	return (
		<div id="aboutIntro" className="about--intro">
			<div className="container about__container about--intro__container">
				<h2 className="about__title"><T>title</T></h2>
				<div className="about__content">
					<T
						security={FlowRouter.path("about")+"#security"}
						privacy={FlowRouter.path("about")+"#privacy"}
						editor={FlowRouter.path("about")+"#edition"}
						about={FlowRouter.path("about")}
						souvenir={FlowRouter.path("souvenir")}
					>
						short
					</T>
				</div>
			</div>
		</div>
	);
}

export default AboutShort;