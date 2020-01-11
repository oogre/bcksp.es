/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-22 15:42:36
  @Last Modified time: 2020-01-11 16:12:10
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Souvenirs, Orders } from './souvenirs.js';


if(Meteor.isServer){
	Meteor.publish("souvenir.get", (id) => {
		return Souvenirs.find({ 
				_id : id
			}, {
				fields : {
					
				}
			});
	});

	Meteor.publishComposite('order.get', (id)=> {
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