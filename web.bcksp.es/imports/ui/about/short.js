/*----------------------------------------*\
  bcksp.es - short.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 18:01:42
  @Last Modified time: 2020-03-03 15:26:25
\*----------------------------------------*/
import React from 'react';
import { getTranslations } from "./../../i18n/index.js";

// App component - represents the whole app
const AboutShort = () => {
	
	const {C} = getTranslations("about");
	return (
		<div id="aboutIntro" className="about--intro">
			<div className="container about__container about--intro__container">
				<h2 className="about__title">
					<C>title</C>
				</h2>
				<div className="about__content">
					<C
						security={FlowRouter.path("about")+"#security"}
						privacy={FlowRouter.path("about")+"#privacy"}
						editor={FlowRouter.path("about")+"#edition"}
						about={FlowRouter.path("about")}
						souvenir={FlowRouter.path("souvenir")}
					>
						short
					</C>
				</div>
			</div>
		</div>
	);
}

export default AboutShort;