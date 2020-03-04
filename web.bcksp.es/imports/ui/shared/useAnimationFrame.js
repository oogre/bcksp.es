/*----------------------------------------*\
  bcksp.es - useAnimationFrame.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 16:45:02
  @Last Modified time: 2020-03-02 17:27:42
\*----------------------------------------*/
import React from 'react';

const useAnimationFrame = callback => {
	// Use useRef for mutable variables that we want to persist
	// without triggering a re-render on their change
	const requestRef = React.useRef();
	const nextRef = React.useRef();
	nextRef.current = 0;
	
	const animate = time => {
		if (time > nextRef.current) {
			let wait = callback(time);
			nextRef.current = _.isNumber(wait) ? wait : 0; 
		}
		requestRef.current = requestAnimationFrame(animate);	
	}

	React.useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}, []); // Make sure the effect runs only once
}

export default useAnimationFrame;