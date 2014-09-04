/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	"index" : function(req, res, next){
		App.find(function foundUsers(err, apps){
			res.view({
				apps : apps
			})
		});
	}
};

