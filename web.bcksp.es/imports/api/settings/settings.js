/*----------------------------------------*\
  bcksp.es - settings.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-26 12:10:40
  @Last Modified time: 2018-05-26 12:11:44
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import { config } from '../../startup/config.js';
import * as Utilities from '../../utilities.js';

export const Settings = new Mongo.Collection('settings');