/**
 * TwitterController
 *
 * @description :: Server-side logic for managing twitters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	"index" : function(req, res, next){

		var userIdToShow = req.param("id") ? req.param("id") : req.session.User.id;
		User.findOne(userIdToShow).populate('backspace').exec(
			function foundUserBackspace (err, userBackspace){
				if(err) return next(err);
				var backspace = "";
				_.each(userBackspace.backspace, function(origine){ 
					_.each(origine.content, function(content, key){
						backspace = content + "" + backspace;
					});
				});

				var status = backspace.substr(0, 140);

				var twitter = new require('node-twitter-api')(sails.config.twitter.app);

				twitter.statuses("update", {
						status: status
					},
					sails.config.twitter.user.token,
					sails.config.twitter.user.secret,
					function(error, data, response) {
						if (error) {
						    return res.json(error);
						} else {
							return res.json(data);
						}
					}
				);
			}
		);
	}
};

