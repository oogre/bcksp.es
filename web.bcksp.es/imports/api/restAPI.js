/*----------------------------------------*\
  web.bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-18 16:15:33
  @Last Modified time: 2018-05-18 16:15:57
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
	export const Api = new Restivus({
		useDefaultAuth: true,
		prettyJson: true,
		onLoggedIn: function () {
			/*
			console.log(this.user.username + ' (' + this.userId + ') logged in by API');
			let user = Meteor.users.findOne(this.userId);
			let flag = false;
			user.services.resume.loginTokens = user.services.resume.loginTokens.reverse();
			user.services.resume.loginTokens = user.services.resume.loginTokens.filter((data, n) => {
				if(data.when)return true;
				else if(!flag){
					flag = true;
					return true;
				}
				return false;
			});
			user.services.resume.loginTokens = user.services.resume.loginTokens.reverse();
			Meteor.users.update(this.userId, {
				$set : {
					"services.resume.loginTokens" : user.services.resume.loginTokens
				}
			});
			*/
		}
	});
	/**
	* @api {post} /api/login/
	* @apiName Login
	* @apiGroup Registration
	*
	* @apiParam {String} username username
	* @apiParam {String} password sha-256-password
	* @apiParam {Boolean} hashed true
	*
	* @apiSuccess {String} status "success"
	* @apiSuccess {Object} data
	* @apiSuccess {String} data.authToken 
	* @apiSuccess {String} data.userId
	*/

	/**
	* @api {post} /api/logout/
	* @apiName Logout
	* @apiGroup Registration
	*
	* @apiParam {String} X-Auth-Token auth_token
	* @apiParam {String} X-User-Id user_id
	*/
}