/*----------------------------------------*\
  bcksp.es - offline.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-05-09 18:13:46
  @Last Modified time: 2020-02-18 17:28:10
\*----------------------------------------*/
import React from 'react';
import { T } from './../../utilities/tools.js';
import { config } from './../../shared/config.js';
import { sendMessage } from './../../utilities/com.js';
import { log, info, warn, error } from './../../utilities/log.js';
import { isNumber } from 'underscore';

const OfflineMenu = () => {
	const cursor = React.useRef(0);
	const caretAt = React.useRef(0);
	const sentence = [
		1000,
		"^",
		"b^",
		"ba^",
		"bac^",
		"back^",
		"backsp^",
		"backspa^",
		"backspac^",
		"backspace^",
		"backspace ^",
		"backspace w^",
		"backspace wi^",
		"backspace wil^",
		"backspace will^",
		"backspace will ^",
		"backspace will b^",
		"backspace will be^",
		"backspace will be ^",
		"backspace will be b^",
		"backspace will be ba^",
		"backspace will be bac^",
		"backspace will be back^",
		1000,
		"backspace will be bac^k",
		"backspace will be ba^ck",
		"backspace will be b^ack",
		"backspace will be ^back",
		"backspace will be^ back",
		"backspace will b^e back",
		"backspace will ^be back",
		"backspace will^ be back",
		"backspace wil^l be back",
		"backspace wi^ll be back",
		"backspace w^ill be back",
		"backspace ^will be back",
		"backspace^ will be back",
		"backspac^ will be back",
		"backspa^ will be back",
		"backsp^ will be back",
		"backsp.^ will be back",
		"backsp.e^ will be back",
		"backsp.es^ will be back",
		1000,
		"backsp.e^s will be back",
		"backsp.^es will be back",
		"backsp^.es will be back",
		"backs^p.es will be back",
		"back^sp.es will be back",
		"bac^ksp.es will be back",
		"ba^cksp.es will be back",
		"b^cksp.es will be back",
		1000,
		"bc^ksp.es will be back",
		"bck^sp.es will be back",
		"bcks^p.es will be back",
		"bcksp^.es will be back",
		"bcksp.^es will be back",
		"bcksp.e^s will be back",
		"bcksp.es^ will be back",
		"bcksp.es ^will be back",
		"bcksp.es w^ill be back",
		"bcksp.es wi^ll be back",
		"bcksp.es wil^l be back",
		"bcksp.es will^ be back",
		"bcksp.es will ^be back",
		"bcksp.es will b^e back",
		"bcksp.es will be^ back",
		"bcksp.es will be ^back",
		"bcksp.es will be b^ack",
		"bcksp.es will be ba^ck",
		"bcksp.es will be bac^k",
		"bcksp.es will be back^",
		"bcksp.es will be back ^",
		"bcksp.es will be back s^",
		"bcksp.es will be back so^",
		"bcksp.es will be back soo^",
		"bcksp.es will be back soon^",
		1000,
		"bcksp.es will be back soo^",
		"bcksp.es will be back so^",
		"bcksp.es will be back s^",
		"bcksp.es will be back ^",
		"bcksp.es will be back^",
		"bcksp.es will be bac^",
		"bcksp.es will be ba^",
		"bcksp.es will be b^",
		"bcksp.es will be ^",
		"bcksp.es will be^",
		"bcksp.es will b^",
		"bcksp.es will ^",
		"bcksp.es will^",
		"bcksp.es wil^",
		"bcksp.es wi^",
		"bcksp.es w^",
		"bcksp.es ^",
		"bcksp.es^",
		"bcksp.e^",
		"bcksp.^",
		"bcksp^",
		"bcks^",
		"bck^",
		"bc^",
		"b^",
		"^"
	];

	const handleGoBcksp = event => {
		sendMessage("openTab", config.getHomeUrl())
		.then(data => info(data))
		.catch(e => error(e));;
	}

	const updateTxt = () => {
		document.querySelector("textarea").focus();
		if(isNumber(sentence[cursor.current])){
			setTimeout(updateTxt, sentence[cursor.current]);	
		}else{
			var text = sentence[cursor.current];
			caretAt.current = text.indexOf("^");
			text = text.replace("^", "");
			document.querySelector("textarea").value = text;
			setTimeout(updateTxt, 100);	
		}
		document.querySelector("textarea").selectionStart = 
		document.querySelector("textarea").selectionEnd = caretAt.current;
		cursor.current ++;
		cursor.current %= sentence.length;
	}

	React.useEffect(() => {//componentDidMount
		cursor.current = 0;
		caretAt.current = 0;
		updateTxt();
		return () => {//componentWillUnmount
		
		}
	}, []);

	

	return (
		<div className="bcksp-popup__content">
			<div className="bcksp-popup__body">
				<textarea 	autofocus="" 
							spellcheck="false"
							style={{
								width : "100%",
								height : "100%",
								border: "none",
							    overflow: "auto",
							    outline: "none",
							    boxShadow: "none",
							    fontSize: "15px",
							    resize: "none"
							}}
				>
					bcksp.es will be back
				</textarea>
			</div>
			<div className="bcksp-popup__extension-link">
				<button className="button button--secondary button--extension-link"
						onClick={handleGoBcksp}
				>
						<T.span text={{ key : "extension.links.visit" }}/>
				</button>
			</div>
		</div>
	);
}

export default OfflineMenu;