/*----------------------------------------*\
  bcksp.es - privacy.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 19:14:26
  @Last Modified time: 2020-02-16 23:27:22
\*----------------------------------------*/
import React from 'react';


// App component - represents the whole app
const AboutPrivacy = () =>  {
	const T = i18n.createComponent("privacy");

	return (
		<div id="aboutPrivacy" className="about">
			<div className="container about__container">
				<h2 className="about__title"><T>title</T></h2>
				<div className="about__content">
					<T 	about={FlowRouter.path("about")} 
						privacy={FlowRouter.path("about")+"#privacy"}
						author={FlowRouter.path("about")+"#auteurs"}
					>short</T>
				</div>
			</div>
		</div>
	);

}
export default AboutPrivacy;