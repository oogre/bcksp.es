/*----------------------------------------*\
  web.bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:30:52
  @Last Modified time: 2018-05-21 02:35:12
\*----------------------------------------*/

import moment from 'moment';
import { Api } from '../restAPI.js';
import { Archives } from './archives.js';
import { config } from '../../startup/config.js';
import * as Utilities from '../../utilities.js';
import { streamer } from '../streamer.js';
if(Meteor.isServer){	
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
				
				let myArchive = Archives.update({
					type : config.archives.private.type,
					owner : this.userId
				},{
					$inc : {
						count : this.bodyParams.text.length
					},
					$push : {
						backspaces : {
							$position : 0,
							$each : [this.bodyParams.text]
						}
					},
					$set : {
						updatedAt : new Date()
					}
				});

				if(myArchive<1){
					return Utilities.APIerror("The data you ask access does not exists");
				}

				streamer.emit('liveBackspaces', this.bodyParams.text);

				return Utilities.APIsuccess("Backspaces saved");
			}
		}
	});
}