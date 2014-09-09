/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'facebook': function (req, res, next) {
		require('passport').authenticate('facebook', { 
				scope: ['email']
			},
			function (err, user) {
				req.logIn(user, 
					function (err) {
						if(err) return next(err);
						return res.redirect('/');
					}
				);
			}
		)(req, res, next);
	},
	'facebook/callback': function (req, res, next) {
		require('passport').authenticate('facebook', function (err, user) { 
			if(!user || !user._json || !user._json.email)return res.redirect("/");	
			var userMail = user._json.email;

			User.findOne({
				email : userMail
			}, function userFound(err, oldUser){
				if(err) return next(err);
				if(oldUser){
					oldUser.facebook = {
						id : user.id,
						accessToken : user.accessToken
					};
					oldUser.signin(req.session, function(err, onlineUser){
						if(err)return next(err);
						return res.redirect("/user/show");
					});
				}
				else{
					var password = userMail;
					require("bcrypt").hash( password, 10, function passwordEncrypted(err, encryptedPassword){
						if(err)return next(err);
						User.create({
							email : userMail,
							encryptedPassword : encryptedPassword,
							lang : req.locale,
							facebook : {
								id : user.id,
								accessToken : user.accessToken
							}
						}, function userCreated(err, user){
							if(err) return next(err);
							Backspace.create({
								origin : 'Chrome', 
								owner : user.id
							}, function backspaceCreated(err, backspace){
								if(err) return res.redirect('/session/destroy');
								user.signup(req.session, function(err, onlineUser){
									if(err)return next(err);
									req.session.flash = {
										ok : {
											message : 'accountCreationOk',
											data : null
										}
									};
									return res.redirect('/user/show');
								});
							});
						});
					});
				}
			});
		})(req, res, next);
	}
};