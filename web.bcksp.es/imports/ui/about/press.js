/*----------------------------------------*\
  bcksp.es - press.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 19:20:53
  @Last Modified time: 2020-03-03 15:24:32
\*----------------------------------------*/
import React from 'react';
import { getTranslations } from "./../../i18n/index.js";
// App component - represents the whole app
const AboutPress = () => {
	const {C, T} = getTranslations("press");
	return (
		<div className="press">
			<div className="text-block">
				<h3 className="text-block__title">
					<C>title</C>
				</h3>
				<ul className="press-list">
					{
						Object.values(T("testimonies")).map((testimony, k) =>(
							<li className="press-list__item" key={k} >
								<p>« <C>{"testimonies."+k}</C> »</p>
							</li>
						))
					}
				</ul>
				<a className="button button--secondary press__contact" href={FlowRouter.path("contact", {type:"bonjour"})}>
					<C>callToAction.button</C>
				</a>
				<p>
					<C>callToAction.message</C>
				</p>
			</div>
		</div>
	);
}

export default AboutPress;