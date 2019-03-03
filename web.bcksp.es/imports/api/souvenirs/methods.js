/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 14:04:02
  @Last Modified time: 2019-02-28 18:35:04
\*----------------------------------------*/
import { Email } from 'meteor/email'
import T from './../../i18n/index.js';
import { Meteor } from 'meteor/meteor';
import { 
	checkValidEmail,
	checkUserLoggedIn,
	checkNumber,
	checkString,
	checkObject,
	checkArray
} from './../../utilities/validation.js';
import { Souvenirs } from './souvenirs.js';
import { config } from './../../startup/config.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import { getMail } from './../../ui/template/mail.js';

export const OrderPoster = new ValidatedMethod({
	name: 'Souvenir.methods.order.poster',
	validate(data) {
		try{
			checkUserLoggedIn();
		}catch(e){
			checkValidEmail(data['poster.delivery.email'], false);
		}
		
		checkString(data['poster.delivery.fullname'], 'poster.delivery.fullname');	
		checkString(data['poster.delivery.address.1'] + " " + data['poster.delivery.address.2'], 'poster.delivery.address.1', 'poster.delivery.address.2');
		checkString(data['poster.delivery.city'], 'poster.delivery.city');
		checkString(data['poster.delivery.zip'], 'poster.delivery.zip');
		checkString(data['poster.delivery.country'], 'poster.delivery.country');
		checkObject(data['poster.data'], 'poster.data');
		checkArray(data['poster.data'].shapes, 'poster.data');
		checkString(data['poster.data'].sentence, 'poster.data');
		checkNumber(data['poster.data'].fontSize, 'poster.data');
		checkNumber(data['poster.data'].lineHeight, 'poster.data');
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run(data) {
		if (this.isSimulation)return;
		let email = Meteor.userId() ? Meteor.user().emails[0].address : data['poster.delivery.email'];
		let orderID = Souvenirs.insert({
			type : "poster",
			data : data['poster.data'],
			email : email,
			delivery : {
				fullname : data['poster.delivery.fullname'],
				address : data['poster.delivery.address.1'] + " " + data['poster.delivery.address.2'],
				city : data['poster.delivery.city'],
				zip : data['poster.delivery.zip'],
				country : data['poster.delivery.country'],
			},
			createdAt : new Date(),
			updatedAt : new Date(),
			status : 0
		});
		
		Email.send({
			from : process.env.MAIL_ADDRESS,
			to : process.env.MAIL_ADDRESS,
			subject : "[" + orderID + "] : Commande de poster", 
			text : "", 
		});

		Email.send({
			from : process.env.MAIL_ADDRESS,
			to : email,
			subject : i18n.__("email.posterConfirm.subject"), 
			html : getMail("posterConfirm", {orderID : orderID})
		});
		return orderID; 
	}
});

export const OrderBook = new ValidatedMethod({
	name: 'Souvenir.methods.order.book',
	validate(data) {
		checkUserLoggedIn();
		checkString(data['book.finishing'], 'book.finishing');
		checkString(data['book.delivery.fullname'], 'book.delivery.fullname');
		checkString(data['book.delivery.address.1'] + " " + data['book.delivery.address.2'], 'book.delivery.address.1', 'book.delivery.address.2');
		checkString(data['book.delivery.city'], 'book.delivery.city');
		checkString(data['book.delivery.zip'], 'book.delivery.zip');
		checkString(data['book.delivery.country'], 'book.delivery.country');
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run(data) {
		if (this.isSimulation)return;
		let email = Meteor.user().emails[0].address;
		let orderID = Souvenirs.insert({
			type : "book",
			data : {
				author : data['book.author'],
				finishing : data['book.finishing']
			},
			email : email,
			delivery : {
				fullname : data['book.delivery.fullname'],
				address : data['book.delivery.address.1'] + " " + data['book.delivery.address.2'],
				city : data['book.delivery.city'],
				zip : data['book.delivery.zip'],
				country : data['book.delivery.country'],
			},
			createdAt : new Date(),
			updatedAt : new Date(),
			status : 0
		});

		Email.send({
			from : process.env.MAIL_ADDRESS,
			to : process.env.MAIL_ADDRESS,
			subject : "[" + orderID + "] : Commande de livre", 
			text : "", 
		});

		Email.send({
			from : process.env.MAIL_ADDRESS,
			to : email,
			subject : i18n.__("email.bookConfirm.subject"), 
			html : getMail("bookConfirm", {orderID : orderID})
		});
		return orderID;
	}
});
export const Contact = new ValidatedMethod({
	name: 'Souvenir.methods.contact',
	validate(data) {
		try{
			checkUserLoggedIn();
		}catch(e){
			checkValidEmail(data['contact.email'], false);
		}
		checkString(data['contact.subject'], 'contact.subject');
		checkString(data['contact.message'], 'contact.message');
	},
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run(data, ...rest) {
		if (this.isSimulation)return;
		let email = Meteor.userId() ? Meteor.user().emails[0].address : data['contact.email'];
		let orderID = Souvenirs.insert({
			type : "contact",
			email : email,
			data : {
				subject : data['contact.subject'],
				message : data['contact.message']
			},
			createdAt : new Date(),
			updatedAt : new Date(),
			status : 0
		});
		Email.send({
			from : email,
			to : process.env.MAIL_ADDRESS,
			subject : "[" + orderID + "] : " + data['contact.subject'], 
			text : data['contact.message'], 
		});

		Email.send({
			from : process.env.MAIL_ADDRESS,
			to : email,
			subject : i18n.__("email.contactConfirm.subject"), 
			html : getMail("contactConfirm", {orderID : orderID})
		});
		return orderID; 
	}
});