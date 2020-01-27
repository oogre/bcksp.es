/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 20:06:21
  @Last Modified time: 2020-01-27 01:38:55
\*----------------------------------------*/

import React, { useEffect, useState } from 'react';
import { config } from './../../startup/config.js';

let page = 0;


String.prototype.debit = function(size=1){
	size = Math.ceil(size);
	if(size==Infinity) return [this.toString()];
	if(size<1)return false;
	if(this.length==0) return false;
	return this.match(new RegExp(".{1,"+ size +"}","g"))
};

String.prototype.symetricPad = function(size=0, char=" "){
	let count = size - this.length;
	if(count < 0) return false;
	if(count == 0)return this.toString()
	if(count == 1)return this.toString()+char;

	let padding = (new Array(count)).fill(char).join("");
	padding = padding.debit(padding.length/2)
	return padding[0]+this.toString()+padding[1];
}

const whitePage = (count=1)=>(new Array(count)).fill(0).map(()=>(new Array(config.book.page.getMaxChar())).fill(" ").join("")).join("")  ;

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
	// cut content into 32 lines block
	content = content.debit(config.book.page.line.char.count)
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
				content
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
	// cut intro into 1 pages block
	content = content.debit(config.book.page.getMaxChar())
	return (
		<div className="folio" style={{
			display: "flex",
			marginBottom:"20px",
			border: "solid 1px black",
			padding : margin.top+"px"+ " " + margin.out+"px"+ " " + margin.bottom+"px",
			height : height + "px"
		}}>
		{	
			content
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

const ArchiveBook = ({intro=false, preface=false, content=false, author=""}) => {

	const [fontSize, setFontSize] = useState(10);
	const [width, setWidth] = useState(10);
	const archivePage = config.book.page.count - (2 + ((intro?.length||0)+(preface?.length||0))/config.book.page.getMaxChar());
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
	
	if(intro){
		intro = intro.replace("[          NUMBER+DATE         ]",  (moment().format('MM-YYYY')+" 1/2").symetricPad(config.book.page.line.char.count));
		intro = intro.replace("[         AUTHOR NAME          ]", author.substr(0, config.book.page.line.char.count).symetricPad(config.book.page.line.char.count));	
		// cut intro into 2 pages block
		intro = intro.debit(2*config.book.page.getMaxChar());
	}
	if(preface){
		// cut intro into 2 pages block
		preface = preface.debit(2*config.book.page.getMaxChar());
	}
	if(content){
		// pad content to fit the book
		content = whitePage(1) + content + whitePage(archivePage);
		// cut intro into 2 pages block
		content = content.debit(2*config.book.page.getMaxChar());
	}
	
	return (
		<div id="book" style={{
			fontFamily: "monospace",
			fontSize: fontSize + "px",
			lineHeight:  1.12 * fontSize + "px",
		}}>
		{ 
			intro
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