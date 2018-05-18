/*----------------------------------------*\
  web.bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:52
  @Last Modified time: 2018-05-18 16:47:43
\*----------------------------------------*/
import {config} from '../../startup/config.js';
import moment from 'moment';
import {Api} from '../restAPI.js';
import { Backspaces } from './backspaces.js';

if(Meteor.isServer){	
	Api.addRoute('backspaces', {
		/**
		* @api {get} /api/backspaces
		* @apiName CountBackspaces
		* @apiGroup Backspaces
		*
		* @apiDescription Call this to know how the number of backspaces 
		*
		* @apiSuccess {String} status : success
		* @apiSuccess {Number} Bitsoil quantity
		*
		* @apiSuccessExample Success-Response:
		*     HTTP/1.1 200 OK
		*     {
		*       "status": "success",
		*       "data": 123456789
		*     }
		*/
		get: {
			authRequired: false,
			//roleRequired: ['user'],
			action : function () {
				let publicBackspaces = Backspaces.findOne({
					type : config.backspaces.type.public,
					owner : {  $exists : false  }
				}, {
					fields : {
						count : 1
					}
				});
				if(publicBackspaces){
					return {
						"status": "success",
						data : publicBackspaces.count
					};
				}
				else{
					return {
						"status": "fail",
						"error" : "UNKNOW_DATA",
						message : "The data you ask access does not exists"
					};
				}
			}
		}
	});
}