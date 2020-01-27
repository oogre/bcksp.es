/*----------------------------------------*\
  bcksp.es - deleteArchive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:43:12
  @Last Modified time: 2020-01-26 18:04:37
\*----------------------------------------*/

import React, {useState} from 'react';
import T from './../../i18n/index.js';
import FixeWait from "./../fixe/wait.js";
import { needConfirmation } from './../../utilities/ui.js';
import { successHandler, errorHandler } from './../../utilities/ui.js';


const DeleteArchive  = () => {
	const [ loading, setLoading ] = useState(false);
	
	const handleDeleteArchive = event => {
		event.preventDefault();
		if(loading)return;
		setLoading(true);

		needConfirmation("userprofile")
		.then(data => {
			Meteor.call("Archives.methods.clear", (error, res)=>{
				setLoading(false);
				if (errorHandler(error))return;
				successHandler(res)
			});
		})
		.catch(() => setLoading(false) );
		return false;
	}

	return (
		<form  onSubmit={handleDeleteArchive}>
			<h2>
				<T>userprofile.danger.deleteArchive.label</T>
			</h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						{ loading && <FixeWait/> }
						{ !loading && 
							<input className="button button--secondary" type="submit" value={i18n.__("userprofile.danger.deleteArchive.submit")}/>
						}
					</span>
				</li>
			</ul>
		</form>
	);
}

export default DeleteArchive;