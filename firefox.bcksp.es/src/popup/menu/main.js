/*----------------------------------------*\
  bcksp.es - logedin.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-10-03 11:35:44
  @Last Modified time: 2020-03-12 11:58:51
\*----------------------------------------*/

import React from 'react';
import Blacklist from './../blacklist.js';
import { T } from './../../utilities/tools.js';
import { config } from './../../shared/config.js';
import { sendMessage, on } from './../../utilities/com.js';
import { log, info, warn, error } from './../../utilities/log.js';


const MainMenu = ({onLoginStatusChange}) => {
	const [archiveSize, setArchiveSize] = React.useState(0);
	const [archiveRatio, setArchiveRatio] = React.useState(0);
	
	React.useEffect(() => {//componentDidMount
		sendMessage("getArchiveSize")
		.then(archiveSize => setArchiveSize(archiveSize))
		.catch(e => error(e));

		sendMessage("getArchiveRatio")
		.then(archiveRatio => setArchiveRatio(archiveRatio))
		.catch(e => error(e));

		on("archiveSize", (data, resolve) => {
			setArchiveSize(data)
			resolve(true);
		});

		on("archiveRatio", (data, resolve) => {
			setArchiveRatio(data);
			resolve(true);
		});
		return () => {//componentWillUnmount
		
		}
	}, []);
		
	const handleLogout = event => {
		sendMessage("logout")
		.then(isLoggedIn => onLoginStatusChange(isLoggedIn))
		.catch(e => error(e));
	}

	const handleMyFeed = event => {
		sendMessage("openTab", config.getMyFeedUrl())
		.then(data => info(data))
		.catch(e => error(e));
	}

	const handleMySettings = event => {
		sendMessage("openTab", config.getProfileUrl())
		.then(data => info(data))
		.catch(e => error(e));
	}
	const handleLearnMore = event => {
		sendMessage("openTab", config.getAboutUrl())
		.then(data => info(data))
		.catch(e => error(e));
	}
	return (
		<div className="bcksp-popup__content">
			<div className="bcksp-popup__body">
				{
					<Blacklist/>
				}
				<div>
					<div className="bcksp-popup__goal">
						<T.p text={{ key : "extension.archive.length", value : archiveSize }} />
					</div>
					<a href="#" onClick={handleLearnMore}>
						<T.span text={{ key: "extension.learnmore" }}/>
					</a>
				</div>
			</div>
			<div className="bcksp-popup__counter">
				<div className="bcksp-popup__counter-foreground" 
					title={(archiveRatio * 100).toFixed(2) + "%"}
					style={{
						width: (archiveRatio * 100).toFixed(2) + "%",
					}}>
				</div>
				<T.p className="sr-only" text={{ key : "extension.archive.ratio", value : (archiveRatio * 100).toFixed(2) }} />
			</div>
			<ul className="bcksp-popup__user-menu">
				<li className="bcksp-popup__user-menu-item">
					<button className="button button--secondary bcksp-popup__user-menu-button"
							onClick={handleMySettings}
					>
							<T.span text={{ key : "extension.links.security" }}/>
					</button>
				</li>
				<li className="bcksp-popup__user-menu-item">
					<button className="button button--secondary bcksp-popup__user-menu-button"
							onClick={handleMyFeed}
					>
							<T.span text={{ key: "extension.links.archive" }}/>
					</button>
				</li>
				<li className="bcksp-popup__user-menu-item">
					<button className="button button--secondary bcksp-popup__user-menu-button logout"
							onClick={handleLogout}
					>
							<T.span text={{ key: "extension.links.logout" }}/>
					</button>
				</li>
			</ul>
		</div>
	);
	
}

export default MainMenu;