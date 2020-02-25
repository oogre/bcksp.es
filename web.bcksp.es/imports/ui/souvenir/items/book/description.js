/*----------------------------------------*\
  bcksp.es - description.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:06:17
  @Last Modified time: 2020-02-24 20:01:29
\*----------------------------------------*/

import React from 'react';
import { config } from './../../../../startup/config.js';

const SouvenirItemBookDescription = () => {
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	
	const T2 = i18n.createTranslator("souvenir.item.book");
	const T = i18n.createComponent(T2);
  	
  	
  	React.useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<T>title</T>
					</h1>
				</div>
				<div className="shop">
					<div className="shop__example-illustration">
						<img className="shop__example-illustration-img" src={T2("img")} alt="" />
					</div>
					<div className="shop__example-detail">
						<p className="shop__example-description"><T>description</T></p>
						<p className="shop__example-price"><T amount={config.souvenir.book.basic.price.amount}>price</T></p>
						<a href={FlowRouter.path("bookCreation")} className="button button--primary">
							<T>button.create</T>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SouvenirItemBookDescription;
