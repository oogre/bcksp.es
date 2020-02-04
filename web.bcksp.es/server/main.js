import { Meteor } from 'meteor/meteor';
//import { setMinimumBrowserVersions } from "meteor/modern-browsers";
// CLIENT & SERVER
import '../imports/startup/account-config.js';
import '../imports/api/archives/archives.js';
import '../imports/api/users/users.js';
import '../imports/api/souvenirs/souvenirs.js';
import '../imports/api/settings/settings.js';
import '../imports/api/devices/devices.js';
// SERVER ONLY
import './api/archives/archives.js';

import '../imports/api/books/generator.js';
import './../imports/i18n/index.js';

/*
Meteor.startup(() => {
	setMinimumBrowserVersions({
		chrome: 45,
		firefox: 44,
		edge: 17,
		ie: Infinity,
		mobileSafari: [10, 3],
		opera: 32,
		safari: [11, 1],
		electron: [0, 36],
	}, "service workers");
})


setMinimumBrowserVersions({
  chrome: 49,
  firefox: 45,
  edge: 12,
  ie: Infinity,
  mobile_safari: [9, 2],
  opera: 36,
  safari: 9,
  electron: 1,
}, "minimum versions for ECMAScript 2015 classes");

*/