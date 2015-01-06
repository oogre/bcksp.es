/**
* Backspace.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema:true,

	attributes: {
		origin : {
			type:"String",
  			required:"true",
		},
		content : {
			type:"json",
			defaultsTo: {}
		},
		owner:{
            model:'user'
        }
	},
	getRandom : function(where, signed, maxlength, next){
		var sentence = "";
		var users = [];
		var dates = [];
		this
		.find()
		.where(where)
		.then(function(backspaces){
			if(backspaces.length == 0){
				var cheater = sails.config.poster.txt.cheater;
				return next(null, cheater[Math.floor(Math.random()*cheater.length)]);
			}
			while(sentence.length < maxlength){
				if(typeof(backspace) == typeof(undefined) || ( Math.random()*10 > 8 && backspaces.length > 0 )){
					var bckspLen = backspaces.length;
					var id = Math.floor(bckspLen*Math.random());
					var backspace = backspaces.splice(Math.floor(bckspLen*Math.random()), 1)[0];
					var content = backspace.content;
					var keys = _.keys(content);
					var keyId = Math.floor(Math.random()*keys.length);
					if(signed){
						users.push( User
									.findOne()
									.where({
										id : backspace.owner
									})
									.then(function(user){
										return {
											id : user.id,
											email : user.email
										};
									}));
						dates.unshift({
							user : backspace.owner,
							date : []
						})
					}
				}
				if(signed){
					dates[0].date.push(keys[keyId]);
				}
				sentence += _.stripTags(content[keys[keyId]]).replace(/llun/g, "");
				keyId++;
				if(keyId>=keys.length){
					break;
				}
			}
			var promise = require('promised-io/promise');
			promise
			.all(users)
			.then(function(users){
				if(signed){
					users =	users
							.map(function(user){
								var date =	_.find(dates, function(date){ return date.user == user.id})
								date.user = user.email;
								date.id = user.id;
								return date;
							})
							.reverse()
				}
				else{
					users = false;
				}
				return next(null, sentence, users);
			});
		})
		.catch(function(err){
			return next(err);
		});
	}
};

