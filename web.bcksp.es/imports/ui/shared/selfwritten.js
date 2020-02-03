/*----------------------------------------*\
  bcksp.es - selfwritten.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 16:45:02
  @Last Modified time: 2020-02-02 20:26:02
\*----------------------------------------*/
import useAnimationFrame from './useAnimationFrame.js';
import React, { useState, useRef } from 'react';
import {lerp} from './../../utilities/math.js';


__SELF_WRITTEN_RUNNING__ = true;

const FakeInput = ({ value }) => {
	return (
		<div className="container" style={{whiteSpace: "pre-wrap"}}>
			{
				React.Children.map(value.split(""), child => {
					return (
						child == "^" ? 
							<span className="caret blink">|</span>
						:
							<span className="char">{child}</span>
					);
				})
			}
		</div>
	);
}

const SelfWritten = ({ textArray }) => {
	const [step, setStep] = React.useState(33)
	const textArrayRef = useRef(textArray);
	const textRef = useRef("");
	textArrayRef.current = textArray;
	let cursor = step % (textArrayRef?.current?.length || 1);
	if(textArrayRef.current && _.isNaN(parseInt(textArrayRef.current[cursor]))){
		textRef.current = textArrayRef.current[cursor];	
	}
	useAnimationFrame(time => {
		// Pass on a function to the setter of the state
		// to make sure we always have the latest state
		let wait = 1000;
		
		if(__SELF_WRITTEN_RUNNING__){
			let _step ;
			setStep(prevStep => {
				_step = prevStep + 1;
				return _step
			});
			wait = (parseInt(textArrayRef.current[_step % textArrayRef.current.length])||200) * lerp(0.5, 1.5, Math.random());
		}
		return time + wait;
 	});	
	return <FakeInput value={textRef.current} />
}

export default SelfWritten;