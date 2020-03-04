/*----------------------------------------*\
  bcksp.es - privacy.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:14:26
  @Last Modified time: 2020-03-03 15:25:49
\*----------------------------------------*/
import React from 'react';
import { getTranslations } from "./../../i18n/index.js";

// App component - represents the whole app
const AboutPrivacy = () =>  {
	const {C} = getTranslations("privacy");
	return (
		<div id="aboutPrivacy" className="about">
			<div className="container about__container">
				<h2 className="about__title"><C>title</C></h2>
				<div className="about__content">
					<C 	about={FlowRouter.path("about")} 
						privacy={FlowRouter.path("about")+"#privacy"}
						author={FlowRouter.path("about")+"#auteurs"}
					>
						short
					</C>
				</div>
			</div>
		</div>
	);

}
export default AboutPrivacy;