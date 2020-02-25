/*----------------------------------------*\
  bcksp.es - souvenirs.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-23 14:04:35
  @Last Modified time: 2020-02-24 18:58:12
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import EasyEnum from "./../EasyEnum.js";

export const Souvenirs = new Mongo.Collection('souvenir');
export const Orders = new Mongo.Collection('order');

Orders.helpers({
	populate: function () {
		this.souvenir = Souvenirs.findOne(this.souvenir);
		this.status = Orders.State.getName(this.status);
		return this;
	}
});

Souvenirs.helpers({
	populate: function () {
		if(this.type == Souvenirs.Type.BOOK){
			this.finishing = Souvenirs.Finishing.getName(this.finishing);
			this.licence = Souvenirs.Licence.getName(this.licence);
		}
		this.type = Souvenirs.Type.getName(this.type);
		return this;
	}
});

Souvenirs.Type = EasyEnum({
	BOOK : 0,
	POSTER : 1,
	OTHER : 2,
});

Souvenirs.Finishing = EasyEnum({
	BASIC : 0,
	PREMIUM : 1,
});

Souvenirs.Licence = EasyEnum({
	OPEN_ACCESS : 0,
	CLOSE_ACCESS : 1,
	NO_ACCESS : 2,
});

Orders.State = EasyEnum({
	RESERVED : 0,
	PAYED : 1,
	IN_PRODUCTION : 2,
	PRODUCED : 3,
	ON_IT_S_WAY : 4,
	DELIVERED : 5,
});