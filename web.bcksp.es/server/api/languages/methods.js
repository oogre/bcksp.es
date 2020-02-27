/*----------------------------------------*\
  bcksp.es - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-26 16:34:13
  @Last Modified time: 2020-02-27 00:51:22
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { 
	checkObject,
	checkString,
	checkInArray,
	checkUserLoggedIn
} from './../../../imports/utilities/validation.js';
import { log } from './../../../imports/utilities/log.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import { config } from './../../../imports/startup/config.js';
import { getTranslationKeys } from "./../../../imports/i18n/index.js";
import { translationModel } from "./../../../imports/i18n/model.js";
import { getDate } from "./../../../imports/utilities/ui.js";

export const LanguagesAddTranslation = new ValidatedMethod({
	name: 'Languages.methods.add.translation',
	validate({ local, namespace, translation }) {
		const [ namespaces ] = getTranslationKeys();
		//checkUserLoggedIn();
		checkString(local);
		checkInArray(local, config.langues);
		checkString(namespace);
		checkInArray(namespace, namespaces);
		checkObject(translation);
	},
	mixins: [RateLimiterMixin],
	rateLimit: config.methods.rateLimit.mid,
	applyOptions: {
		noRetry: true,
	},
	run({ local, namespace,  translation }) {
		this.unblock();

		file = translationModel	.replace(/\[LOCAL\]/g, local)
								.replace(/\[NAMESPACE\]/g, namespace)
								.replace(/\[TRANSLATION\]/g, JSON.stringify(translation))
								.replace(/\[CREATED_AT\]/g, getDate())
								.replace(/\[UPDATED_AT\]/g, getDate())
								;//.replace(/\[AUTHOR_EMAIL\]/g, getMainEmail(Meteor.user().emails));
		const fs = Npm.require('fs');
		
		fs.mkdir(process.env.TRAD_PATH+"/"+local, { recursive: true },  (err) => {
  			if (err) throw err;
  			fs.writeFile(process.env.TRAD_PATH+"/"+local+"/"+namespace+" "+getDate()+'.js', file, (err) => {
				if (err) throw err;
				console.log('The file has been saved!');
			});
		});

		return {
			local, namespace,  translation
		}
	}
});