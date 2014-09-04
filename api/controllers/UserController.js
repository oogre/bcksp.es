/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require("bcrypt");

module.exports = {
	"new" : function(req, res){
		res.view();
	},

	"confirmation" : function(req, res, next){
		if(req.param("email")){
			User.findOne({
				email : req.param("email")
			}, function userFound(err, oldUser){
				if(err) return next(err);
				if(oldUser){
					req.session.flash = {
						err : {
							error : 'userEmailAlredyExistError',
							data : {
								email : req.param("email")
							}
						}
					}
					return res.redirect("/user/new");
				}
				else{
					var token = req.param("email");
					bcrypt.hash( token, 10, function passwordEncrypted(err, encryptedToken){
						if(err)return next(err);
						// SEND mailUserConfirmation VIEW AS EMAIL
						res.render('mailUserConfirmation', {
							link : req.protocol + '://' + req.headers.host + "/user/create?token="+encodeURIComponent(encryptedToken)
						}, function (err, html) {
							require('nodemailer')
							.createTransport(require('nodemailer-smtp-transport')(sails.config.mail.transporter))
							.sendMail({
								from: sails.config.mail.from,
								to: req.param("email"), 
								subject: res.i18n("mail_user_confirmation_subject"),
								html: html
							}, function(error, info){
								if(error){
									console.log(error);
									req.session.flash = {
										err : {
											error : 'proceduralError',
											data : null
										}
									}
									return res.redirect("/user/new");
								}
								else{
									console.log(info);
									Usertocreate.create({
										email : req.param("email"),
										password : req.param("password"),
										confirmation : req.param("confirmation"),
										creationToken : encryptedToken
									}, function usertocreateCreated(err, usertocreate){
										if(err) return next(err);
										req.session.flash = {
											ok : {
												message : 'accountCreationOnGoingOk',
												data : null
											}
										};
										return res.redirect("/session/new");
									});
								}
							});
						});
					});
				};
			});
		}
		else{
			req.session.flash = {
				err : {
					error : 'noAccountError',
					data : null
				}
			}
			return res.redirect("/user/new");
		}
	},

	"create" : function(req, res, next){
		Usertocreate.findOne({
			creationToken : decodeURIComponent(req.param("token"))
		}, function usertocreateFound(err, usertocreate){
			if(err) return next(err);
			if(!usertocreate){
				req.session.flash = {
					err : {
						error : 'proceduralError',
						data : null
					}
				}
				return res.redirect("/user/new");
			}
			else{
				User.findOne({
					email : usertocreate.email
				}, function userFound(err, oldUser){
					if(err) return next(err);
					if(oldUser){
						req.session.flash = {
							err : {
								error : 'userEmailAlredyExistError',
								data : {
									email : req.param("email")
								}
							}
						}
						return res.redirect("/user/new");
					}
					else{
						User.create({
							email : usertocreate.email,
							encryptedPassword : usertocreate.encryptedPassword,
							lang : req.locale
						}, function userCreated(err, user){
							if(err) return next(err);
							Usertocreate.destroy(usertocreate.id, function userDestroyed(err){
								if(err)console.log(err);
							});
							Backspace.create({
								origin : 'Chrome', 
								owner : user.id
							}, function backspaceCreated(err, backspace){
								if(err) return res.redirect('/session/destroy');
								
								var oldDate = new Date()
								var newDate = new Date(oldDate.getTime() + (1000 * 60 * 60 * 24 * 365));
								req.session.cookie.expires = newDate;
								req.session.authenticated = true;
								req.session.User = user.cleanSession();
								user.online = true;

								user.save(function userSaved(err, user){
									if(err)return next(err);
									User.publishCreate(user.toJSON());
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
					}
				});
			}
		});
	},

	"show" : function(req, res, next){
		var userIdToShow = req.param("id") ? req.param("id") : req.session.User.id;
		User.findOne(userIdToShow).populate('backspace').exec(
			function foundUserBackspace (err, userBackspace){
				if(!userBackspace) return res.redirect('/session/destroy');
				res.view({
					user : userBackspace
				});
			});
	}, 

	"index" : function(req, res, next){
		User.find(function foundUsers(err, users){
			res.view({
				users : users
			})
		});
	},
/*
	"edit" : function(req, res, next){
		User.findOne(req.param("id"), function foundUser(err, user){
			if(err) return next(err);
			if(!user) return res.redirect('/session/destroy');
			res.view({
				user : user
			});
		});
	},

	"update" : function(req, res, next){
		User.update(req.param("id"), req.params.all(), function userUpdate(err){
			if(err){
				return res.redirect("/user/edit/"+req.param("id"));
			}
			res.redirect("/user/show/"+req.param("id"));
		});
	},
*/

	"pwd" : function(req, res, next){
		var Recaptcha = require('re-captcha');
		var recaptcha = new Recaptcha(sails.config.recaptcha.public, sails.config.recaptcha.private);
		res.view({
			recaptcha_form: recaptcha.toHTML()
		});
	},

	"pwdrecovery" : function(req, res, next){
		var data = {
			remoteip:  req.connection.remoteAddress,
			challenge: req.param("recaptcha_challenge_field"),
			response:  req.param("recaptcha_response_field")
		};
		var Recaptcha = require('re-captcha');
		var recaptcha = new Recaptcha(sails.config.recaptcha.public, sails.config.recaptcha.private);
		recaptcha.verify(data, function(err) {
			if (err) {
				req.session.flash = {
					err : {
						error : 'captchaError',
						data : null
					}
				}
				return res.redirect("/pwd");
			} else {
				User.findOne({
					email : req.param("email")
				}, function userFound(err, user){
					if(err) return next(err);
					if(!user){
						req.session.flash = {
							err : {
								error : 'noAccountError',
								data : null
							}
						}
						return res.redirect("/pwd");
					}
					var token = user.email;
					bcrypt.hash( token, 10, function passwordEncrypted(err, encryptedToken){
						if(err)return next(err);
						user.passwordRecoveryToken = encryptedToken;
						user.save(function userUpdated(err, userUpdated){
							if(err)return next(err);
							// SEND mailPwdRecovery VIEW AS EMAIL
							res.render('mailPwdRecovery', {
								link : req.protocol + '://' + req.headers.host + "/pwd/new/"+user.id+"?token="+encodeURIComponent(user.passwordRecoveryToken)
							}, function (err, html) {
								require('nodemailer')
								.createTransport(require('nodemailer-smtp-transport')(sails.config.mail.transporter))
								.sendMail({
									from: sails.config.mail.from,
									to: user.email,
									subject: res.i18n("mail_pwd_recovery_subject"),
									html: html
								}, function(error, info){
									if(error) console.log(error);
									else console.log('Message sent: ' + info.response);
								});
							});

							return res.view({
								flash: {
									ok : {
										message : 'accountFoundOk',
										data : null
									}
								}
							});
						});
					});
				});
			}
		});
	},

	"pwdnew" : function(req, res, next){
		User.findOne(req.param("id")).exec(function foundUser(err, user){
			if(req.param("token") == user.passwordRecoveryToken){
				req.session.pwdRecovery = user.id;
				return res.view();
			}else{
				req.session.flash = {
					err : {
						error : 'proceduralError',
						data : null
					}
				}
				return res.redirect("/pwd");
			};
		});
	},

	"pwdsubmit" : function(req, res, next){
		if(req.session.pwdRecovery){
			User.findOne(req.session.pwdRecovery).exec(function foundUser(err, user){
				if(err) return next(err);
				delete req.session.pwdRecovery;
				if(!user){	
					req.session.flash = {
						err : {
							error : 'proceduralError',
							data : null
						}
					};
					return res.redirect('/pwd');
				}else{
					user.password = req.param("password");
					user.confirmation = req.param("confirmation");
					user.passwordRecoveryToken = "";
					user.save(function userUpdate(err){
						if(err) return next(err);
						req.session.flash = {
							ok : {
								message : 'pwdRecoveryOk',
								data : null
							}
						};
						res.redirect('/session/new');
					});
				}
			});
		}
		else{
			req.session.flash = {
				err : {
					error : 'proceduralError',
					data : null
				}
			}
			return res.redirect('/pwd');
		}
	},

	"destroy" : function(req, res, next){
		User.findOne(req.param("id"), function foundUser(err, user){
			if(err) return next(err);
			if(!user) return res.redirect('/session/destroy');

			User.destroy(req.param("id"), function userDestroyed(err){
				if(err) return next(err);
				User.publishDestroy(user.id);
			})
			res.redirect("/user");
		}); 
	},

	"subscribe" : function(req, res, next){
		if (req.isSocket){
			User.find(function usersFound (err, users){
				if(err) return next(err);
				User.watch(req.socket);
				User.subscribe(req.socket, users);
			});
		} else {
			res.view();
		}
	},

	"online" : function(req, res){
		if(req.session.User){
			return res.json({
				status : "ok"
			});	
		}else{
			return res.json({
				status : "ko"
			});	
		}
		
	},
};

