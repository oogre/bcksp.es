/*
	peoples passing through are [User]
*/

module.exports = function(req, res, next){
	var token = req.param("token");
	var signature = req.param("signature");

	Access
	.findOne()
	.where({
		signature : signature
	})
	.then(function(access){
		if(!access) return res.api(403, ["API identification error"]);
		require("bcrypt")
		.compare(signature+token, access.secret, function(err, valid){
			if(err) return res.api(500, err);	
			if(!valid) return res.api(403, ["API identification error"]);
			return next();
		});
	})
	.catch(function(err){
		return res.api(500, err);
	});
};