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
			function updatedBackspace (err, backspace){
				if(err){
					res.json({
						status : "ko"
					});
				}
				else{
					res.json({
						status : "ok"
					});	
				}
				
			});

			User.update(req.session.User.id, {
				volume : userBackspace.volume
			}, function(err, user){
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


			LastBackspace.find().exec(function(err, lastBackspace){
				if(lastBackspace && content){
					lastBackspace[0].content = content.split("").concat([" "]).concat(lastBackspace[0].content);
					lastBackspace[0].content = lastBackspace[0].content.slice(0, 300);
					lastBackspace[0].save();
				}
			});
		});
	},

	"last" : function(req, res, next){
		LastBackspace.find().exec(function(err, lastBackspace){
			if(lastBackspace && lastBackspace[0]){
				res.json(lastBackspace[0].content.join(""));
			}
		});
	},

	"watch" : function(req, res, next){
		if (req.isSocket){
			Backspace.watch(req.socket);
		} else {
			res.view();
		}
	},

	// policies to pass through  : [flash, authenticated, userCanSeeProfile]
	"subscribe" : function(req, res, next){
		if (req.isSocket){
			User.find({id : req.param("id")}, function userFound (err, user){
				if(err) return next(err);
				Backspace.subscribe(req.socket, user);
			});
		} else {
			res.view();
		}
	}
};