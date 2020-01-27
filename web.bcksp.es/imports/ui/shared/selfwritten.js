/*----------------------------------------*\
  bcksp.es - selfwritten.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 16:45:02
  @Last Modified time: 2020-01-27 01:13:02
\*----------------------------------------*/
import React, { useEffect, useState, useRef } from 'react';
import {lerp} from './../../utilities/math.js';

let timer;
let cursor = 0;

const SelfWritten = ({ text }) => {
	const [ currentText, setCurrentText ] = useState("");
	const textRef = useRef(text);
  	textRef.current = text;

	const updateTxt = () => {
		let wait = parseInt(textRef.current[cursor]);
		Meteor.clearTimeout(timer);
		timer = Meteor.setTimeout(updateTxt, (wait || 200) * lerp(0.5, 1.5, Math.random()));	
		if(!wait){
			setCurrentText(textRef.current[cursor]);
		}
		cursor ++;
		cursor %= text.length;
	}

	useEffect(() => {//componentDidMount
		updateTxt();
		return () => {//componentWillUnmount
			Meteor.clearTimeout(timer);
		}
	}, []);

	return (
		<div className="container">
			{
				React.Children.map(currentText.split(""), child => {
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

export default SelfWritten;