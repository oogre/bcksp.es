/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 14:04:02
  @Last Modified time: 2020-02-07 21:09:49
\*----------------------------------------*/
import { Email } from 'meteor/email'
import { Meteor } from 'meteor/meteor';
import {
	checkDBReference, 
	checkValidEmail,
	checkUserLoggedIn,
	checkNumber,
	checkString,
	checkObject,
	checkArray
} from './../../utilities/validation.js';
import { getMainEmail } from './../../utilities/meteor.js';
import { Souvenirs, Orders } from './souvenirs.js';
import { config } from './../../startup/config.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import { getMail } from './../../ui/template/mail.js';



export const CreatePoster  = new ValidatedMethod({
	name: 'Souvenir.methods.create.poster',
	validate(data) {
		checkObject(data, 'data');
		checkArray(data.shapes, 'shapes');
		checkString(data.sentence, 'sentence');
		checkNumber(data.fontSize, 'fontSize');
		checkNumber(data.lineHeight, 'lineHeight');
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run(data) {
		if (this.isSimulation)return;
		let itemID = Souvenirs.insert({
			type : Souvenirs.Type.POSTER,
			data : data,
			createdAt : new Date(),
			updatedAt : new Date()
		});
		return {
			success : true,
			data : itemID
		};
	}
});

export const CreateBook = new ValidatedMethod({
	name: 'Souvenir.methods.create.book',
	validate(data) {
		checkUserLoggedIn();
		checkObject(data, 'data');
		try{
			checkString(data.author, 'author');	
		}catch(e){
			const T2 = i18n.createTranslator("souvenir.item.book.form.author");
			data.author = T2("placeholder");
		}
		Souvenirs.Finishing.checkValid(data.finishing, 'finishing');
		Souvenirs.Licence.checkValid(data.licence, 'licence');
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run({author, finishing, licence}) {
		
		if (this.isSimulation)return;
		let itemID = Souvenirs.insert({
			type : Souvenirs.Type.BOOK,
			author : author,
			licence : licence,
			finishing : finishing,
			owner : Meteor.userId(),
			createdAt : new Date(),
			updatedAt : new Date()
		});
		return {
			success : true,
			data : itemID
		};
	}
});

export const OrderPoster = new ValidatedMethod({
	name: 'Souvenir.methods.order.poster',
	validate({souvenir}) {
		checkObject(souvenir);
		checkString(souvenir._id);
		checkDBReference({
			_id : souvenir._id,
			type : Souvenirs.Type.POSTER
		}, Souvenirs);
		try{
			checkUserLoggedIn();
			souvenir.email = getMainEmail(Meteor.user().emails);
		}catch(e){
			checkValidEmail(souvenir.email, false, 'souvenir.email');
		}
		checkString(souvenir.fullname, 'souvenir.fullname');	
		checkString(souvenir.address, 'souvenir.address');
		checkString(souvenir.city, 'souvenir.city');
		checkString(souvenir.zip, 'souvenir.zip');
		checkString(souvenir.country, 'souvenir.country');
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run({souvenir}) {
		let orderID = Orders.insert({
			souvenir : souvenir._id,
			contact : souvenir.email,
			delivery : {
				fullname : souvenir.fullname,
				address : souvenir.address,
				city : souvenir.city,
				zip : souvenir.zip,
				country : souvenir.country,
			},
			createdAt : new Date(),
			updatedAt : new Date(),
			status : Orders.State.RESERVED
		});
		
		if (!this.isSimulation){
			Email.send({
				from : process.env.MAIL_ADDRESS,
				to : process.env.MAIL_ADDRESS,
				subject : "[" + orderID + "] : Commande de poster", 
				text : "", 
			});
			Email.send({
				from : process.env.MAIL_ADDRESS,
				to : souvenir.email,
				subject : i18n.createTranslator("email.posterConfirm")("subject"), 
				html : getMail("posterConfirm", {orderID : orderID, link : FlowRouter.path("orderDetail", {id : orderID})})
			});
		}
		const T2 = i18n.createTranslator("souvenir.item.poster.confirmation");
		return {
			success : true,
			message : {
				title : T2("title"),
				content : T2("content", {orderID : orderID})
			}
		};
	}
	
});

export const OrderBook = new ValidatedMethod({
	name: 'Souvenir.methods.order.book',
	validate({souvenir}) {
		checkObject(souvenir);
		checkString(souvenir._id);
		checkDBReference({
			_id : souvenir._id,
			type : Souvenirs.Type.BOOK
		}, Souvenirs);
		try{
			checkUserLoggedIn();
			souvenir.email = getMainEmail(Meteor.user().emails);
		}catch(e){
			checkValidEmail(souvenir.email, false, 'souvenir.email');
		}
		checkString(souvenir.fullname, 'souvenir.fullname');	
		checkString(souvenir.address, 'souvenir.address');
		checkString(souvenir.city, 'souvenir.city');
		checkString(souvenir.zip, 'souvenir.zip');
		checkString(souvenir.country, 'souvenir.country');
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run({souvenir}) {
		let orderID = Orders.insert({
			souvenir : souvenir._id,
			contact : souvenir.email,
			delivery : {
				fullname : souvenir.fullname,
				address : souvenir.address,
				city : souvenir.city,
				zip : souvenir.zip,
				country : souvenir.country,
			},
			createdAt : new Date(),
			updatedAt : new Date(),
			status : Orders.State.RESERVED
		});
		
		if (!this.isSimulation){
			Email.send({
				from : process.env.MAIL_ADDRESS,
				to : process.env.MAIL_ADDRESS,
				subject : "[" + orderID + "] : Commande de livre", 
				text : "", 
			});

			Email.send({
				from : process.env.MAIL_ADDRESS,
				to : souvenir.email,
				subject : i18n.createTranslator("email.bookConfirm")("subject"),
				html : getMail("bookConfirm", {orderID : orderID, link : FlowRouter.path("orderDetail", {id : orderID})})
			});
		}
		const T2 = i18n.createTranslator("souvenir.item.book.confirmation");
		return {
			success : true,
			message : {
				title : T2("title"),
				content : T2("content", {orderID : orderID})
			}
		};
	}
});

export const Contact = new ValidatedMethod({
	name: 'Souvenir.methods.contact',
	validate(data) {
		try{
			checkUserLoggedIn();
			data.email = getMainEmail(Meteor.user().emails);
		}catch(e){
			checkValidEmail(data.email, false, 'email');
		}
		checkString(data.subject, 'subject');
		checkString(data.message, 'message');
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run({email, subject, message}) {
		if (this.isSimulation)return;
		
		Email.send({
			from : process.env.MAIL_ADDRESS,
			to : process.env.MAIL_ADDRESS,
			subject : "NOUVEAU MESSAGE : " + email + " : " + subject, 
			text : message, 
		});
		const T2 = i18n.createTranslator("souvenir.item.contact.confirmation");
		return {
			success : true,
			message : {
				title : T2("title"),
				content : T2("content")
			}
		};
	}
});