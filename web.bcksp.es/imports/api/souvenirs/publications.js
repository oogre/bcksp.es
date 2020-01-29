/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-22 15:42:36
  @Last Modified time: 2020-01-29 12:05:14
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Souvenirs, Orders } from './souvenirs.js';
import { checkUserLoggedIn, checkUserRole } from './../../utilities/validation.js';

if(Meteor.isServer){

	Meteor.publish("souvenir.get.poster", (id) => {
		checkUserLoggedIn();
		return Souvenirs.find({ 
				_id : id,
				type : Souvenirs.Type.POSTER
			}, {
				fields : {
					
				}
			});
	});

	Meteor.publish("souvenir.get.book", (id) => {
		checkUserLoggedIn();
		return Souvenirs.find({ 
				_id : id,
				type : Souvenirs.Type.BOOK,
				owner : Meteor.userId()
			}, {
				fields : {
					
				}
			});
	});

	Meteor.publishComposite('order.get', (id)=> {
		checkUserLoggedIn();
		return {
			find: function () {
		  		return Orders.find({ 
					_id : id
				})
			},
			children: [{
		  		find: function (order) {
		    		return Souvenirs.find({ _id :  order.souvenir});
		  		}
			}]
		}
	});

	Meteor.publishComposite('order.all', ()=> {
		checkUserLoggedIn();
		checkUserRole("admin");
		return {
			find: function () {
		  		return Orders.find({})
			},
			children: [{
		  		find: function (order) {
		    		return Souvenirs.find({ _id :  order.souvenir});
		  		}
			}]
		}
	});
}