/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-22 15:42:36
  @Last Modified time: 2020-02-25 17:08:43
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Souvenirs, Orders } from './../../../imports/api/souvenirs/souvenirs.js';
import { checkUserLoggedIn, checkUserRole } from './../../../imports/utilities/validation.js';

Meteor.publish("souvenir.get.poster", function(id) {
	//checkUserLoggedIn();
	return Souvenirs.find({ 
			_id : id,
			type : Souvenirs.Type.POSTER
		}, {
			fields : {
				
			}
		});
});

Meteor.publish("souvenir.get.book", function(id) {
	checkUserLoggedIn();
	return Souvenirs.find({ 
			_id : id,
			type : Souvenirs.Type.BOOK,
			owner : this.userId
		}, {
			fields : {
				
			}
		});
});

Meteor.publishComposite('order.get', function(id) {
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

Meteor.publishComposite('order.all', function() {
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