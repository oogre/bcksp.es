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
		Backspace.findOne({
			owner : req.session.User.id
		},function foundBackspace(err, backspcace){
			var content = req.param("content");
			var date = new Date().getTime();

			backspcace.content[date] = backspcace.content[date] ? (content+backspcace.content[date]) : content;

			Backspace.update({
				id : backspcace.id
			}, {
				content : backspcace.content
			}, 
			function updatedBackspcace (err, backspcace){
				res.json({
					status : "ok"
				});
			});

			Backspace.publishCreate({
				id : req.session.User.id,
				backspcaced : content
			});

			Backspace.publishUpdate(req.session.User.id, {
				id : req.session.User.id,
				backspcaced : content
			});

			LastBackspace.find().exec(function(err, lastBackspace){
				lastBackspace[0].content = content.split("").concat([" "]).concat(lastBackspace[0].content);
				lastBackspace[0].content = lastBackspace[0].content.slice(0, 300);
				lastBackspace[0].save();
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