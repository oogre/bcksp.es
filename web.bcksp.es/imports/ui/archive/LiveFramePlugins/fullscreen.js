/*----------------------------------------*\
  bcksp.es - fullscreen.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 18:08:36
  @Last Modified time: 2020-02-15 19:01:23
\*----------------------------------------*/
import React, { useEffect } from 'react';
import { isVisible } from './../../../utilities/ui.js';;



export default ArchiveFullscreen = ({children, available}) => {
	if(!available) return children;

	const T = i18n.createComponent("archive");
	const fullscreen = FlowRouter.getRouteName() == "livefeed";
	
	const handleKey = event => {
		if(	   event.keyCode == 27 // ESC
			&& fullscreen
		){
			event.preventDefault();
			FlowRouter.go("home");
			return false;
		}
	}

	useEffect(() => {//componentDidMount
		if(!available) return () => {}
		document.querySelector(".bckspes-archive-fullscreen").addEventListener("keydown", handleKey, true);
		document.querySelector(".bckspes-archive-fullscreen").addEventListener("keyup", handleKey, true);
		return () => {//componentWillUnmount
			document.querySelector(".bckspes-archive-fullscreen").removeEventListener("keydown", handleKey, true);
			document.querySelector(".bckspes-archive-fullscreen").removeEventListener("keyup", handleKey, true);
		}
	}, []);

	return (
		<div className="bckspes-archive-fullscreen">
			<a 	href={ FlowRouter.path(fullscreen ? "home" : "livefeed") } 
				className="liveframe__fullscreen button--unstyled" 
			>
				<span className="sr-only">
					<T>fullscreen.button</T>
				</span>
				<svg className="liveframe__fullscreen-icon" width="30" height="30" viewBox="0 0 41 40" xmlns="http://www.w3.org/2000/svg">
					<g fill="#000" fillRule="nonzero">
						<path d="M2 0h11.724a2 2 0 0 1 1.364 3.462L3.365 14.404A2 2 0 0 1 0 12.942V2a2 2 0 0 1 2-2zM2 39.942h11.724a2 2 0 0 0 1.364-3.462L3.365 25.538A2 2 0 0 0 0 27v10.942a2 2 0 0 0 2 2zM38.024 0H26.3a2 2 0 0 0-1.365 3.462L36.66 14.404a2 2 0 0 0 3.365-1.462V2a2 2 0 0 0-2-2zM38.024 39.942H26.3a2 2 0 0 1-1.365-3.462L36.66 25.538A2 2 0 0 1 40.024 27v10.942a2 2 0 0 1-2 2z"/><path d="M9.04 6.419L33.08 30.46l-2.12 2.121L6.918 8.54z"/>
						<path d="M9.04 32.581L33.08 8.54l-2.12-2.121L6.918 30.46z"/>
					</g>
				</svg>
				
			</a>
			{
				React.Children.map(children, child => child)
			}
		</div>
	);

}