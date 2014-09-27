/**
 * BackspaceController
 *
 * @description :: Server-side logic for managing backspaces
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	"token" : function(req, res){
		return res.json({
			status : "ok",
			data : {
				_csrf : req.csrfToken()
			}
		});
	},


	// policies to pass through  : [authenticated]
	"append" : function(req, res, next){
		User.findOne({
			id : req.session.User.id
		})
		.populate('backspace')
		.exec(function foundUserBackspace(err, userBackspace){
			if(err){
				console.log(err);
				return res.json({
					status : "ko"
				});
			}else if(!userBackspace){
				return res.json({
					status : "ko"
				});
			}
			var content = req.param("content") || "";
			var date = new Date().getTime();

			userBackspace.backspace[0].content[date] = userBackspace.backspace[0].content[date] ? (content+userBackspace.backspace[0].content[date]) : content;

			if(!userBackspace.volume || 0 == userBackspace.volume){
				userBackspace.volume = 0;
				for(var k in userBackspace.backspace[0].content){
					if(userBackspace.backspace[0].content[k]){
						userBackspace.volume += userBackspace.backspace[0].content[k].length;
					}
				}
			}else if(content){
				userBackspace.volume += content.length;
			}

			Backspace.update({
				owner : req.session.User.id
			}, {
				content : userBackspace.backspace[0].content
			}, 
			function updatedBackspace (err){
				if(err){
					console.log(err);
					return res.json({
						status : "ko"
					});
				}
				else{
					User.update(req.session.User.id, {
						volume : userBackspace.volume
					}, function(err){
						if(err) console.log(err);

						User.publishUpdate(req.session.User.id,{ 
							volume : userBackspace.volume
						});

						Backspace.publishUpdate(req.session.User.id, {
							id : req.session.User.id,
							volume : userBackspace.volume,
							backspcaced : content
						});

						Backspace.publishCreate({
							id : req.session.User.id,
							backspcaced : content
						});
					});

					LastBackspace.findOne({
						name : "last"
					})
					.exec(function(err, lastBackspace){
						if(err) console.log(err);
						if(lastBackspace && content){
							lastBackspace.content = content.split("").concat([" "]).concat(lastBackspace.content);
							lastBackspace.content = lastBackspace.content.slice(0, 600);
							lastBackspace.save();
						}
					});
					LastBackspace.findOne({
						name : "twitter"
					})
					.exec(function(err, twitterBackspace){
						if(err) console.log(err);
						if(twitterBackspace && content){
							twitterBackspace.content = content.split("").concat(twitterBackspace.content);
							if(twitterBackspace.content.length < 140){
								twitterBackspace.save();
							}else{
								var twitter = new require('node-twitter-api')(sails.config.twitter.app);
								twitter.statuses("update", {
										status: twitterBackspace.content.slice(0, 140).join("")
									},
									sails.config.twitter.user.token,
									sails.config.twitter.user.secret,
									function(error, data, response) {
										if (error) {
										    console.log(error);
										}
										twitterBackspace.content = [];
										twitterBackspace.save();
									}
								);
							}							
						}
					});
					return res.json({
						status : "ok",
						data : {
							appConfig : {
								captureEmail : userBackspace.captureEmail,
								capturePassword : userBackspace.capturePassword,
								captureBlacklist : userBackspace.captureBlacklist
							}
						}
					});
				}
			});
		});
	},

	"last" : function(req, res, next){
		LastBackspace.findOne({
			name : "last"
		}).exec(function(err, lastBackspace){
			if(lastBackspace){
				res.json(lastBackspace.content.join(""));
			}else{
				res.send(404);
			}
		});
	},

	"watch" : function(req, res, next){
		Backspace.watch(req.socket);
	},

	// policies to pass through  : [flash, authenticated, userCanSeeProfile]
	"subscribe" : function(req, res, next){
		User.find({id : req.param("id")}, function userFound (err, user){
			if(err) return next(err);
			Backspace.subscribe(req.socket, user);
		});
	},
	"index" : function(req, res, next){

		if(req.param("id")){
			User.findOne({id : req.param("id")})
			.populate('backspace')
			.exec(function foundUserBackspace(err, userBackspace){
				if(err) return next(err);
				if(!userBackspace && !userBackspace.backspace && !userBackspace.backspace[0] && userBackspace.backspace[0].content) 
					return res.send(404);
				return res.json({
					status : "ok",
					data : userBackspace.backspace[0].content
				});
			});
		}
		else if(req.session.User.admin){
			Backspace.find(function(err, backspaces){
				if(err) return next(err);
				if(!backspaces) return res.send(404);
				backspaces = backspaces.map(function(backspace){
					return backspace.content
				});
				return res.json({
					status : "ok",
					data : backspaces
				});
			});
		}else{
			User.findOne({id : req.session.User.id})
			.populate('backspace')
			.exec(function foundUserBackspace(err, userBackspace){
				if(err) return next(err);
				if(!userBackspace && !userBackspace.backspace && !userBackspace.backspace[0] && userBackspace.backspace[0].content) 
					return res.send(404);
				return res.json({
					status : "ok",
					data : userBackspace.backspace[0].content
				});
			});
		}		
	}
};