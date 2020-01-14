/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 20:06:21
  @Last Modified time: 2020-01-14 01:34:42
\*----------------------------------------*/

import T from './../../i18n/index.js';
import LiveFrame from './LiveFrame.js';
import React, { useEffect, useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Archives } from './../../api/archives/archives.js';
import { config } from './../../startup/config.js';
import { lerp } from './../../utilities/math.js';
import intro from './../../api/books/intro.js';
/*
	columnCount: "2",
	fontFamily: "monospace",
	columnGap: "30px",
	padding: "80px 40px 50px 40px",
	marginBottom: "20px",
	border:"solid 1px black",
*/

const ArchiveLine = ({content}) =>{
	return (
		<div className="line" style={{
			wordBreak: "break-all",
			whiteSpace: "pre-wrap"
		}}>
		{	
			content
		}
		</div>
	);
}

const ArchivePage = ({content, bellePage, margin}) =>{
	return (
		<span className="page" style={{
			width: "50%",
			wordBreak: "break-all",
			whiteSpace: "pre-wrap",
			marginLeft : (bellePage ? margin.in : 0) +"px",
			marginRight : (bellePage ? 0 : margin.in) +"px",
			overflow: "hidden"
		}}>
		{	
			content.match(new RegExp(".{1,"+config.book.page.line.char.count+"}","g"))
			.map((lineContent, k) => (
				<ArchiveLine 
					key={k}
					content={lineContent}
				/>
			))
		}
		</span>
	);
}

const ArchivesFolio = ({content, margin, height}) => {
	return (
		<div className="folio" style={{
			display: "flex",
			marginBottom:"20px",
			border: "solid 1px black",
			padding : margin.top+"px"+ " " + margin.out+"px"+ " " + margin.bottom+"px",
			height : height + "px"
		}}>
		{	
			content.match(new RegExp(".{1,"+ config.book.page.getMaxChar() +"}","g"))
			.map((pageContent, k) => (
				<ArchivePage 
					key={k}
					bellePage={k%2==1}
					content={pageContent}
					margin={margin}
				/>
			))
		}
		</div>
	);
}

let margin = {
	top : 0,
	bottom : 0,
	in : 0,
	out : 0
};

const whitePage = ()=>(new Array(config.book.page.getMaxChar())).fill(" ").join("");

const ArchiveBook = ({content}) => {
	const [fontSize, setFontSize] = useState(10);
	const [width, setWidth] = useState(10);
	
	const computeFontSize = () => {
		setWidth(document.querySelector("#book").clientWidth);
		let target = document.querySelector("#book .folio .page .line");
		let _targetWidth = 1.0/target.clientWidth;
		let testFontSize = fontSize;
		let distanceRatio = Infinity;
		let newDiv = document.createElement("div"); 
		var newContent = document.createTextNode((new Array(config.book.page.line.char.count)).fill('m').join("")); 
		newDiv.appendChild(newContent);  
		newDiv.style["font-family"] = "monospace";
		newDiv.style["position"] = "absolute";
		let t = 0 ; 
		while(Math.abs(distanceRatio) > 0.1 && t < 100){
			newDiv.style["font-size"] = testFontSize+"px";
			document.body.appendChild(newDiv);
	  		let testWidth = newDiv.clientWidth;
	  		document.body.removeChild(newDiv);
	  		distanceRatio = 1 - (testWidth * _targetWidth);
	  		testFontSize += 10 * distanceRatio;
	  		t++;
		}
		setFontSize(testFontSize - 0.125);
	}

	margin.top = fontSize * width * 1 / 210;
	margin.bottom = fontSize * width * 0.635 / 210;
	margin.in = fontSize * width * 0.75 / 210;
	margin.out = fontSize * width * 0.635 / 210;

	useEffect(() => {//componentDidMount
		computeFontSize();
		setTimeout(computeFontSize, 500);
		window.addEventListener("resize", computeFontSize);
		return () => {//componentWillUnmount
			window.removeEventListener("resize", computeFontSize);
		}
	}, []); 
	return (
		<div id="book" style={{
			fontFamily: "monospace",
			fontSize: fontSize + "px",
			lineHeight:  1.12 * fontSize + "px",
		}}>
		{ 
			intro
			.match(new RegExp(".{1,"+ 2*config.book.page.getMaxChar()+"}","g"))
			.map((folioContent, k) => (
				<ArchivesFolio 
					key={k}
					content={folioContent}
					height={width * 180/210}
					margin={margin}
				/>
			))				
		}
		{ 
			(whitePage() + content)
			.match(new RegExp(".{1,"+ 2*config.book.page.getMaxChar()+"}","g"))
			.map((folioContent, k) => (
				<ArchivesFolio 
					key={k}
					content={folioContent}
					height={width * 180/210}
					margin={margin}
				/>
			))				
		}
		</div>
	);
};

export default ArchiveBook;