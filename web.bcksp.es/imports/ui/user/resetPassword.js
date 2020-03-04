/*----------------------------------------*\
  bcksp.es - resetPassword.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-19 20:33:10
  @Last Modified time: 2020-03-04 18:55:44
\*----------------------------------------*/

import React from 'react';
import FixeWait from "./../fixe/wait.js";
import { getTranslations } from "./../../i18n/index.js";
import { ResetPassword } from '../../api/users/methods.js';
import { successHandler, errorHandler } from './../../utilities/ui.js';

const ResetPasswordUI = () => {
	const [loading, setLoading] = React.useState(false);
	const [ locale, setLocale ] = React.useState(i18n.getLocale());
	const {C, T} = getTranslations("userprofile.identification.password");
  	React.useEffect(() => {//componentDidMount
		i18n.onChangeLocale(setLocale);
		return () => {//componentWillUnmount
			i18n.offChangeLocale(setLocale);
		}
	}, []); 

	const handleResetPassword = event => {
		event.preventDefault();
		if(loading)return;
		setLoading(true);
		ResetPassword.call({}, (error, res) =>{
			setLoading(false);
			if(errorHandler(error))return;
			successHandler(res);
		});
		return false;
	}

	return (
		<form  onSubmit={handleResetPassword}>
			<h2>
				<C>label</C>
			</h2>
			<ul className="toggle-list">
				<li>
					<span className="input-wrapper--inline">
						{ loading && <FixeWait/> }
						{ !loading && 
							<input className="button button--primary" type="submit" value={T("submit")}/>
						}
					</span>
				</li>
			</ul>
		</form>
	);
}

export default ResetPasswordUI;