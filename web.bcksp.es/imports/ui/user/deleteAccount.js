/*----------------------------------------*\
  bcksp.es - deleteAccount.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:45:21
  @Last Modified time: 2020-01-28 23:11:16
\*----------------------------------------*/

import React, {useState, useEffect} from 'react';
import FixeWait from "./../fixe/wait.js";
import { needConfirmation } from './../../utilities/ui.js';
import { successHandler, errorHandler } from './../../utilities/ui.js';


const DeleteAccount = () => {
	const [ loading, setLoading ] = useState(false);
	const [ locale, setLocale ] = useState(i18n.getLocale());
	
	const T = i18n.createComponent("userprofile.danger.deleteAccount");
  	const T2 = i18n.createTranslator("userprofile.danger.deleteAccount");
  	
  	useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const handleDeleteAccount = event => {
		event.preventDefault();
		if(loading)return;
		setLoading(true);

		needConfirmation("userprofile")
		.then(data => {
			Meteor.call("Users.methods.delete.user", (error, res)=>{
				setLoading(false);
				if (errorHandler(error))return;
				successHandler(res)
			});
		})
		.catch(() => setLoading(false) );
		return false;
	}
	
	return (
		<form  onSubmit={handleDeleteAccount}>
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

export default DeleteAccount;