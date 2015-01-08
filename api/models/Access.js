/**
* Access.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		signature : {
			type: "String",
			required: true
		},
		token : {
			type: "String",
			required: true
		},
		secret : {
			type: "String"
		},
	},
	beforeCreate : function(values, next){
		var bcrypt = require("bcrypt");

		if(!values.password) return next(["NO PASSWORD PROVIDED"]);

		bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
			if(err)return next(err);
			values.password = encryptedPassword;

			bcrypt.hash(values.signature+values.password, 10, function passwordEncrypted(err, encryptedSecret){
				if(err)return next(err);
				values.secret = encryptedSecret;
				
				next();
			});
		});

		
	}
};

