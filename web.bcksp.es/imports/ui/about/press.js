/*----------------------------------------*\
  bcksp.es - press.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 19:20:53
  @Last Modified time: 2020-01-31 12:32:00
\*----------------------------------------*/
import React from 'react';

// App component - represents the whole app
const AboutPress = () => {
	const T2 = i18n.createTranslator("press");
	const T = i18n.createComponent(T2);
	
	return (
		<div className="press">
			<div className="text-block">
				<h3 className="text-block__title"><T>title</T></h3>
				<ul className="press-list">
					{
						Object.values(T2("testimonies")).map((testimony, k) =>(
							<li className="press-list__item" key={k} >
								<p>« <T>{"testimonies."+k}</T> »</p>
							</li>
						))
					}
				</ul>
				<a className="button button--secondary press__contact" href={FlowRouter.path("contact", {type:"bonjour"})}>
					<T>callToAction.button</T>
				</a>
				<p>
					<T>callToAction.message</T>
				</p>
			</div>
		</div>
	);
}

export default AboutPress;