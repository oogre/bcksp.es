/*----------------------------------------*\
  bcksp.es - souvenirs.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 14:04:35
  @Last Modified time: 2020-01-11 15:33:09
\*----------------------------------------*/
import './methods.js';
import './publications.js';


export const Souvenirs = new Mongo.Collection('souvenir');
export const Orders = new Mongo.Collection('order');

Orders.helpers({
  populate: function () {
  	this.souvenir = Souvenirs.findOne(this.souvenir);
  	return this;
  }
});

export const OrderState = {
	RESERVED : 0,
	PAYED : 1,
	IN_PRODUCTION : 2,
	PRODUCED : 3,
	ON_IT_S_WAY : 4,
	DELIVERED : 5,
	properties: {
		0 : { name: "réservé", 		value: 0 },
		1 : { name: "payé", 		value: 1 },
		2 : { name: "en production",value: 2 },
		3 : { name: "produit", 		value: 3 },
		4 : { name: "en chemin", 	value: 4 },
		5 : { name: "délivré", 		value: 5 }
	}
}

if(Meteor.isServer){
	
}