/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require("bcrypt");

module.exports = {
	"new" : function(req, res){
		res.view();
	},

	"create" : function(req, res, next){

		if(!req.param("email") || !req.param("password")){
			req.session.flash = {
				err : {
					error : 'userEmailPasswordRequiredError',
					data : null
				}
			}
			return res.redirect('/'+req.session.locale+"/session/new");
		}
		User.findOneByEmail(req.param("email"), function userFound(err, user){
			if(err) return next(err);

			if(!user){
				req.session.flash = {
					err : {
						error : 'noAccountError',
						data : {
							email : req.param("email")
						}
					}
				}
				return res.redirect('/'+req.session.locale+"/session/new");
			}

			bcrypt.compare(req.param("password"), user.encryptedPassword, function(err, valid){
				if(err)next(err);
				if(!valid){
					req.session.flash = {
						err : {
							error : 'userEmailPasswordMismatchError',
							data : {
								email : req.param("email")
							}
						}
					}
					return res.redirect('/'+req.session.locale+"/session/new");
				}
				user.signin(req.session, function (err, onlineUser){
					if(err) return next(err);
					return res.redirect('/'+req.session.locale+"/user/show");
				});
			});
		});
	},
	"destroy" : function(req, res, next){
		var lang = req.session.locale;
		try{
			User.findOne(req.session.User.id, function foundUser (err, user){
				if(user){
					user.signout(req.session, function (err, offlineUser){
						if(err)return next(err);
						return res.redirect('/'+lang+"/");
					});
				}else{;
					req.session.destroy();
					return res.redirect('/'+lang+"/");
				}
			});
		}catch(e){
			req.session.destroy();
			return res.redirect('/'+lang+"/");
		}
	}
};

