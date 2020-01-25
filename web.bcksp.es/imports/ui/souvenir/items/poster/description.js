/*----------------------------------------*\
  bcksp.es - description.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:06:17
  @Last Modified time: 2020-01-25 19:15:56
\*----------------------------------------*/

import React from 'react';
import T from './../../../../i18n/index.js';

const SouvenirItemPosterDescription = () => {
	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<T>souvenir.item.poster.title</T>
					</h1>
				</div>
				<div className="shop">
					<div className="shop__example-illustration">
						<img className="shop__example-illustration-img" src={i18n.__("souvenir.item.poster.img")} alt="" />
					</div>
					<div className="shop__example-detail">
						<p className="shop__example-description"><T>souvenir.item.poster.description</T></p>
						<p className="shop__example-price"><T>souvenir.item.poster.price</T></p>
						<a href={FlowRouter.path("posterCreation")} className="button button--primary">
							<T>souvenir.item.poster.button.create</T>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SouvenirItemPosterDescription;