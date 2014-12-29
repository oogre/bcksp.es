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
	getRandom : function(where, maxlength, next){
		var sentence = "";
		this
		.find()
		.where(where)
		.then(function(backspaces){
			if(backspaces.length == 0){
				var cheater = sails.config.poster.txt.cheater;
				return next(cheater[Math.floor(Math.random()*cheater.length)]);
			}
			while(sentence.length < maxlength){
				if(typeof(backspace) == typeof(undefined) || ( Math.random()*10 > 8 && backspaces.length > 0 )){
					var bckspLen = backspaces.length;
					var id = Math.floor(bckspLen*Math.random());
					var backspace = backspaces.splice(Math.floor(bckspLen*Math.random()), 1)[0].content;
					var keys = _.keys(backspace);
					var keyId = Math.floor(Math.random()*keys.length);
				}
				sentence += _.stripTags(backspace[keys[keyId]]).replace(/llun/g, "");
				keyId++;
				keyId = keyId%(keys.length);
			}
			return next(sentence);
		})
		.catch(function(err){
			return next(err);
		});
	}
};

