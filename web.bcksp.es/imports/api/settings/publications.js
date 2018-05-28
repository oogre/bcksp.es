/*----------------------------------------*\
  bcksp.es - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:11:04
  @Last Modified time: 2018-05-28 22:43:54
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Settings } from './settings.js';
import { config } from './../../startup/config.js';

if(Meteor.isServer){
	Meteor.publish("settings.private", function settingsPublication(){
		return Settings.find({
			owner : Meteor.userId()
		});
	});

	Meteor.publish("settings.private.blacklist", function settingsPublication(){
		
		/* MAYBE DON'T NEDD THIS */
		
		let initializing = true;
		const handle = Settings.find({ 
			owner : Meteor.userId()
		}, {
			fields : {
				blacklist : 1
			}
		}).observeChanges({
			changed: (id, changedPrivateBlacklist) => {
				if (!initializing) {
					//console.log("changed", changedPrivateBlacklist);
					this.changed('blacklist', id, changedPrivateBlacklist);
				}
			}
		});

		// Instead, we'll send one `added` message right after `observeChanges` has
		// returned, and mark the subscription as ready.
		initializing = false;
		
		/* MAYBE DON'T NEDD THIS UNITL THERE */



		let settings = Settings.findOne({
			owner : Meteor.userId()
		}, {
			fields : {
				blacklist : 1
			}
		});
		if(settings){
			//console.log("added", settings.blacklist);
			this.added('blacklist', settings._id, settings);
		}
		this.ready();

		// Stop observing the cursor when the client unsubscribes. Stopping a
		// subscription automatically takes care of sending the client any `removed`
		// messages.
		this.onStop(() => handle.stop() );
	});
}
