/*----------------------------------------*\
  bcksp.es - creation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 15:16:52
  @Last Modified time: 2020-01-13 00:39:13
\*----------------------------------------*/
/*----------------------------------------*\
  bcksp.es - download.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-01-26 16:22:51
  @Last Modified time: 2019-12-21 14:19:52
\*----------------------------------------*/

import T from './../../../../i18n/index.js';
import FixeWait from './../../../fixe/wait.js'
import React, { Component } from 'react';
import FixeError from './../../../fixe/error.js'
import FixeSuccess from './../../../fixe/success.js'
import { withTracker } from 'meteor/react-meteor-data';
import { getMessageFromError } from "./../../../../utilities/ui.js";
//import LiveStream from './../../../archive/LiveStream.js';
import ArchiveWrapper from './../../../archive/wrapper.js';

const SouvenirItemBookCreation = ({}) => {
	return (
		<div className="page__content">
			<div className="container">
				<div className="page__header">
					<h1 className="page__title">
						<T>souvenir.item.book.title</T>
					</h1>
				</div>
				<div className="shop">
					<form className="shop-creation" onSubmit={data=>{console.log(data);return false;}}>
						<div className="shop-creation__order">
							<ArchiveWrapper selector="private"/>
						</div>
						<div>
							<input type="submit" value={i18n.__("souvenir.item.book.button.continue")} className="button button--primary"/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}


export default SouvenirItemBookCreation;