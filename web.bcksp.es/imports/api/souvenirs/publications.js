/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-22 15:42:36
  @Last Modified time: 2019-12-22 15:47:42
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Souvenirs } from './souvenirs.js';


if(Meteor.isServer){
	Meteor.publish("getSouvenir", (id) => {
		return Souvenirs.find({ 
				_id : id
			}, {
				fields : {
					
				}
			});
	});
}
