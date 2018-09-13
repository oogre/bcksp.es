/*----------------------------------------*\
  bcksp.es - tools.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-06-04 17:17:51
  @Last Modified time: 2018-06-04 20:44:31
\*----------------------------------------*/
import PDFDocument from 'pdfkit';
import fs from "fs";
import intro from "./intro.js"

export default class Book {
	constructor(adress, font, startAt, stopAt, content){
		this.startAt = startAt;
		this.stopAt = stopAt;
		this.pageCount = 0;
		this.folioCount = 0;

		this.doc = new PDFDocument({
			size: "A4", 
			margin: 0,
			bufferPages: true
		});
		this.width = 100;
		this.height = 140;
		this.width *= (this.doc.page.width/210);
		this.height *= (this.doc.page.height/297);
		
		
		
		this.doc.pipe(
			fs.createWriteStream(adress)
		);
		this.doc.font(font).fontSize(11);

		startAt = {
			month : startAt.getMonth() + 1,
			year : startAt.getFullYear()
		}

		stopAt = {
			month : stopAt.getMonth() + 1,
			year : stopAt.getFullYear()
		}
		if(startAt.year == stopAt.year){
			this.date = startAt.month+"-"+stopAt.month+"."+startAt.year;
		}else{
			this.date = startAt.month+"."+startAt.year+"-"+stopAt.month+"."+stopAt.year;
		}

		let number = "Archive N:1";
		let space = "";
		while(this.date.length + space.length + number.length < 30){
			space += " ";
		}
		intro = intro.replace("[           NUMBER+DATE      ]", (this.date+space+number).substr(0, 30));
		let coAuthor = "John Doe";
		while(coAuthor.length < 30){
			coAuthor = " "+coAuthor+" ";
		}

		intro = intro.replace("[        AUTHOR NAME         ]", coAuthor.substr(0, 30));
		
		content = intro + content.match(/.{1,30}/g).join("\n");
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
		}else{
			this.drawSliceMark();
		}
		this.drawBendMark();
		book.addPage();
		this.drawBendMark()

		content.map(c =>{
			new Folio(book, c);
		});
	}
	drawBendMark(){
		this.book.doc.switchToPage(this.book.pageCount);
		this.book.doc
			.save()
				.translate(this.book.doc.page.width * 0.5, this.book.doc.page.height * 0.5)
				.moveTo(0, -5)
			 	.lineTo(0, 5)
			 	.stroke()
				.moveTo(-5, 0)
			 	.lineTo( 5, 0)
			 	.stroke()
				.save()
					.translate(0, -this.book.doc.page.height * 0.5)
					.moveTo(0, 10)
			 		.lineTo(0, 20)
		 			.stroke()
				.restore()
				.save()
					.translate(0, this.book.doc.page.height * 0.5)
					.moveTo(0, -10)
			 		.lineTo(0, -20)
		 			.stroke()
				.restore()
				.save()
					.translate(-this.book.doc.page.width * 0.5, 0)
					.moveTo(10, 0)
			 		.lineTo(20, 0)
		 			.stroke()
				.restore()
				.save()
					.translate(this.book.doc.page.width * 0.5, 0)
					.moveTo(-10, 0)
			 		.lineTo(-20, 0)
		 			.stroke()
				.restore()
		 	.restore();
	}
	drawSliceMark(){
		this.book.doc.switchToPage(this.book.pageCount);

		this.book.doc
			.save()
				.translate(this.book.doc.page.width * 0.5, this.book.doc.page.height * 0.5 - 10)
		 		.moveTo(-4, 0)
		 		.lineTo( 4, 0)
		 		.stroke()
		 		.save()
		 			.translate(0, -this.book.height)
		 			.moveTo(-4, 0)
		 			.lineTo( 4, 0)
		 			.stroke()
		 		.restore()
		 			.translate(this.book.width, 0)
		 			.moveTo(-4, 0)
		 			.lineTo( 4, 0)
		 			.stroke()
		 			.moveTo(0, -4)
		 			.lineTo(0,  4)
		 			.stroke()
		 			.save()
		 				.translate(0, -this.book.height)
						.moveTo(-4, 0)
		 				.lineTo( 4, 0)
		 				.stroke()
		 				.moveTo(0, -4)
		 				.lineTo(0,  4)
		 				.stroke()
		 			.restore()
		 		.restore()
		 	.restore();
	}	
}

class Folio {
	constructor(book, txt){
		this.book = book;
		this.folioPerSheet = 8;
		this.num = ++book.folioCount;
		this.type = 1 + (this.num % this.folioPerSheet);
		
		if(this.type == 8 || this.type == 7 || this.type == 4 || this.type == 3)
			book.doc.switchToPage(book.pageCount);
		else
			book.doc.switchToPage(book.pageCount-1);

		book.doc.save();

		if(this.type == 8 || this.type == 2)
			book.doc.translate(595, 0);
		else if(this.type == 7 || this.type == 6 || this.type == 5 || this.type == 4){
			book.doc.translate(595*0.5, 841*0.5);
			book.doc.rotate(180);
		}

		if(this.type == 7 || this.type == 5)
			book.doc.translate(-595*0.5, -841*0.5);
		else if(this.type == 6 || this.type == 4)
			book.doc.translate(595*0.5, -841*0.5);
		
		let mirror = this.type == 8 || this.type == 6 || this.type == 4 || this.type == 2 ;

		this.drawContent(mirror, txt, 65, 65); // TEXT
		
		if(this.num > 14){
			this.drawContent(mirror, this.num, 65, 35); // FOLIO
			let title = mirror ? "bcksp.es" : this.book.date;
			this.drawContent(
				mirror, 
				title,
				595 - this.book.doc.widthOfString(title) - (595/210) * 100  - 65, //
				35 
			); // Titre
		}
		book.doc.restore();
	}
	drawContent(mirror, value, x, y){
		this.book.doc.save();
		if(mirror){
			this.book.doc.translate(-this.book.doc.widthOfString((value+"").split("\n")[0]), 0);
			this.book.doc.translate(-x, y);	
		}else{
			this.book.doc.translate(x, y);	
		}
		this.book.doc.text(value, 0, 0);
		this.book.doc.restore();
	}
}