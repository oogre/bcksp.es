/*----------------------------------------*\
  bcksp.es - header.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-13 14:19:59
  @Last Modified time: 2020-03-02 17:56:51
\*----------------------------------------*/
import React from 'react';
import MenuMain from './main.js';

const MenuHeader = ({noMain}) => {
	return (
		<header className="main-header">
			<div className="container--large main-header__container">
				<h1 className="logo logo--header">
					<a className="link--unstyled" href={FlowRouter.path("home")}>
						<img className="logo--header__picture" src="/images/logo.svg" alt="#bcksp.es"/>
					</a>
				</h1>
				{
					!noMain && <MenuMain/>
				}
			</div>
		</header>
	);
}


export default MenuHeader;