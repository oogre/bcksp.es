/*----------------------------------------*\
  bcksp.es - deleteArchive.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:43:12
  @Last Modified time: 2020-01-28 23:10:38
\*----------------------------------------*/


import FixeWait from "./../fixe/wait.js";
import React, {useState, useEffect} from 'react';
import { needConfirmation } from './../../utilities/ui.js';
import { successHandler, errorHandler } from './../../utilities/ui.js';


const DeleteArchive  = () => {
	const [ loading, setLoading ] = useState(false);
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T = i18n.createComponent("userprofile.danger.deleteArchive");
  	const T2 = i18n.createTranslator("userprofile.danger.deleteArchive");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

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
				<T>label</T>
			</h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						{ loading && <FixeWait/> }
						{ !loading && 
							<input className="button button--secondary" type="submit" value={T2("submit")}/>
						}
					</span>
				</li>
			</ul>
		</form>
	);
}

export default DeleteArchive;