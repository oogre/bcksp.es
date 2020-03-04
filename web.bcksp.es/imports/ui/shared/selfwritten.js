/*----------------------------------------*\
  bcksp.es - selfwritten.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-03-02 16:45:02
  @Last Modified time: 2020-03-02 17:47:57
\*----------------------------------------*/
import React from 'react';
import { random } from './../../utilities/math.js';
import useAnimationFrame from './useAnimationFrame.js';


__SELF_WRITTEN_RUNNING__ = true;

const goLeft = (t) => {
	const i = t.indexOf("^") - 1;
	t = t.replace("^", "");
	t = [t.slice(0, i), "^", t.slice(i)].join('');
	return t;
}
const goRight = (t) => {
	const i = t.indexOf("^") + 1;
	t = t.replace("^", "");
	t = [t.slice(0, i), "^", t.slice(i)].join('');
	return t;
}
const write = (t, letter) => {
	t = t.replace("^", letter+"^");
	return t;
}
const backspace = (t) => {
	const i = t.indexOf("^");
	t = t.replace("^", "");
	t = [t.slice(0, i-1), "^", t.slice(i)].join('');
	return t;
}

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
	React.useEffect(() => {
		cursorRef.current = 0;
		contentRef.current = textArray[cursorRef.current];
	}, [textArray]); 
	const [step, setStep] = React.useState(0)
	const cursorRef = React.useRef(0);
	const waitRef = React.useRef(200);
	const contentRef = React.useRef(textArray[cursorRef.current]);
	const getNext = () => {
		return textArray[(cursorRef.current + 1 + textArray.length) % textArray.length];
	}
	const currentDist = contentRef.current.indexOf("^");
	const nextDist = getNext().indexOf("^");
	const deltaCaretPos = currentDist - nextDist;
	
	waitRef.current = 200;
	if(deltaCaretPos > 0){ // goLeft
		const currentDistToEnd = contentRef.current.length - currentDist;
		const nextDistToEnd = getNext().length - nextDist;
		if(currentDistToEnd == nextDistToEnd){
			contentRef.current = backspace(contentRef.current);
			waitRef.current = 250 * random(1.0, 1.5);
		}else{
			contentRef.current = goLeft(contentRef.current);
		}
	}else if(deltaCaretPos < 0){ // goRight
		if(contentRef.current.length == getNext().length){
			contentRef.current = goRight(contentRef.current);
		}else{
			contentRef.current = write(contentRef.current, getNext().charAt(currentDist));
			waitRef.current = 250 * random(0.5, 1.5);
		}
	}else{ // next
		cursorRef.current += 1;
		cursorRef.current %= textArray.length;
		waitRef.current = 2000 * random(0.5, 1.5);
	}

	useAnimationFrame(time => {
		if(__SELF_WRITTEN_RUNNING__){
			setStep(prevStep => prevStep + 1 );
		}
		return time + waitRef.current;
 	});
	return <FakeInput value={contentRef.current} />
}

export default SelfWritten;