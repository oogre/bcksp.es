/*----------------------------------------*\
  bcksp.es - description.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:06:17
  @Last Modified time: 2020-03-04 18:33:38
\*----------------------------------------*/

import React from 'react';
import { config } from './../../../../startup/config.js';
import { getTranslations } from "./../../../../i18n/index.js";

const SouvenirItemBookDescription = () => {
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("souvenir.item.book");
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
						<C>title</C>
					</h1>
				</div>
				<div className="shop">
					<div className="shop__example-illustration">
						<img className="shop__example-illustration-img" src={T("img")} alt="" />
					</div>
					<div className="shop__example-detail">
						<p className="shop__example-description">
							<C>description</C>
						</p>
						<p className="shop__example-price">
							<C amount={config.souvenir.book.basic.price.amount}>price</C>
						</p>
						<a href={FlowRouter.path("bookCreation")} className="button button--primary">
							<C>button.create</C>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SouvenirItemBookDescription;
