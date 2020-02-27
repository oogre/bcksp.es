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
import './api/languages/languages.js';
import './api/souvenirs/souvenirs.js';

import '../imports/api/books/generator.js';
import './../imports/i18n/index.js';
