/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-12-21 00:17:14
  @Last Modified time: 2019-12-21 00:23:18
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { config } from './../../startup/config.js';
import { Archives } from './../../api/archives/archives.js';

if(Meteor.isServer){

	Meteor.publish("getInfo", function(){
		let getUserCount = ()=>Meteor.users.find({}).count();
		let getArchiveCounter = ()=>Archives.find({ 
										type : config.archives.private.type,
									}, {
										fields : {
											count : 1
										}
									})
									.fetch()
									.reduce((acc, e)=>acc+e.count, 0);
		let uniqID = +(new Date());

		let data = {
			userCounter : getUserCount(),
			charCounter : getArchiveCounter()
		}

		let handle = Archives.find({ 
			type : config.archives.private.type,
		}, {
			fields : {
				count : 1
			}
		}).observeChanges({
			changed: () => {
				if(!initializing)return;
				data.charCounter = getArchiveCounter();
				this.changed('info', uniqID, data);
			}
		});

		let handle2 = Meteor.users.find({}, {
			fields : {
				_id : 1
			}
		}).observeChanges({
			changed: () => {
				if(!initializing)return;
				data.userCounter = getUserCount();
				this.changed('info', uniqID, data);
			}
		});
		this.added('info', uniqID, data);

		this.ready();

		initializing = false;

		this.onStop(() => { 
			handle && handle.stop() ;
			handle2 && handle2.stop() ;
		});
	});
}