/*----------------------------------------*\
  bcksp.es - generator.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-06-02 19:14:06
  @Last Modified time: 2018-06-04 00:23:13
\*----------------------------------------*/
import PDFDocument from 'pdfkit';
import fs from "fs";
import { Archives } from './../archives/archives.js';


class Book {
	constructor(adress, font, content){
		this.pageCount = 0;
		this.folioCount = 0;
		this.doc = new PDFDocument({
			size: "A4", 
			margin: 0,
			bufferPages: true
		});

		this.doc.pipe(
			fs.createWriteStream(adress)
		);
		this.doc.font(font).fontSize(12);
		console.log(content.length);
		content = content.substr(0, 30*25*152);
		content = content.match(/.{1,30}/g).join("\n");
		content = content.match(/(.{1,30}\n){1,25}/g);
		let t = [];
		content.map((page, k)=>{
			let i = Math.floor(k/8);
			if(t[i] == undefined)t[i] = [];
			t[i].push(page);
		})
		content = t;
		content.map(c =>{
			new Sheet(this, c);	
		})
		
		this.doc.end();
	}
	addPage(){
		this.doc.addPage();
		this.pageCount++;
	}
}

class Sheet {
	constructor(book, content){
		this.book = book;
		if(book.pageCount != 0){
			book.addPage();
		}
		this.drawSpliter();
		book.addPage();
		this.drawSpliter();
		
		content.map(c =>{
			new Folio(book, c);
		});
	}
	drawSpliter(){
		this.book.doc.switchToPage(this.book.pageCount);
		this.book.doc
			.moveTo(595*0.5, 0)
		 	.lineTo(595*0.5, 10)
		 	.stroke()
			.moveTo(595*0.5, 841)
		 	.lineTo(595*0.5, 841-10)
		 	.stroke()
			.moveTo(0, 841*0.5)
		 	.lineTo(10, 841*0.5)
		 	.stroke()
			.moveTo(595, 841*0.5)
		 	.lineTo(595-10, 841*0.5)
		 	.stroke()
	}
}

class Folio {
	constructor(book, txt){
		//console.log(txt);
		this.book = book;
		this.folioPerSheet = 8;
		this.num = ++book.folioCount;
		this.type = 1 + (this.num % this.folioPerSheet);
		switch(this.type){
			case 8 : case 7 : case 4 : case 3 :
				book.doc.switchToPage(book.pageCount);
				break;
			case 6 : case 5 : case 2 : case 1 :
				book.doc.switchToPage(book.pageCount-1);
				break;
		}
		book.doc.save();
		switch(this.type){
			case 8 : case 2 :
				book.doc.translate(595, 0);
			break;
			case 7 : case 6 : case 5 : case 4 :
				book.doc.translate(595*0.5, 841*0.5)
				break;
		}
		switch(this.type){
			case 7 : case 6 : case 5 : case 4 :
				book.doc.rotate(180)
				break;
		}
		switch(this.type){
			case 7 : case 5 :
				book.doc.translate(-595*0.5, -841*0.5);
			break;
			case 6 : case 4 :
				book.doc.translate(595*0.5, -841*0.5);
				break;
		}
		switch(this.type){
			case 8 : case 6 : case 4 : case 2 :
				this.drawFolio(this.num, -book.doc.widthOfString(this.num+""), 0);
				this.book.doc.save();
				this.book.doc.translate(-book.doc.widthOfString(txt.split("\n")[0]), 0);
				this.book.doc.text(txt, -50, 50);
				this.book.doc.restore();
			break;
			case 7 : case 5 : case 3 : case 1 :
				this.drawFolio(this.num, 0, 0);
				this.book.doc.text(txt, 50, 50);
			break;
		}
		book.doc.restore();
	}
	drawMargin(){
		/*
			let inside = folio % 2 == 1 ? margins.left : width - margins.left;
			let outside = folio % 2 == 1 ? width - margins.right : margins.right;
			doc
				.moveTo(inside, 0)
			 	.lineTo(inside, height)
			 	.stroke()

				.moveTo(outside, 0)
			 	.lineTo(outside, height)
			 	.stroke()

				.moveTo(0, margins.top)
			 	.lineTo(width, margins.top)
			 	.stroke()

				.moveTo(0, height - margins.bottom)
			 	.lineTo(width, height - margins.bottom)
			 	.stroke();
		*/
	}
	drawHeader(){
		// 						createdAt - updatedAt
		//let title = ["bcksp.es", "01.2018 - 11.2020"];
	}
	drawFolio(value, x, y){
		this.book.doc.save();
		this.book.doc.translate(x, y);
		this.book.doc.text(value, 0, 0);
		this.book.doc.restore();
	}
}

let archive = Archives.findOne({type : 1}, {fields : {backspaces : 1}}).backspaces.join(" ");

new Book(
	'/Users/ogre/works/8102/bcksp.es/output.pdf', 
	'/Users/ogre/works/8102/bcksp.es/NotoMono-Regular.ttf',
	archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+
	archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+
	archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+
	archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+
	archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+
	archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+
	archive+" "+archive+" "+archive+" "+archive+" "+archive+" "+archive

);
