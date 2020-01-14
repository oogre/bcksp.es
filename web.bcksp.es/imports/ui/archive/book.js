/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 20:06:21
  @Last Modified time: 2020-01-14 08:37:05
\*----------------------------------------*/

import T from './../../i18n/index.js';
import React, { useEffect, useState } from 'react';
import { config } from './../../startup/config.js';

let page = 0;

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

const ArchivePage = ({content, bellePage, margin, header, fontSize}) =>{
	page ++;
	return (
		<span className="page--wrapper" style={{
			width: "50%",
			marginLeft : (bellePage ? margin.in : 0) +"px",
			marginRight : (bellePage ? 0 : margin.in) +"px",
			position: "relative"
		}}>
			<div className="header" style={{
				position: "absolute",
				top : -2*fontSize+"px",
				width: "100%",
				textAlign: "center"
			}}>
				{ header && !bellePage && 
					<span style={{
						left: "0",
    					position: "absolute"
					}}>
						{page}
					</span>
				}
				{ header &&
					<span style={{
						fontWeight: "bold"
					}}>
						{header}
					</span>
				}
				{ header && bellePage && 
					<span style={{
						right: "0",
    					position: "absolute"
					}}>
						{page}
					</span>
				}
			</div>
			<div className="page" style={{
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
			</div>
		</span>
	);
}

const ArchivesFolio = ({content, margin, height, header, fontSize, folioCount}) => {
	const isBellePage = k => k%2==1;
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
					header={(folioCount!=0 || k!=0) && header}
					bellePage={isBellePage(k)}
					content={pageContent}
					margin={margin}
					fontSize={fontSize}
				/>
			))
		}
		</div>
	);
}




const whitePage = (count=1)=>(new Array(count)).fill(0).map(()=>(new Array(config.book.page.getMaxChar())).fill(" ").join("")).join("")  ;

const ArchiveBook = ({intro, preface, content}) => {
	const [fontSize, setFontSize] = useState(10);
	const [width, setWidth] = useState(10);
	const archivePage = config.book.page.count - (2 + ((intro?.length||0)+(preface?.length||0))/config.book.page.getMaxChar());
	content = whitePage(1) + content + whitePage(archivePage);
	const margin = {
		top : fontSize * width * 1 / 210,
		bottom : fontSize * width * 0.635 / 210,
		in : fontSize * width * 0.75 / 210,
		out : fontSize * width * 0.635 / 210
	};
	page = 0 ; 
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
					margin={margin}
					fontSize={fontSize}
					content={folioContent}
					height={width * 180/210}
				/>
			))				
		}
		{ 
			preface
			.match(new RegExp(".{1,"+ 2*config.book.page.getMaxChar()+"}","g"))
			.map((folioContent, k) => (
				<ArchivesFolio 
					key={k}
					folioCount={k}
					margin={margin}
					fontSize={fontSize}
					content={folioContent}
					height={width * 180/210}
					header="bcksp.es - préface"
				/>
			))				
		}
		{ 
			content
			.match(new RegExp(".{1,"+ 2*config.book.page.getMaxChar()+"}","g"))
			.map((folioContent, k) => (
				<ArchivesFolio 
					key={k}
					folioCount={k}
					margin={margin}
					fontSize={fontSize}
					content={folioContent}
					header="bcksp.es - archive"
					height={width * 180/210}
				/>
			))				
		}
		</div>
	);
};

export default ArchiveBook;