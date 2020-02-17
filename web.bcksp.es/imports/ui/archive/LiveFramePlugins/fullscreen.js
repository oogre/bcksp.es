/*----------------------------------------*\
  bcksp.es - fullscreen.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-15 18:08:36
  @Last Modified time: 2020-02-16 15:28:21
\*----------------------------------------*/
import React from 'react';

export default ArchiveFullscreen = ({children, available}) => {

	React.useEffect(() => {//componentDidMount
		document.addEventListener("keydown", closeFullScreenHandler, true);
		document.addEventListener("keyup", closeFullScreenHandler, true);
		return () => {//componentWillUnmount
			document.removeEventListener("keydown", closeFullScreenHandler, true);
			document.removeEventListener("keyup", closeFullScreenHandler, true);
		}
	}, []);

	const T = i18n.createComponent("archive");
	const isFullscreenActivated = FlowRouter.getRouteName() == "livefeed";
	const path = FlowRouter.path(isFullscreenActivated ? "home" : "livefeed");

	const closeFullScreenHandler = event => {
		if(		available
			&& 	isFullscreenActivated
			&&  event.keyCode == 27 // ESC
		){
			event.preventDefault();
			FlowRouter.go("home");
			return false;
		}
	}

	if(!available) return children;
	return (
		<div className="bckspes-archive-fullscreen">
			<a 	href={ path } 
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