import { Meteor } from 'meteor/meteor';
import '../imports/startup/account-config.js';
import '../imports/api/archives/archives.js';
import './api/archives/methods.js';
import './api/archives/startup.js';
import './api/archives/publications.js';
import '../imports/api/users/users.js';
import '../imports/api/souvenirs/souvenirs.js';
import '../imports/api/settings/settings.js';
import '../imports/api/devices/devices.js';

import '../imports/api/books/generator.js';