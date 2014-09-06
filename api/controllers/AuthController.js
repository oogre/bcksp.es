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
					var oldDate = new Date()
					var newDate = new Date(oldDate.getTime() + (1000 * 60 * 60 * 24 * 365));
					req.session.cookie.expires = newDate;
					req.session.authenticated = true;
					req.session.User = oldUser.cleanSession();
					oldUser.online = true;
					oldUser.facebook = {
						id : user.id,
						accessToken : user.accessToken
					};
					oldUser.save(function userSaved(err, updatedUser){
						if(err)return next(err);
						User.publishUpdate(oldUser.id,{ 
							online : true 
						});
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
					});
				}
			});
		})(req, res, next);
	}

};


/*
{
  "id": "10152645223375750",
  "displayName": "Vincent Evrard",
  "name": {
    "familyName": "Evrard",
    "givenName": "Vincent"
  },
  "gender": "male",
  "profileUrl": "https://www.facebook.com/app_scoped_user_id/10152645223375750/",
  "emails": [
    {
      "value": "peuh5@hotmail.com"
    }
  ],
  "provider": "facebook",
  "_raw": "{\"id\":\"10152645223375750\",\"email\":\"peuh5\\u0040hotmail.com\",\"first_name\":\"Vincent\",\"gender\":\"male\",\"last_name\":\"Evrard\",\"link\":\"https:\\/\\/www.facebook.com\\/app_scoped_user_id\\/10152645223375750\\/\",\"locale\":\"en_US\",\"name\":\"Vincent Evrard\",\"timezone\":2,\"updated_time\":\"2014-08-28T16:46:42+0000\",\"verified\":true}",
  "_json": {
    "id": "10152645223375750",
    "email": "peuh5@hotmail.com",
    "first_name": "Vincent",
    "gender": "male",
    "last_name": "Evrard",
    "link": "https://www.facebook.com/app_scoped_user_id/10152645223375750/",
    "locale": "en_US",
    "name": "Vincent Evrard",
    "timezone": 2,
    "updated_time": "2014-08-28T16:46:42+0000",
    "verified": true
  },
  "accessToken": "CAAUtyH9opjwBAKuFMQZAQTTqMa7ybTe6NZBRgeOT0jdwIT8JVvi9gC0XPodG9Oq19OYhJxQ6TF8p1ShofuXeAgfueBqiAXqOiiwmTDHayZCoDZA9nkE5IUfpRZCemoxDtkSFf7I3O4kZCZCzYZCkivhQnr5MYxLHFC5lEgAIsg00BImX7QVtMsQfxZCV5lRsL49g0wBqxl2qWZB8LSrttlTfkA"
}

*/
