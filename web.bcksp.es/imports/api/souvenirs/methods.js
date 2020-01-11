/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 14:04:02
  @Last Modified time: 2020-01-11 16:19:48
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
import { getMainEmail } from './../../utilities/meteor.js';
import { Souvenirs, Orders, OrderState } from './souvenirs.js';
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
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
	applyOptions: {
		noRetry: true,
	},
	run(data) {
		if (this.isSimulation)return;
		let itemID = Souvenirs.insert({
			type : "poster",
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

export const OrderPoster = new ValidatedMethod({
	name: 'Souvenir.methods.order.poster',
	validate({souvenir}) {
		checkObject(souvenir, 'souvenir');
		checkString(souvenir._id, 'souvenir._id');
		if(!Souvenirs.findOne({_id : souvenir._id})){
			throw new ValidationError([{
				name: 'type',
				type: 'not-recognize',
				details: {
				  value: i18n.__("errors.type.not-recognize"),
				  origin : "souvenir._id",
				}
			}]);
		}
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
	//mixins: [RateLimiterMixin],
	//rateLimit: config.methods.rateLimit.superFast,
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
			status : OrderState.RESERVED
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
				subject : i18n.__("email.posterConfirm.subject"), 
				html : getMail("posterConfirm", {orderID : orderID, link : FlowRouter.path("orderDetail", {id : orderID})})
			});
		}
		
		return {
			success : true,
			data : {
				order_id : orderID
			}
		};
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