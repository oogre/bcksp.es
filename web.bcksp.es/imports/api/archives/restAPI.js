/*----------------------------------------*\
  web.bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:52
  @Last Modified time: 2018-05-21 16:10:30
\*----------------------------------------*/

import moment from 'moment';
import { Api } from '../restAPI.js';
import { Archives } from './archives.js';
import { config } from '../../startup/config.js';
import * as Utilities from '../../utilities.js';
import { ArchiveAdd } from './methods.js';

if(Meteor.isServer){
	var wait = function(ms) {
		var future = new Future;

		setTimeout(function() {
			future.return();
		}, ms);

		return future.wait();
	}

	Api.addRoute('archives', {
		/**
		* @api {get} /api/archives
		* @apiName CountArchives
		* @apiGroup Archives
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
				let publicArchive = Archives.findOne({
					type : config.archives.public.type,
					owner : {  $exists : false  }
				}, {
					fields : {
						total : 1
					}
				});
				if(publicArchive){
					return Utilities.APIsuccess(publicArchive.total);
				}
				else{
					return Utilities.APIerror("The data you ask access does not exists");
				}
			}
		},
		/**
		* @api {post} /api/archives
		* @apiName CreateArchives
		* @apiGroup Archives
		* @apiPrivate
		*
		* @apiDescription Call this to save backspaces
		*
		* @apiHeader {String} X-Auth-Token auth_token
		* @apiHeader {String} X-User-Id user_id
		*
		* @apiSuccess {String} status : success
		* @apiSuccess {String} "Backspaces saved"
		*
		* @apiSuccessExample Success-Response:
		*     HTTP/1.1 200 OK
		*     {
		*       "status": "success",
		*       "data": "Backspaces saved"
		*     }
		*/
		post : {
			authRequired: true,
			//roleRequired: ['user'],
			action : function () {
				if(_.isEmpty(this.bodyParams.text)){
					return Utilities.APIerror("Need bodyParams text to be string");
				}

				ArchiveAdd.call({
					text : this.bodyParams.text
				}, (err, res) => {
					console.log(err, res);
				});
				
				return Utilities.APIsuccess("Backspaces saved");
			}
		}
	});
}