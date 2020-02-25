/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 14:04:02
  @Last Modified time: 2020-02-24 23:06:19
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
import paypal from '@paypal/checkout-server-sdk';

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

export const CreatePoster  = new ValidatedMethod({
	name: 'Souvenir.methods.create.poster',
	validate({order, poster}) {
		checkObject(order, 'data');
		checkString(order.id, 'order.id');
		
		checkObject(poster, 'poster');
		checkArray(poster.shapes, 'poster.shapes');
		checkString(poster.sentence, 'poster.sentence');
		checkNumber(poster.fontSize, 'poster.fontSize');
		checkNumber(poster.lineHeight, 'poster.lineHeight');
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	async run({order, poster}) {
		if (this.isSimulation)return;
		const request = new paypal.orders.OrdersCaptureRequest(order.id);
  		request.requestBody({});
		return client.execute(request)
		.then(({result})=>{
			let itemID = Souvenirs.insert({
				type : Souvenirs.Type.POSTER,
				data : poster,
				createdAt : new Date(),
				updatedAt : new Date()
			});
			let orderID = Orders.insert({
				souvenir : itemID,
				order : {
					payer : result.payer,
					status : result.status,
					shipping : result.purchase_units[0].shipping,
					payments : result.purchase_units[0].payments.captures[0]
				},
				status : Orders.State.PAYED,
				createdAt : new Date(),
				updatedAt : new Date()
			});
			
			Email.send({
				from : process.env.MAIL_ADDRESS,
				to : process.env.MAIL_ADDRESS,
				subject : "[" + orderID + "] : Commande de poster", 
				text : "", 
			});
			
			Email.send({
				from : process.env.MAIL_ADDRESS,
				to : Meteor.user() ? getMainEmail(Meteor.user().emails) : result.payer.email_address,
				subject : i18n.createTranslator("email.posterConfirm")("subject"), 
				html : getMail("posterConfirm", {orderID : orderID, link : FlowRouter.path("orderDetail", {id : orderID})})
			});

			const T2 = i18n.createTranslator("souvenir.item.poster.confirmation");
			return {
				success : true,
				message : {
					title : T2("title"),
					content : T2("content", {orderID : orderID})
				}
			};
		})
		.catch(error=>{
			return {
				success : false,
				error : error
			};
		});
	}
});

export const CreateBook = new ValidatedMethod({
	name: 'Souvenir.methods.create.book',
	validate({order, book}) {
		checkUserLoggedIn();
		checkObject(order, 'data');
		checkString(order.id, 'order.id');
		checkObject(book, 'book');
		
		Souvenirs.Finishing.checkValid(book.finishing, 'book.finishing');
		Souvenirs.Licence.checkValid(book.licence, 'book.licence');
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.low,
	applyOptions: {
		noRetry: true,
	},
	run({order, book}) {
		if (this.isSimulation)return;
		const T = i18n.createTranslator("souvenir.item.book.form.author");
		book.author = book.author || T("placeholder");
		const request = new paypal.orders.OrdersCaptureRequest(order.id);
  		request.requestBody({});
		return client.execute(request)
		.then(({result})=>{
			let itemID = Souvenirs.insert({
				type : Souvenirs.Type.BOOK,
				data : book,
				owner : Meteor.userId(),
				createdAt : new Date(),
				updatedAt : new Date()
			});
			let orderID = Orders.insert({
				souvenir : itemID,
				order : {
					payer : result.payer,
					status : result.status,
					shipping : result.purchase_units[0].shipping,
					payments : result.purchase_units[0].payments.captures[0]
				},
				status : Orders.State.PAYED,
				createdAt : new Date(),
				updatedAt : new Date()
			});

			Email.send({
				from : process.env.MAIL_ADDRESS,
				to : process.env.MAIL_ADDRESS,
				subject : "[" + orderID + "] : Commande de livre", 
				text : "", 
			});
			
			Email.send({
				from : process.env.MAIL_ADDRESS,
				to : getMainEmail(Meteor.user().emails),
				subject : i18n.createTranslator("email.bookConfirm")("subject"),
				html : getMail("bookConfirm", {orderID : orderID, link : FlowRouter.path("orderDetail", {id : orderID})})
			});
			
			const T2 = i18n.createTranslator("souvenir.item.book.confirmation");
			return {
				success : true,
				message : {
					title : T2("title"),
					content : T2("content", {orderID : orderID})
				}
			};
		});
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