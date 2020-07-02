/*----------------------------------------*\
  bcksp.es - book.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-01-13 20:06:21
  @Last Modified time: 2020-06-23 12:06:10
\*----------------------------------------*/

import React from 'react';
import { config } from './../../startup/config.js';
import {ArchiveLoadMore} from "./../archive/LiveFramePlugins/loadMore.js";
import FixeWait from "./../fixe/wait.js";
let pageCounter = 0;


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

const ArchivePage = ({content, bellePage, margin, header, fontSize}) =>{
	pageCounter ++;
	
	return (
		<span className="page--wrapper" style={{
			marginLeft : (bellePage ? margin.in : 0) +"px",
			marginRight : (bellePage ? 0 : margin.in) +"px",
		}}>
			<div className="page--header" style={{
				top : -2*fontSize+"px",
			}}>
				{ header && !bellePage && 
					<span className="page--counter left">
						{pageCounter}
					</span>
				}
				{ header &&
					<span className="page--title">
						{header}
					</span>
				}
				{ header && bellePage && 
					<span className="page--counter right">
						{pageCounter}
					</span>
				}
			</div>
			<div className="page--content">
			{	
				// cut content into 32 lines block
				content.debit(config.book.page.line.char.count)
				.map((lineContent, k) => (
					<div key={k} className="line--wrapper">
						{	
							lineContent
						}
					</div>
				))
			}
			</div>
		</span>
	);
}

const ArchivesFolio = ({content, margin, height, header, fontSize, folioCount}) => {
	return (
		<div className="folio" style={{
			padding : margin.top+"px"+ " " + margin.out+"px"+ " " + margin.bottom+"px",
			height : height + "px"
		}}>
		{	
			// cut intro into 1 pages block
			content.debit(config.book.page.getMaxChar())
			.map((pageContent, k) => (
				<ArchivePage 
					key={k}
					header={(folioCount!=0 || k!=0) && header}
					bellePage={k%2==1}
					content={pageContent}
					margin={margin}
					fontSize={fontSize}
				/>
			))
		}
		</div>
	);
}

const GeneratorBook = ({intro=false, preface=false, content=false, blocks, author="", seeMore, blockMaxLength}) => {
	pageCounter = 0 ; 
	const bookRatio = 180/210;
	const split = whitePage(2).debit(2*config.book.page.getMaxChar());//split before archive
	const [fontSize, setFontSize] = React.useState(10);
	const width = React.useRef(10);
	const blocksRef = React.useRef(blocks);
	blocksRef.current = blocks;
	const margin = {
		top : fontSize * width.current * 1 / 210,
		bottom : fontSize * width.current * 0.635 / 210,
		in : fontSize * width.current * 0.75 / 210,
		out : fontSize * width.current * 0.635 / 210
	};
	const computeFontSize = () => {
		let target = document.querySelector(".book .folio .page--wrapper .line--wrapper");
		let _targetWidth = 1.0/target.clientWidth;
		let testFontSize = fontSize;
		let distanceRatio = Infinity;
		let newDiv = document.createElement("div"); 
		let newContent = document.createTextNode((new Array(config.book.page.line.char.count)).fill('m').join("")); 
		newDiv.appendChild(newContent);  
		newDiv.style["font-family"] = window.getComputedStyle(target, null).getPropertyValue("font-family");
		newDiv.style["position"] = "absolute";
		for(let t = 0 ; Math.abs(distanceRatio) > 0.1 && t < 100 ; t++) {
			newDiv.style["font-size"] = testFontSize+"px";
			document.body.appendChild(newDiv);
	  		let testWidth = newDiv.clientWidth;
	  		document.body.removeChild(newDiv);
	  		distanceRatio = 1 - (testWidth * _targetWidth);
	  		testFontSize += 10 * distanceRatio;
		}
		setFontSize(testFontSize - 0.125);
		width.current = document.querySelector(".book").clientWidth;
	}
	
	React.useEffect(() => {//componentDidMount
		computeFontSize();
		setTimeout(computeFontSize, 500);
		window.addEventListener("resize", computeFontSize);
		return () => {//componentWillUnmount
			window.removeEventListener("resize", computeFontSize);
		}
	}, []);
	
	if(intro){
		intro = intro.replace("[          NUMBER+DATE         ]", (moment().format('MM-YYYY')+" 1/2").symetricPad(config.book.page.line.char.count));
		intro = intro.replace("[         AUTHOR NAME          ]", author.substr(0, config.book.page.line.char.count).symetricPad(config.book.page.line.char.count));	
		// cut into 2 pages block
		intro = intro.debit(2*config.book.page.getMaxChar());
	}

	if(preface){
		// cut into 2 pages block
		preface = preface.debit(2*config.book.page.getMaxChar());
	}
	
	content = _.isArray(blocks) ? _.pluck(blocks, 'content').join(" ") : content;
	if(content!==false && !_.isEmpty(content)){
		// cut into 2 pages block
		content = content.debit(2*config.book.page.getMaxChar());
		//limit content to 64 double pages
		content = content.slice(0, config.book.page.count/2);
	}

	React.useEffect(() => {//blocksUpdate
		if(content!==false && !_.isEmpty(content) && content.length<2 && seeMore){
			//load at least 1 double page
			seeMore(10);
		}
	}, [seeMore]);

	return (
		<div className="book" style={{
			fontSize : fontSize + "px",
			lineHeight:  1.12 * fontSize + "px",
			//height : width.current * bookRatio * 1.25,
		}}>
			{ 
				_.isArray(intro) && intro
				.map((folioContent, k) => (
					<ArchivesFolio 
						key={k}
						margin={margin}
						fontSize={fontSize}
						content={folioContent}
						height={width.current * bookRatio}
					/>
				))				
			}
			{ 
				_.isArray(preface) && preface
				.map((folioContent, k) => (
					<ArchivesFolio 
						key={k}
						folioCount={k}
						margin={margin}
						fontSize={fontSize}
						content={folioContent}
						height={width.current * bookRatio}
						header="bcksp.es - préface"
					/>
				))				
			}
			{ 
				(_.isArray(preface) || _.isArray(intro)) && _.isArray(split) && split
				.map((folioContent, k) => (
					<ArchivesFolio 
						key={k}
						margin={margin}
						fontSize={fontSize}
						content={folioContent}
						height={width.current * bookRatio}
					/>
				))				
			}
			<ArchiveLoadMore available={_.isFunction(seeMore) && blocksRef.current && blocksRef.current.length < blockMaxLength} seeMore={seeMore} >
			{
				_.isArray(content) && content
				.map((folioContent, k) => (
					<ArchivesFolio 
						key={k}
						margin={margin}
						fontSize={fontSize}
						content={folioContent}
						header="bcksp.es - archive"
						height={width.current * bookRatio}
					/>
				))				
			}
			</ArchiveLoadMore>
		</div>
	);
};

export default GeneratorBook;