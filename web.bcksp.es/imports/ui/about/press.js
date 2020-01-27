/*----------------------------------------*\
  bcksp.es - press.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-23 19:20:53
  @Last Modified time: 2020-01-27 01:33:29
\*----------------------------------------*/
import React, { useEffect, useState } from 'react';

// App component - represents the whole app
const AboutPress = () => {

	const [ locale, setLocale ] = useState(i18n.getLocale());
	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 
	const T = i18n.createComponent("press");
	const T2 = i18n.createTranslator("press");

	return (
		<div className="press">
			<div className="text-block">
				<h3 className="text-block__title"><T>title</T></h3>
				<ul className="press-list">
					{
						Object.values(T2("testimonies")).map((testimony, k) =>(
							<li className="press-list__item" key={k} >
								<p>« {testimony} »</p>
							</li>
						))
					}
				</ul>
				<a className="button button--secondary press__contact" href={FlowRouter.path("contact")}><T>callToAction.button</T></a>
				<p><T>callToAction.message</T></p>
			</div>
		</div>
	);
}

export default AboutPress;